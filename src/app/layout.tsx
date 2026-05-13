import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono, Permanent_Marker } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "700"],
});

const marker = Permanent_Marker({
  subsets: ["latin"],
  variable: "--font-marker",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "R³AP · Teacher Studio",
  description:
    "R³ Agency Practice — the teacher's 10-track studio. Clear the Fog, Check Your Levels, Load the Track, Read the Playbook, Practice, go Live, capture Liner Notes, Remix, share at the Cypher, Master the Flow.",
};

export const viewport: Viewport = {
  themeColor: "#0C3645",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${jetbrains.variable} ${marker.variable}`}>
      <body className="min-h-dvh">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
