import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use · ColLeague prototype",
  description: "Terms for using the ColLeague application prototype.",
};

export default function TermsPage() {
  return (
    <main className="prototype-source-page prototype-policy-page">
      <Link href="/" className="prototype-back-link">← Back to Pantheon vs Darius</Link>
      <h1>Terms of Use</h1>
      <p className="prototype-policy-updated">Last updated <time dateTime="2026-09-01">September 1, 2026</time></p>

      <section>
        <h2>Using ColLeague</h2>
        <p>By using this prototype, you agree to these terms. You may use it for personal, lawful purposes. Do not disrupt the site, bypass its security, or use it to violate another person&apos;s rights.</p>
      </section>

      <section>
        <h2>Prototype content</h2>
        <p>ColLeague demonstrates a planned matchup-reference product. Its statistics, builds, advice, and citation previews are sample content. They do not represent live data, reviewed community guidance, or a promise that a future product will include every demonstrated feature.</p>
        <p>Use the prototype for general information only. Check current in-game information and exercise your own judgment before relying on gameplay details.</p>
      </section>

      <section>
        <h2>Third-party materials</h2>
        <p>Riot Games owns its game names, characters, artwork, and related properties. ColLeague receives no endorsement from Riot Games. Links to external sites are provided for reference, and those sites apply their own terms.</p>
      </section>

      <section>
        <h2>Availability and responsibility</h2>
        <p>The project owner may change, suspend, or remove the prototype. The prototype is provided as available, without guarantees about accuracy, uninterrupted access, or suitability for a particular purpose. To the extent allowed by law, the project owner is not responsible for losses caused by your use of, or reliance on, the prototype.</p>
      </section>

      <section>
        <h2>Changes and contact</h2>
        <p>The date above will change when these terms receive a material update. For questions, contact the project owner through the <a href="https://github.com/songsangyoun309/ColLeague-prototype" target="_blank" rel="noreferrer">ColLeague prototype repository</a>.</p>
      </section>
    </main>
  );
}
