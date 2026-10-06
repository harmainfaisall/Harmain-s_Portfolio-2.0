import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#020617",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Harmain Faisal | Full-Stack Web Developer & DevOps",
  description:
    "Portfolio of Harmain Faisal — Full-Stack Web Developer & DevOps practitioner at SMIT. Architecting modern web applications, scalable APIs, and automated deployment pipelines.",
  keywords: [
    "Harmain Faisal",
    "Full-Stack Developer",
    "DevOps Engineer",
    "Next.js Developer",
    "React Developer",
    "Saylani Mass IT Training",
    "SMIT",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
  ],
  authors: [{ name: "Harmain Faisal", url: "https://github.com/harmainfaisall" }],
  creator: "Harmain Faisal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://harmainfaisal.dev",
    title: "Harmain Faisal | Full-Stack Web Developer & DevOps",
    description:
      "Full-Stack Web Developer and DevOps practitioner crafting resilient web applications with modern cloud technologies.",
    siteName: "Harmain Faisal Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Harmain Faisal — Full-Stack Web Developer & DevOps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harmain Faisal | Full-Stack Web Developer & DevOps",
    description:
      "Full-Stack Web Developer and DevOps practitioner crafting resilient web applications with modern cloud technologies.",
    creator: "@harmainfaisall",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} bg-slate-950 text-slate-100 antialiased selection:bg-slate-700/60 selection:text-white`}
      >
        <div className="fixed inset-0 pointer-events-none bg-grain z-50 opacity-25" />
        {children}
      </body>
    </html>
  );
}
