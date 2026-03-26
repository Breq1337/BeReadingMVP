import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { ForSchools } from "@/components/landing/for-schools";
import { Pricing } from "@/components/landing/pricing";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
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
