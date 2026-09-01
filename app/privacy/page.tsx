import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy · ColLeague prototype",
  description: "How the ColLeague prototype handles visitor information.",
};

export default function PrivacyPage() {
  return (
    <main className="prototype-source-page prototype-policy-page">
      <Link href="/" className="prototype-back-link">← Back to Pantheon vs Darius</Link>
      <h1>Privacy Policy</h1>
      <p className="prototype-policy-updated">Last updated <time dateTime="2026-09-01">September 1, 2026</time></p>

      <section>
        <h2>About this prototype</h2>
        <p>ColLeague is a fixed, public application prototype. It shows one League of Legends matchup with sample statistics and fictional advice. The prototype has no accounts, forms, payments, live Riot API connection, or community-data connection.</p>
      </section>

      <section>
        <h2>Information handling</h2>
        <p>ColLeague does not ask for or intentionally collect your name, email address, Riot ID, Reddit account, location, or payment information. It does not use advertising, analytics, or tracking tools.</p>
        <p>The hosting provider may process standard request information, such as your IP address, browser type, requested page, and request time, to deliver and secure the website. ColLeague does not use that information to identify visitors, create profiles, or sell data.</p>
      </section>

      <section>
        <h2>Cookies and external resources</h2>
        <p>ColLeague does not set advertising or analytics cookies. The prototype loads official game images from Riot-hosted services. Your browser sends standard request information to those services when it loads an image. External links follow the privacy practices of their destination sites.</p>
      </section>

      <section>
        <h2>Retention and changes</h2>
        <p>ColLeague maintains no visitor database. The hosting provider controls its operational log retention. This policy will change if the product adds accounts, analytics, live APIs, or another feature that processes personal information.</p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>For privacy questions, contact the project owner through the <a href="https://github.com/songsangyoun309/ColLeague-prototype" target="_blank" rel="noreferrer">ColLeague prototype repository</a>.</p>
      </section>
    </main>
  );
}
