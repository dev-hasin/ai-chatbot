import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TrustedTech } from "@/components/home/trusted-tech";
import { Testimonials } from "@/components/home/testimonials";
import { FAQ } from "@/components/home/faq";
import { CTASection } from "@/components/home/cta-section";
import { Reveal } from "@/components/home/reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="px-6 pb-4 pt-20 text-center">
          <Reveal>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              About Missive
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Missive is a private AI correspondent built on Next.js and an
              n8n AI Agent workflow. It holds a genuinely useful conversation,
              remembers the thread within a session, and — only when you ask
              — writes up a clean summary and sends it to your inbox via
              Gmail. No dashboards to configure, no accounts to manage: just
              a chat that can also follow up for you.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/chat">
                  Try it now <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </section>
        <TrustedTech />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
