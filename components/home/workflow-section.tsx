"use client";

import { motion } from "framer-motion";
import {
  User,
  Globe,
  Server,
  Webhook,
  Bot,
  BrainCircuit,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Reveal } from "./reveal";

const steps = [
  { icon: User, label: "User", desc: "Types a message in the chat interface." },
  { icon: Globe, label: "Website", desc: "The Next.js frontend captures the input." },
  { icon: Server, label: "Next.js API", desc: "Forwards the request securely." },
  { icon: Webhook, label: "n8n Webhook", desc: "Receives the request and triggers the workflow." },
  { icon: Bot, label: "AI Agent", desc: "Reasons about the message and decides what to do." },
  { icon: BrainCircuit, label: "Conversation Memory", desc: "Recalls prior turns in the session." },
  { icon: Mail, label: "Gmail Tool", desc: "Sends a summary email, only when asked." },
  { icon: MessageCircle, label: "Response", desc: "The reply streams back to the chat." },
];

export function WorkflowSection() {
  return (
    <section id="workflow" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every message travels a clear, auditable path — from your keyboard
            to an AI agent and back.
          </p>
        </Reveal>

        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute left-6 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 sm:left-7"
          />
          <ol className="flex flex-col gap-10">
            {steps.map((step, i) => (
              <motion.li
                key={step.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="relative flex items-start gap-5 pl-0"
              >
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-md shadow-brand-600/25 sm:h-14 sm:w-14">
                  <step.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <div className="pt-1.5">
                  <h3 className="font-display font-semibold">{step.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
