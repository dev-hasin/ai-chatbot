"use client";

import { motion } from "framer-motion";
import { Plus, Trash2, Settings, MessageSquare } from "lucide-react";
import Link from "next/link";
import { ChatConversation } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";

export function ChatSidebar({
  conversations,
  activeId,
  onSelect,
  onNew,
  onDelete,
  onOpenSettings,
  className,
}: {
  conversations: ChatConversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  onOpenSettings: () => void;
  className?: string;
}) {
  const sorted = [...conversations].sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <aside className={cn("flex h-full w-72 shrink-0 flex-col border-r border-border bg-card/60", className)}>
      <div className="flex items-center justify-between px-4 pt-5 pb-3">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <div className="px-4 pb-3">
        <Button onClick={onNew} className="w-full justify-start" variant="secondary">
          <Plus className="h-4 w-4" /> New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2">
        <div className="flex flex-col gap-1 pb-4">
          {sorted.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No conversations yet.
            </p>
          )}
          {sorted.map((c, i) => {
            const isActive = c.id === activeId;
            return (
              <motion.button
                key={c.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.02, duration: 0.2 }}
                onClick={() => onSelect(c.id)}
                className={cn(
                  "group flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                  isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                )}
              >
                <MessageSquare className="h-3.5 w-3.5 shrink-0 opacity-60" />
                <span className="flex-1 truncate">{c.title}</span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(c.id);
                  }}
                  className="opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                  aria-label="Delete conversation"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </span>
              </motion.button>
            );
          })}
        </div>
      </ScrollArea>

      <div className="flex items-center justify-between border-t border-border px-4 py-3">
        <Button variant="ghost" size="sm" onClick={onOpenSettings} className="gap-2">
          <Settings className="h-4 w-4" /> Settings
        </Button>
        <ThemeToggle />
      </div>
    </aside>
  );
}
