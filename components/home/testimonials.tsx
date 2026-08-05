import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Reveal } from "./reveal";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Product Designer",
    quote:
      "The summary-to-email feature alone saves me twenty minutes after every planning call. It just works.",
  },
  {
    name: "Daniel Cho",
    role: "Founder, early-stage SaaS",
    quote:
      "Wired this into our n8n stack in an afternoon. The chat feels genuinely fast and the memory holds up well.",
  },
  {
    name: "Amara Okafor",
    role: "Ops Lead",
    quote:
      "Clean, fast, and the dark mode is genuinely one of the nicer ones I've used in a chat product.",
  },
];

export function Testimonials() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Loved by early users
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>
                        {t.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
