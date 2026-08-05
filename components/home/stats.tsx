import { ShieldCheck } from "lucide-react";
import { Reveal } from "./reveal";
import { Counter } from "./counter";

export function Stats() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-brand p-[1px]">
        <div className="rounded-3xl bg-background/95 px-8 py-14">
          <div className="grid grid-cols-2 gap-10 text-center md:grid-cols-4">
            <Reveal>
              <p className="font-display text-4xl font-semibold text-gradient-brand">
                <Counter to={100} suffix="%" />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">AI Powered</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="font-display text-4xl font-semibold text-gradient-brand">
                24/7
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Available</p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="font-display text-4xl font-semibold text-gradient-brand">
                &lt;2s
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Average Response</p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="flex items-center justify-center gap-1.5 font-display text-2xl font-semibold text-gradient-brand sm:text-3xl">
                <ShieldCheck className="h-6 w-6 text-brand-500" /> Secure
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Workflow Integration</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
