import Link from "next/link";
import { Fingerprint, Smartphone, BarChart3, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ModuleItem {
  icon: React.ReactNode;
  title: string;
  badge: string;
  description: string;
  features: string[];
  gradient: string;
  iconBg: string;
}

const modules: ModuleItem[] = [
  {
    icon: <Fingerprint className="size-6" />,
    title: "Simenti ID",
    badge: "Identidade",
    description:
      "Sistema biometrico de identidade digital que garante que cada cidadao guineense tem um documento oficial, seguro e verificavel.",
    features: [
      "Registo biometrico offline",
      "QR code de verificacao",
      "Compativel com padroes ICAO",
    ],
    gradient: "from-primary/10 to-primary/5",
    iconBg: "bg-primary/10 text-primary",
  },
  {
    icon: <Smartphone className="size-6" />,
    title: "Acesso USSD",
    badge: "Inclusao",
    description:
      "Servicos publicos acessiveis via qualquer telemovel basico com USSD (*123#). Sem internet, sem smartphone, sem exclusao.",
    features: [
      "Funciona sem internet",
      "Qualquer telemovel basico",
      "Interface em Kriol e Portugues",
    ],
    gradient: "from-gov-yellow/10 to-gov-yellow/5",
    iconBg: "bg-gov-yellow/15 text-gov-yellow",
  },
  {
    icon: <BarChart3 className="size-6" />,
    title: "Dashboard",
    badge: "Governacao",
    description:
      "Painel de controlo em tempo real para decisores politicos. Dados agregados, indicadores de desempenho e visualizacoes claras.",
    features: [
      "Metricas em tempo real",
      "Exportacao de relatorios",
      "Controlo de acesso por perfil",
    ],
    gradient: "from-gov-red/10 to-gov-red/5",
    iconBg: "bg-gov-red/10 text-gov-red",
  },
];

export function Modules() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Modulos da plataforma
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tres pilares, um sistema
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground sm:text-base">
            Cada modulo resolve um desafio concreto, e juntos formam a
            infraestrutura digital publica da Guine-Bissau.
          </p>
        </div>

        {/* Module cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {modules.map((mod) => (
            <Card
              key={mod.title}
              className="group relative overflow-hidden border-transparent py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Top gradient bar */}
              <div
                className={`h-1 w-full bg-gradient-to-r ${mod.gradient}`}
              />

              <CardContent className="flex flex-col p-6 sm:p-8">
                {/* Icon and badge */}
                <div className="mb-5 flex items-start justify-between">
                  <div
                    className={`flex size-12 items-center justify-center rounded-2xl ${mod.iconBg} transition-transform group-hover:scale-110`}
                  >
                    {mod.icon}
                  </div>
                  <Badge variant="secondary" className="text-[10px] font-semibold uppercase tracking-wider">
                    {mod.badge}
                  </Badge>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground">
                  {mod.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {mod.description}
                </p>

                {/* Features */}
                <ul className="mt-5 space-y-2.5 border-t border-border/60 pt-5">
                  {mod.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-foreground/70"
                    >
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <span className="size-1.5 rounded-full bg-primary" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <Link
                  href="/demo"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Experimentar
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
