import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import StarfieldBackground from "@/components/StarfieldBackground";
import { ToastProvider } from "@/components/ui/Toast";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orbit — Collaborative Deep Study Platform",
  description: "Study together. Stay in orbit. Synchronous co-working rooms, collaborative whiteboards, Pomodoro sync, and AI flashcards.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
      data-theme-accent="violet-cyan"
    >
      <body className="min-h-screen bg-[#0A0B14] text-slate-100 antialiased selection:bg-violet-500/30 selection:text-white relative">
        <StarfieldBackground />
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
