import type { Metadata } from "next";
import Link from "next/link";
import sampleAdvice from "@/data/sample-advice.json";

export const metadata: Metadata = { title: "Coleague · Demo source preview" };

export default function DemoSourcesPage() {
  return (
    <main className="prototype-source-page">
      <Link href="/" className="prototype-back-link">← Back to Pantheon vs Darius</Link>
      <h1>Demo source preview</h1>
      <div className="prototype-notice" role="note">
        <b>Fictional sources · Interface demonstration</b>
        <p>We wrote these example excerpts for this prototype. They do not come from real posts or comments. In a connected product, a citation would open the original discussion.</p>
      </div>
      {sampleAdvice.sections.map(section => (
        <section key={section.id} aria-label={section.title}>
          <h2>{section.title}</h2>
          {section.advice.map((advice, index) => (
            <article className="dashboard-card prototype-source-card" id={advice.id} key={advice.id} tabIndex={-1}>
              <header><h3>[{index + 1}] {advice.source_title}</h3></header>
              <div>
                <span className="placeholder-label">Fictional source excerpt</span>
                <blockquote>{advice.source_excerpt}</blockquote>
                <Link href={`/#${section.id}`}>Back to this advice</Link>
              </div>
            </article>
          ))}
        </section>
      ))}
    </main>
  );
}
