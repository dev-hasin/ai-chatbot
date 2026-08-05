"use client";

import { useRef, useState, useEffect } from "react";
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
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Diagnostic: periodically check whether the input root is visible and log details
  useEffect(() => {
    let mounted = true;
    const check = () => {
      if (!mounted) return;
      const el = rootRef.current;
      if (!el) return;
      const rects = el.getClientRects();
      const style = window.getComputedStyle(el);
      const isVisible = rects.length > 0 && style.display !== "none" && style.visibility !== "hidden" && parseFloat(style.opacity) > 0;
      if (!isVisible) {
        const rect = el.getBoundingClientRect();
        // find the topmost element at the center of the input root
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        let topEl: Element | null = null;
        try {
          topEl = document.elementFromPoint(cx, cy);
        } catch (err) {
          // ignore
        }

        console.warn("ChatInput hidden detected", {
          rectsLength: rects.length,
          display: style.display,
          visibility: style.visibility,
          opacity: style.opacity,
          boundingClientRect: rect,
          topmostElement: topEl
            ? { tag: topEl.tagName, class: topEl.className, id: (topEl as HTMLElement).id }
            : null,
        });
      }
    };
    const id = window.setInterval(check, 1000);
    // also run on mount
    check();
    return () => {
      mounted = false;
      window.clearInterval(id);
    };
  }, []);

  function submit() {
    const trimmed = value.trim();
    if (!trimmed || pending) return;
    onSend(trimmed);
    setValue("");
    if (areaRef.current) areaRef.current.style.height = "auto";
  }

  return (
    <div ref={rootRef} className="sticky bottom-0 z-40 border-t border-border bg-card/60 px-6 py-4">
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
