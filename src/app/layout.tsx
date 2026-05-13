import type { Metadata, Viewport } from "next";
import { Inter, Space_Mono, Permanent_Marker, Reenie_Beanie } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  variable: "--font-marker",
  weight: ["400"],
  display: "swap",
});

const reenieBeanie = Reenie_Beanie({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "R³.A.P. · Teacher's Edition",
  description:
    "R³ Agency Practice — the teacher's studio. Orient. Rehearse. Go live. Reflect. Master the flow.",
};

export const viewport: Viewport = {
  themeColor: "#092D3A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceMono.variable} ${permanentMarker.variable} ${reenieBeanie.variable}`}
    >
      <body className="min-h-dvh">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
