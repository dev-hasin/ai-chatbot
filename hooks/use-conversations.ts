"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChatConversation, ChatMessage } from "@/types/chat";
import {
  loadConversations,
  saveConversations,
  loadUserEmail,
  saveUserEmail,
  newId,
  titleFromMessage,
} from "@/lib/storage";
import { sendChatMessage, MissiveApiError } from "@/lib/api";

export function useConversations() {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const loaded = loadConversations();
    setConversations(loaded);
    setActiveId(loaded.length ? loaded[0].id : null);
    setUserEmail(loadUserEmail());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveConversations(conversations);
  }, [conversations, hydrated]);

  const active = conversations.find((c) => c.id === activeId) || null;

  const createConversation = useCallback((): string => {
    const id = newId("c");
    const convo: ChatConversation = {
      id,
      title: "New conversation",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [],
    };
    setConversations((prev) => [convo, ...prev]);
    setActiveId(id);
    return id;
  }, []);

  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => {
        const next = prev.filter((c) => c.id !== id);
        if (activeId === id) setActiveId(next.length ? next[0].id : null);
        return next;
      });
    },
    [activeId]
  );

  const clearConversation = useCallback((id: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, messages: [], title: "New conversation" } : c))
    );
  }, []);

  const updateEmail = useCallback((email: string) => {
    setUserEmail(email);
    saveUserEmail(email);
  }, []);

  const runTurn = useCallback(
    async (conversationId: string, text: string, replaceLastAssistant: boolean) => {
      setPending(true);
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const output = await sendChatMessage(
          { chatInput: text, userEmail, sessionId: conversationId },
          controller.signal
        );

        setConversations((prev) =>
          prev.map((c) => {
            if (c.id !== conversationId) return c;
            const messages = replaceLastAssistant ? c.messages.slice(0, -1) : c.messages;
            return {
              ...c,
              updatedAt: Date.now(),
              messages: [
                ...messages,
                { id: newId("m"), role: "assistant", content: output, createdAt: Date.now() },
              ],
            };
          })
        );
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        const message =
          e instanceof MissiveApiError ? e.message : "Something went wrong. Please try again.";
        setConversations((prev) =>
          prev.map((c) => {
            if (c.id !== conversationId) return c;
            const messages = replaceLastAssistant ? c.messages.slice(0, -1) : c.messages;
            return {
              ...c,
              messages: [
                ...messages,
                { id: newId("m"), role: "assistant", content: message, createdAt: Date.now(), error: true },
              ],
            };
          })
        );
      } finally {
        setPending(false);
      }
    },
    [userEmail]
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const id = activeId ?? createConversation();
      const userMsg: ChatMessage = { id: newId("m"), role: "user", content: text, createdAt: Date.now() };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== id) return c;
          const isFirst = c.messages.length === 0;
          return {
            ...c,
            title: isFirst ? titleFromMessage(text) : c.title,
            updatedAt: Date.now(),
            messages: [...c.messages, userMsg],
          };
        })
      );

      await runTurn(id, text, false);
    },
    [activeId, createConversation, runTurn]
  );

  const retryLastMessage = useCallback(
    async (conversationId: string) => {
      const convo = conversations.find((c) => c.id === conversationId);
      if (!convo) return;
      const lastUser = [...convo.messages].reverse().find((m) => m.role === "user");
      if (!lastUser) return;
      const lastIsError = convo.messages[convo.messages.length - 1]?.error;
      await runTurn(conversationId, lastUser.content, Boolean(lastIsError));
    },
    [conversations, runTurn]
  );

  const regenerateLastResponse = useCallback(
    async (conversationId: string) => {
      const convo = conversations.find((c) => c.id === conversationId);
      if (!convo) return;
      const lastUser = [...convo.messages].reverse().find((m) => m.role === "user");
      if (!lastUser) return;
      const lastIsAssistant = convo.messages[convo.messages.length - 1]?.role === "assistant";
      await runTurn(conversationId, lastUser.content, lastIsAssistant);
    },
    [conversations, runTurn]
  );

  const stopGenerating = useCallback(() => {
    abortRef.current?.abort();
    setPending(false);
  }, []);

  return {
    conversations,
    active,
    activeId,
    setActiveId,
    userEmail,
    updateEmail,
    pending,
    createConversation,
    deleteConversation,
    clearConversation,
    sendMessage,
    retryLastMessage,
    regenerateLastResponse,
    stopGenerating,
  };
}
