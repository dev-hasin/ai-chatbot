import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WorkflowSection } from "@/components/home/workflow-section";
import { Stats } from "@/components/home/stats";
import { Reveal } from "@/components/home/reveal";

export default function WorkflowPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="px-6 pb-4 pt-20 text-center">
          <Reveal>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              How the AI actually works
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              A transparent, step-by-step look at the pipeline behind every reply.
            </p>
          </Reveal>
        </section>
        <WorkflowSection />
        <Stats />
      </main>
      <Footer />
    </>
  );
}
