import {
  AlertTriangle,
  XCircle,
  Clock,
  Ban,
  CheckCircle2,
  Fingerprint,
  Smartphone,
  BarChart3,
} from "lucide-react";

const challenges = [
  {
    icon: <XCircle className="size-5 text-gov-red" />,
    text: "~500 mil cidadaos sem qualquer documento de identidade oficial",
  },
  {
    icon: <Ban className="size-5 text-gov-red" />,
    text: "Servicos publicos centralizados em Bissau, inacessiveis nas regioes",
  },
  {
    icon: <Clock className="size-5 text-gov-red" />,
    text: "Processos burocraticos manuais, lentos e propensos a erros",
  },
  {
    icon: <AlertTriangle className="size-5 text-gov-red" />,
    text: "Apenas 32% da populacao com acesso a internet",
  },
];

const solutions = [
  {
    icon: <Fingerprint className="size-5 text-primary" />,
    text: "Simenti ID: sistema biometrico para identidade digital universal",
  },
  {
    icon: <Smartphone className="size-5 text-primary" />,
    text: "Acesso USSD: servicos publicos via qualquer telemovel basico",
  },
  {
    icon: <BarChart3 className="size-5 text-primary" />,
    text: "Dashboard governamental com dados em tempo real para decisores",
  },
  {
    icon: <CheckCircle2 className="size-5 text-primary" />,
    text: "Arquitectura offline-first adaptada a realidade guineense",
  },
];

export function ProblemSolution() {
  return (
    <section id="problem-solution" className="relative py-20 sm:py-28">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 text-center sm:mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Desafio e resposta
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Do problema a solucao
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* The Challenge */}
          <div className="relative">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-gov-red/10">
                <AlertTriangle className="size-5 text-gov-red" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                  O Desafio
                </h3>
                <div className="mt-0.5 h-0.5 w-12 rounded-full bg-gov-red" />
              </div>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              A Guine-Bissau e um dos paises menos digitalizados do mundo.
              Milhoes de cidadaos estao excluidos de servicos basicos por falta
              de identidade e infraestrutura.
            </p>

            <ul className="space-y-4">
              {challenges.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-gov-red/10 bg-gov-red/[0.03] p-4 transition-colors hover:bg-gov-red/[0.06]"
                >
                  <span className="mt-0.5 shrink-0">{item.icon}</span>
                  <span className="text-sm leading-relaxed text-foreground/80">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* The Solution */}
          <div className="relative">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <CheckCircle2 className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                  A Solucao
                </h3>
                <div className="mt-0.5 h-0.5 w-12 rounded-full bg-primary" />
              </div>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              GOV-GB implementa a ENTD.GW com tecnologia moderna, open-source e
              adaptada. Cada modulo resolve um problema concreto dos cidadaos
              guineenses.
            </p>

            <ul className="space-y-4">
              {solutions.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-primary/10 bg-primary/[0.03] p-4 transition-colors hover:bg-primary/[0.06]"
                >
                  <span className="mt-0.5 shrink-0">{item.icon}</span>
                  <span className="text-sm leading-relaxed text-foreground/80">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
