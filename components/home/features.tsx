"use client";

import { motion } from "framer-motion";
import {
  MessagesSquare,
  BrainCircuit,
  Mail,
  FileText,
  Zap,
  ShieldCheck,
  MoonStar,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "./reveal";

const features = [
  { icon: MessagesSquare, title: "AI Conversations", desc: "Natural, context-aware chat that feels like talking to a person." },
  { icon: BrainCircuit, title: "Session Memory", desc: "Cordial conversation threads that remember what's already been said." },
  { icon: Mail, title: "Gmail Automation", desc: "Ask for a summary and it lands directly in your inbox." },
  { icon: FileText, title: "Conversation Summary", desc: "Clear, well-organized recaps written in plain language." },
  { icon: Zap, title: "Fast Responses", desc: "Optimized request handling keeps replies snappy." },
  { icon: ShieldCheck, title: "Secure API", desc: "Credentials and workflow logic stay server-side, never exposed." },
  { icon: MoonStar, title: "Dark Mode", desc: "A polished dark theme that's easy on the eyes, day or night." },
  { icon: Smartphone, title: "Mobile Responsive", desc: "A first-class experience on phones, tablets, and desktops." },
  { icon: Sparkles, title: "Modern UI", desc: "Glassmorphism, soft shadows, and considered motion throughout." },
  { icon: Workflow, title: "AI Workflow Integration", desc: "Backed by an n8n agent with tools, not just a bare LLM call." },
];

export function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything your chatbot needs
          </h2>
          <p className="mt-4 text-muted-foreground">
            A complete toolkit for conversational AI — memory, automation,
            and a genuinely pleasant interface.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full transition-shadow hover:shadow-lg hover:shadow-brand-500/10">
                <CardContent className="pt-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-white">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
