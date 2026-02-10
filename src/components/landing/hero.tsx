import Link from "next/link";
import { ArrowRight, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="hero-gradient relative min-h-screen overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Subtle radial glow */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[600px] w-[600px] rounded-full bg-white/[0.04] blur-3xl" />
      </div>

      {/* Black star motif (Guinea-Bissau flag) */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 opacity-[0.06] sm:left-16">
        <Star className="size-48 fill-current text-white sm:size-72" strokeWidth={0} />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        {/* Top badge */}
        <Badge
          variant="outline"
          className="mb-6 border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm sm:mb-8"
        >
          <span className="mr-1.5 inline-block size-1.5 rounded-full bg-gov-green-light animate-pulse" />
          Alinhado com a ENTD.GW 2025-2030
        </Badge>

        {/* Main heading */}
        <h1 className="mx-auto max-w-4xl text-center text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Guine-Bissau merece{" "}
          <span className="relative">
            <span className="relative z-10">um governo digital.</span>
            <span
              className="absolute -bottom-1 left-0 right-0 z-0 h-3 bg-gov-yellow/25 sm:-bottom-2 sm:h-4"
              aria-hidden="true"
            />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg font-medium leading-relaxed text-white/80 sm:mt-6 sm:text-xl md:text-2xl">
          Ja temos a estrategia.{" "}
          <span className="text-gov-yellow">Agora precisamos de quem a construa.</span>
        </p>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-white/55 sm:text-base">
          Plataforma open-source para implementar a Estrategia Nacional de
          Transicao Digital da Guine-Bissau. Identidade digital, servicos
          publicos e inclusao para 2.2 milhoes de guineenses.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-xl bg-white px-8 text-base font-semibold text-primary shadow-lg shadow-black/20 transition-all hover:bg-white/90 hover:shadow-xl sm:h-14 sm:px-10 sm:text-lg"
          >
            <Link href="/demo">
              Experimentar Demo
              <ArrowRight className="ml-1 size-4 sm:size-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 rounded-xl border-white/25 bg-transparent px-8 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/40 sm:h-14 sm:px-10 sm:text-lg"
          >
            <Link href="#problem-solution">
              <Play className="mr-1 size-4" />
              Saber Mais
            </Link>
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-medium uppercase tracking-widest text-white/30 sm:mt-16 sm:gap-x-8 sm:text-xs">
          <span>Open-Source</span>
          <span className="hidden size-1 rounded-full bg-white/20 sm:block" />
          <span>Offline-First</span>
          <span className="hidden size-1 rounded-full bg-white/20 sm:block" />
          <span>Mobile-First</span>
          <span className="hidden size-1 rounded-full bg-white/20 sm:block" />
          <span>UNDP Aligned</span>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
