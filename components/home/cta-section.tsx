import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";
import { GithubIcon } from "@/components/layout/brand-icons";
import { siteConfig } from "@/lib/site";

export function CTASection() {
  return (
    <section className="px-6 py-24">
      <Reveal className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-brand px-8 py-16 text-center text-white shadow-2xl shadow-brand-600/30">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Ready to Experience AI Automation?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/85">
          Start a conversation now — no setup needed on your end.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" variant="secondary" className="text-foreground" asChild>
            <Link href="/chat">
              Start Chat <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/40 bg-transparent text-white hover:bg-white/10"
            asChild
          >
            <a href={siteConfig.github} target="_blank" rel="noreferrer">
              <GithubIcon className="h-4 w-4" /> GitHub
            </a>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
