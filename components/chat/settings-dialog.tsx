"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SettingsDialog({
  open,
  onOpenChange,
  email,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  onSave: (email: string) => void;
}) {
  const [draft, setDraft] = useState(email);

  useEffect(() => {
    if (open) setDraft(email);
  }, [open, email]);

  function save() {
    onSave(draft.trim());
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deliver summaries to</DialogTitle>
          <DialogDescription>
            Used whenever you ask the assistant to email you a summary of a
            conversation.
          </DialogDescription>
        </DialogHeader>
        <Input
          autoFocus
          type="email"
          placeholder="you@example.com"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && save()}
        />
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={save}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
