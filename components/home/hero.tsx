"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20 md:pt-28">
      {/* floating gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-brand-500/25 blur-3xl animate-float"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-32 right-1/5 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl animate-float"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="accent" className="gap-1.5">
              <Sparkles className="h-3 w-3" /> Powered by n8n + AI Agents
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Build Smarter{" "}
            <span className="text-gradient-brand">Conversations</span> with
            AI Automation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            Experience a modern AI chatbot powered by Next.js, n8n workflows,
            conversation memory, and Gmail automation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button size="lg" asChild>
              <Link href="/chat">
                Start Chatting <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/features">
                <Zap className="h-4 w-4" /> View Features
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="glass relative rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-border pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            </div>
            <div className="flex flex-col gap-3 py-4">
              <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm">
                Hi! How can I help today?
              </div>
              <div className="ml-auto max-w-[75%] rounded-2xl rounded-tr-sm bg-gradient-brand px-4 py-3 text-sm text-white">
                Can you summarize this and email it to me?
              </div>
              <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm">
                Sure — writing it up now and sending it your way. ✉️
              </div>
            </div>
          </div>

          <motion.div
            className="glass absolute -right-6 -top-6 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium shadow-lg"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> Memory active
          </motion.div>
          <motion.div
            className="glass absolute -bottom-6 -left-6 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium shadow-lg"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            📧 Summary sent
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
