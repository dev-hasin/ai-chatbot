"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User } from "lucide-react";
import { Reveal } from "./reveal";

const script: { role: "user" | "ai"; text: string }[] = [
  { role: "user", text: "Hello" },
  { role: "ai", text: "Hello! How can I help today?" },
  { role: "user", text: "Can you summarize this conversation?" },
  { role: "ai", text: "Sure! I can also email it to you." },
];

function useTypedScript(lines: typeof script, active: boolean) {
  const [visible, setVisible] = useState<{ role: "user" | "ai"; text: string; typing?: boolean }[]>([]);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    setVisible([]);

    async function run() {
      for (const line of lines) {
        if (cancelled) return;
        setVisible((v) => [...v, { role: line.role, text: "", typing: true }]);
        await new Promise((r) => setTimeout(r, 500));
        for (let i = 1; i <= line.text.length; i++) {
          if (cancelled) return;
          await new Promise((r) => setTimeout(r, 18));
          setVisible((v) => {
            const next = [...v];
            next[next.length - 1] = { role: line.role, text: line.text.slice(0, i), typing: true };
            return next;
          });
        }
        setVisible((v) => {
          const next = [...v];
          next[next.length - 1] = { ...next[next.length - 1], typing: false };
          return next;
        });
        await new Promise((r) => setTimeout(r, 700));
      }
      await new Promise((r) => setTimeout(r, 1600));
      if (!cancelled) run();
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [active, lines]);

  return visible;
}

export function ChatPreview() {
  const [active, setActive] = useState(false);
  const lines = useTypedScript(script, active);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            See it in action
          </h2>
          <p className="mt-4 text-muted-foreground">
            A preview of what talking to Missive actually feels like.
          </p>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          onViewportEnter={() => setActive(true)}
          transition={{ duration: 0.5 }}
          className="glass mt-10 min-h-[280px] rounded-2xl p-6 shadow-xl"
        >
          <div className="flex flex-col gap-4">
            <AnimatePresence initial={false}>
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${line.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      line.role === "user" ? "bg-secondary" : "bg-gradient-brand text-white"
                    }`}
                  >
                    {line.role === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                  </span>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                      line.role === "user"
                        ? "rounded-tr-sm bg-gradient-brand text-white"
                        : "rounded-tl-sm bg-muted"
                    }`}
                  >
                    {line.text}
                    {line.typing && <span className="ml-0.5 animate-pulse">▍</span>}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
