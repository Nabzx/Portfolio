import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundParticles } from "@/components/background-particles";
import { Sidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPalette } from "@/components/command-palette";
import { CustomCursor } from "@/components/custom-cursor";
import { EasterEggs } from "@/components/easter-eggs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

// Satoshi font - using system font fallback for now
// User can add Satoshi font files to public/fonts/ if needed
const satoshi = Inter({
  subsets: ["latin"],
  variable: "--font-satoshi",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Nabil Shah | AI Engineer and Systems Builder",
  description:
    "AI Engineer specialising in systems, ML engineering, multi-agent RL, and distributed pipelines.",
  keywords: [
    "AI Engineer",
    "ML Engineer",
    "Software Engineer",
    "Distributed Systems",
    "Multi-Agent RL",
    "Nabil Shah",
  ],
  openGraph: {
    type: "website",
    title: "Nabil Shah | AI Engineer and Systems Builder",
    description:
      "Building scalable AI systems, distributed pipelines, and next generation ML infrastructure.",
    url: "https://yourdomain.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nabil Shah | AI Engineer and Systems Builder",
    description:
      "ML Engineer and Systems Builder creating scalable and intelligent systems.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${satoshi.variable} font-sans bg-background text-foreground antialiased`}
      >
        {/* Custom Theme Provider (client) */}
        <ThemeProvider>
          <CustomCursor />
          <EasterEggs />
          <BackgroundParticles />
          <Sidebar />

          <div className="fixed top-6 right-6 z-[60]">
            <ThemeToggle />
          </div>

          <CommandPalette />

          <main className="relative z-20 min-h-screen w-full">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
