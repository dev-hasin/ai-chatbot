"use client";

import { useEffect, useRef } from "react";
import { Bot, Trash2 } from "lucide-react";
import { ChatConversation } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { ChatMessageBubble } from "./chat-message";

export function ChatWindow({
  conversation,
  pending,
  onClear,
  onRegenerate,
  onRetry,
}: {
  conversation: ChatConversation | null;
  pending: boolean;
  onClear: () => void;
  onRegenerate: () => void;
  onRetry: () => void;
}) {
  const endRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const messages = conversation?.messages ?? [];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      return;
    }
    try {
      // Scroll to bottom so latest messages are visible above the sticky input
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    } catch (e) {
      // fallback
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages.length, pending]);

  const lastAssistantId = [...messages].reverse().find((m) => m.role === "assistant" && !m.error)?.id;

  return (
    <div className="flex h-full flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <h1 className="truncate font-display font-semibold">
          {conversation?.title ?? "New conversation"}
        </h1>
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear} className="gap-1.5 text-muted-foreground">
            <Trash2 className="h-3.5 w-3.5" /> Clear
          </Button>
        )}
      </header>

      <div ref={containerRef} className="flex-1 overflow-y-auto px-6 py-6 pb-36">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                <Bot className="h-6 w-6" />
              </span>
              <p className="font-display text-lg font-medium">Start a conversation</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                Ask a question, brainstorm out loud, or say "email me a
                summary" once you're done.
              </p>
            </div>
          )}

          {messages.map((m) => (
            <ChatMessageBubble
              key={m.id}
              message={m}
              isLastAssistant={m.id === lastAssistantId}
              onRegenerate={onRegenerate}
              onRetry={onRetry}
            />
          ))}

          {pending && (
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <Bot className="h-4 w-4" />
              </span>
              <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-muted px-4 py-3">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
}
