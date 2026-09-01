import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RegisterSW } from "@/components/RegisterSW";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "eCurrículo Digital — Conquiste mais entrevistas com um currículo profissional",
  description:
    "Crie seu currículo profissional formatado em PDF e conquiste mais entrevistas. Baixe por R$ 19,99 e adicione uma carta de apresentação.",
  manifest: "/manifest.ts",
  appleWebApp: {
    capable: true,
    title: "eCurrículo Digital",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#7c3aed",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <RegisterSW />
        {children}
      </body>
    </html>
  );
}
