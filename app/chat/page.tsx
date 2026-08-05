"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { toast } from "sonner";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ChatWindow } from "@/components/chat/chat-window";
import { ChatInput } from "@/components/chat/chat-input";
import { SettingsDialog } from "@/components/chat/settings-dialog";
import { Button } from "@/components/ui/button";
import { useConversations } from "@/hooks/use-conversations";

const SENT_CONFIRMATION = /\bsent\b.{0,20}\b(successfully|to your (inbox|email))\b/i;

export default function ChatPage() {
  const {
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
  } = useConversations();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const lastSeenMessageId = useRef<string | null>(null);

  // Fire a toast when the assistant appears to confirm an email was sent.
  useEffect(() => {
    const last = active?.messages[active.messages.length - 1];
    if (!last || last.role !== "assistant" || last.error) return;
    if (last.id === lastSeenMessageId.current) return;
    lastSeenMessageId.current = last.id;
    if (SENT_CONFIRMATION.test(last.content)) {
      toast.success("Summary emailed", {
        description: userEmail ? `Sent to ${userEmail}` : "Sent successfully",
      });
    }
  }, [active?.messages, userEmail]);

  return (
    <div className="flex h-screen w-full bg-background">
      <ChatSidebar
        className="hidden md:flex"
        conversations={conversations}
        activeId={activeId}
        onSelect={setActiveId}
        onNew={createConversation}
        onDelete={deleteConversation}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 md:hidden"
            >
              <ChatSidebar
                conversations={conversations}
                activeId={activeId}
                onSelect={(id) => {
                  setActiveId(id);
                  setDrawerOpen(false);
                }}
                onNew={() => {
                  createConversation();
                  setDrawerOpen(false);
                }}
                onDelete={deleteConversation}
                onOpenSettings={() => setSettingsOpen(true)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-4 py-3 md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(true)} aria-label="Open conversations">
            {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <ChatWindow
          conversation={active}
          pending={pending}
          onClear={() => active && clearConversation(active.id)}
          onRegenerate={() => active && regenerateLastResponse(active.id)}
          onRetry={() => active && retryLastMessage(active.id)}
        />

        <ChatInput onSend={sendMessage} onStop={stopGenerating} pending={pending} />
      </div>

      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        email={userEmail}
        onSave={updateEmail}
      />
    </div>
  );
}
