import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import "./globals.css";
import "./prototype.css";

const sourceSans = localFont({ src: "./fonts/source-sans-3-variable.woff2", variable: "--font-body", weight: "200 900", display: "swap", fallback: ["Arial", "sans-serif"] });
const chakraPetch = localFont({ src: "./fonts/chakra-petch-latin-600.woff2", variable: "--font-display", weight: "600", display: "swap" });
const cinzel = localFont({ src: "./fonts/cinzel-bold-c.ttf", variable: "--font-brand", weight: "700", display: "swap" });

export const metadata: Metadata = {
  title: "Coleague · Pantheon vs Darius · Top · Prototype",
  description: "Fixed-matchup application prototype with sample statistics and placeholder advice. Not a live data product.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${chakraPetch.variable} ${cinzel.variable}`}>
      <body>
        <header className="site-header">
          <Link href="/" className="brand" aria-label="Coleague prototype home">
            <span className="brand-mark" aria-hidden="true">C</span>
            <span>Co<span className="brand-accent">league</span></span>
          </Link>
          <span className="prototype-badge">Application prototype</span>
        </header>
        {children}
        <footer className="site-footer">
          <span className="footer-brand">Co<span className="brand-accent">league</span></span>
          <a href="https://developer.riotgames.com/policies/general" target="_blank" rel="noreferrer">Riot developer policies</a>
          <p className="legal">Coleague isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.</p>
        </footer>
      </body>
    </html>
  );
}
