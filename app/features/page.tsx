import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Features } from "@/components/home/features";
import { WhyChoose } from "@/components/home/why-choose";
import { GmailAutomation } from "@/components/home/gmail-automation";
import { Reveal } from "@/components/home/reveal";

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="px-6 pb-4 pt-20 text-center">
          <Reveal>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Everything Missive can do
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              A full look at what's under the hood — from conversation to inbox.
            </p>
          </Reveal>
        </section>
        <Features />
        <WhyChoose />
        <GmailAutomation />
      </main>
      <Footer />
    </>
  );
}
