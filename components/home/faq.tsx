import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./reveal";

const faqs = [
  {
    q: "How does the chatbot work?",
    a: "Your message goes from this site to a Next.js API route, then to an n8n webhook that runs an AI Agent. The agent replies using conversation memory and, when asked, a Gmail tool.",
  },
  {
    q: "Is conversation memory supported?",
    a: "Yes. Each conversation keeps a session ID, and the n8n workflow uses a buffer-window memory node so recent turns stay in context.",
  },
  {
    q: "Can it send emails?",
    a: "Yes — ask it to email you a summary and it will write one up and send it via the Gmail tool, using the address on file or one you give it in chat.",
  },
  {
    q: "How secure is it?",
    a: "API credentials and workflow logic live server-side in n8n, never in the browser. The frontend only ever sends chat text and, if provided, an email address.",
  },
];

export function FAQ() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-6">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
