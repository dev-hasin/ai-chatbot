"use client";

import { motion } from "framer-motion";
import { Reveal } from "./reveal";

const techs = [
  "Next.js",
  "TypeScript",
  "TailwindCSS",
  "n8n",
  "OpenAI",
  "Gmail",
  "Vercel",
];

export function TrustedTech() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Built on tools you already trust
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {techs.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium shadow-sm"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
