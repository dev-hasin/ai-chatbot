"use client";

import { motion } from "framer-motion";
import { Mail, CheckCircle2 } from "lucide-react";
import { Reveal } from "./reveal";

export function GmailAutomation() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 rounded-3xl border border-border bg-card p-10 md:grid-cols-2 md:p-14">
        <Reveal>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white">
            <Mail className="h-6 w-6" />
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight">
            Straight to your inbox
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ask the chatbot to send your conversation summary directly to
            your email. It writes a clear, well-organized recap and delivers
            it with a relevant subject line — no copy-pasting required.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-brand text-white">
                <Mail className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-medium">Your conversation summary</p>
                <p className="text-xs text-muted-foreground">to: you@example.com</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-2.5 w-4/5 rounded-full bg-muted" />
              <div className="h-2.5 w-full rounded-full bg-muted" />
              <div className="h-2.5 w-3/5 rounded-full bg-muted" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400"
            >
              <CheckCircle2 className="h-4 w-4" /> Email sent successfully
            </motion.div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
