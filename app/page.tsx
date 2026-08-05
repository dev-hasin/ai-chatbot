import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { TrustedTech } from "@/components/home/trusted-tech";
import { Features } from "@/components/home/features";
import { WorkflowSection } from "@/components/home/workflow-section";
import { WhyChoose } from "@/components/home/why-choose";
import { Stats } from "@/components/home/stats";
import { ChatPreview } from "@/components/home/chat-preview";
import { GmailAutomation } from "@/components/home/gmail-automation";
import { Testimonials } from "@/components/home/testimonials";
import { FAQ } from "@/components/home/faq";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustedTech />
        <Features />
        <WorkflowSection />
        <WhyChoose />
        <Stats />
        <ChatPreview />
        <GmailAutomation />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
