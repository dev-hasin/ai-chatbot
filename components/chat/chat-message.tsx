"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, User, Copy, Check, RotateCcw, AlertTriangle } from "lucide-react";
import { ChatMessage } from "@/types/chat";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Markdown } from "./markdown";

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

export function ChatMessageBubble({
  message,
  onRegenerate,
  onRetry,
  isLastAssistant,
}: {
  message: ChatMessage;
  onRegenerate?: () => void;
  onRetry?: () => void;
  isLastAssistant?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  function copy() {
    navigator.clipboard.writeText(message.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`group flex w-full gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <Avatar className="mt-0.5 h-8 w-8">
        <AvatarFallback className={isUser ? "bg-secondary text-secondary-foreground" : undefined}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>

      <div className={`flex max-w-[80%] flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm ${
            isUser
              ? "rounded-tr-sm bg-gradient-brand text-white"
              : message.error
              ? "rounded-tl-sm border border-destructive/40 bg-destructive/10 text-destructive"
              : "rounded-tl-sm bg-muted text-foreground"
          }`}
        >
          {message.error && (
            <div className="mb-1 flex items-center gap-1.5 text-xs font-medium">
              <AlertTriangle className="h-3.5 w-3.5" /> Something went wrong
            </div>
          )}
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <Markdown content={message.content} />
          )}
        </div>

        <div className="flex items-center gap-2 px-1 text-[11px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
          <span>{formatTime(message.createdAt)}</span>
          {!isUser && !message.error && (
            <button onClick={copy} className="inline-flex items-center gap-1 hover:text-foreground" aria-label="Copy response">
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </button>
          )}
          {!isUser && message.error && onRetry && (
            <button onClick={onRetry} className="inline-flex items-center gap-1 hover:text-foreground" aria-label="Retry">
              <RotateCcw className="h-3 w-3" /> Retry
            </button>
          )}
          {!isUser && !message.error && isLastAssistant && onRegenerate && (
            <button onClick={onRegenerate} className="inline-flex items-center gap-1 hover:text-foreground" aria-label="Regenerate response">
              <RotateCcw className="h-3 w-3" /> Regenerate
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
