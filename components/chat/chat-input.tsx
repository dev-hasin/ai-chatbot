"use client";

import { useRef, useState } from "react";
import { ArrowUp, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChatInput({
  onSend,
  onStop,
  pending,
}: {
  onSend: (text: string) => void;
  onStop: () => void;
  pending: boolean;
}) {
  const [value, setValue] = useState("");
  const areaRef = useRef<HTMLTextAreaElement | null>(null);

  function submit() {
    const trimmed = value.trim();
    if (!trimmed || pending) return;
    onSend(trimmed);
    setValue("");
    if (areaRef.current) areaRef.current.style.height = "auto";
  }

  return (
    <div className="border-t border-border bg-card/60 px-6 py-4">
      <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-border bg-background px-3 py-2 shadow-sm focus-within:border-primary">
        <textarea
          ref={areaRef}
          rows={1}
          value={value}
          placeholder="Message Missive…"
          onChange={(e) => {
            setValue(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          className="max-h-40 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
        />
        {pending ? (
          <Button size="icon" variant="secondary" onClick={onStop} aria-label="Stop generating">
            <Square className="h-3.5 w-3.5" />
          </Button>
        ) : (
          <Button size="icon" onClick={submit} disabled={!value.trim()} aria-label="Send message">
            <ArrowUp className="h-4 w-4" />
          </Button>
        )}
      </div>
      <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-muted-foreground">
        Enter to send · Shift + Enter for a new line
      </p>
    </div>
  );
}
