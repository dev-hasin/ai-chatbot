"use client";

import { Gauge, Workflow, LayoutTemplate } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "./reveal";

const items = [
  {
    icon: Gauge,
    title: "Performance",
    desc: "Server components, code-splitting, and a lean client bundle keep things fast by default.",
  },
  {
    icon: Workflow,
    title: "Automation",
    desc: "An n8n agent handles memory, tool calls, and Gmail delivery — no glue code required.",
  },
  {
    icon: LayoutTemplate,
    title: "Modern Architecture",
    desc: "A clean Next.js 15 App Router structure that's easy to extend and deploy.",
  },
];

export function WhyChoose() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Why choose this chatbot
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <Card className="h-full border-border/80 bg-gradient-to-b from-card to-muted/40">
                <CardContent className="pt-8 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
