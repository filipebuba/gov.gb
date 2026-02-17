import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LangSync } from "@/components/lang-sync";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#1a7a4c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "GOV-GB | Plataforma de Governo Digital da Guiné-Bissau",
  description:
    "Implementação técnica da ENTD.GW — identidade digital, serviços públicos, e inclusão para 2.2 milhões de guineenses. Open-source, offline-first.",
  keywords: [
    "Guiné-Bissau",
    "governo digital",
    "ENTD.GW",
    "identidade digital",
    "código ID",
    "USSD",
    "e-government",
    "Africa",
    "DPI",
  ],
  authors: [{ name: "GOV-GB" }],
  openGraph: {
    title: "GOV-GB | Governo Digital da Guiné-Bissau",
    description:
      "Identidade digital e serviços públicos para 2.2M guineenses. Offline-first, open-source.",
    type: "website",
    locale: "pt_GW",
    siteName: "GOV-GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "GOV-GB | Governo Digital da Guiné-Bissau",
    description:
      "Identidade digital e serviços públicos para 2.2M guineenses. Offline-first, open-source.",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#1a7a4c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LangSync />
        <div className="flag-stripe" />
        {children}
      </body>
    </html>
  );
}
