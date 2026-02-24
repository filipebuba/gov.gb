import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { DpiInitiative } from "@/components/landing/dpi-initiative";
import { NationalRoadmap } from "@/components/landing/national-roadmap";
import { PolicyAlignment } from "@/components/landing/policy-alignment";
import { ResearchSection } from "@/components/landing/research-section";
import { LiveMvp } from "@/components/landing/live-mvp";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <DpiInitiative />
        <NationalRoadmap />
        <PolicyAlignment />
        <ResearchSection />
        <LiveMvp />
      </main>
      <Footer />
    </div>
  );
}
