import Link from "next/link";
import { Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({ className, asLink = true }: { className?: string; asLink?: boolean }) {
  const content = (
    <>
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-md shadow-brand-600/30">
        <Sparkles className="h-4 w-4" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight">
        {siteConfig.name}
      </span>
    </>
  );

  if (asLink) {
    return (
      <Link href="/" className={cn("flex items-center gap-2", className)}>
        {content}
      </Link>
    );
  }

  return <div className={cn("flex items-center gap-2", className)}>{content}</div>;
}
