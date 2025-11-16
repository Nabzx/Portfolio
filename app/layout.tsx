import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundParticles } from "@/components/background-particles";
import { Sidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPalette } from "@/components/command-palette";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Nabil Shah | AI Engineer & Systems Builder",
  description:
    "AI Engineer specializing in Systems, ML Engineering, Multi-Agent RL, and Distributed Pipelines.",
  keywords: [
    "AI Engineer",
    "ML Engineer",
    "Systems Engineering",
    "Distributed Systems",
    "Multi-Agent RL",
    "Nabil Shah",
  ],
  metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    type: "website",
    title: "Nabil Shah | AI Engineer & Systems Builder",
    description:
      "Building scalable AI systems, distributed pipelines, and next-gen ML infrastructure.",
    url: "https://yourdomain.com",
    siteName: "Nabil Shah",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nabil Shah | AI Engineer & Systems Builder",
    description:
      "ML Engineer & Systems Builder. Creating scalable and intelligent systems.",
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
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange
        >
          {/* Animated Background */}
          <BackgroundParticles />

          {/* Sidebar Navigation */}
          <Sidebar />

          {/* Theme Toggle */}
          <div className="fixed top-6 right-6 z-[60]">
            <ThemeToggle />
          </div>

          {/* Command Palette */}
          <CommandPalette />

          {/* Main Content */}
          <main className="relative z-20 min-h-screen w-full">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
