import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Stats } from "@/components/landing/stats";
import { ProblemSolution } from "@/components/landing/problem-solution";
import { Modules } from "@/components/landing/modules";
import { EntdAlignment } from "@/components/landing/entd-alignment";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Stats />
        <ProblemSolution />
        <Modules />
        <EntdAlignment />
      </main>
      <Footer />
    </div>
  );
}
