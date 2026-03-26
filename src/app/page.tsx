import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { ProblemSection } from "@/components/landing/problem-section";
import { SolutionBridge } from "@/components/landing/solution-bridge";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { ForSchools } from "@/components/landing/for-schools";
import { Pricing } from "@/components/landing/pricing";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

// Landing page structured by Eugene Schwartz's 5 Levels of Awareness:
// 1. UNAWARE      → Hero (provocative hook, stops the scroll)
// 2. PROBLEM      → ProblemSection (agitate real pain per role)
// 3. SOLUTION     → SolutionBridge (digital companion concept — no product name yet)
// 4. PRODUCT      → Features + HowItWorks + ForSchools (reveal BeReading)
// 5. MOST AWARE   → Pricing + CTA (risk removal, guarantee, urgency)

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionBridge />
        <Features />
        <HowItWorks />
        <ForSchools />
        <Pricing />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
