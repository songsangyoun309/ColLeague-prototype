import Link from "next/link";
import { AbilityComparison } from "@/components/AbilityComparison";
import { AbilityText } from "@/components/AbilityText";
import { InfoTooltip } from "@/components/InfoTooltip";
import { RuneTable } from "@/components/RuneTable";
import { ItemTable } from "@/components/ItemTable";
import abilities from "@/data/abilities.json";
import sample from "@/data/sample-build.json";
import sampleAdvice from "@/data/sample-advice.json";
import { DDRAGON_VERSION, type AbilityCatalog } from "@/lib/game-data";
import type { RunePage, Item } from "@/lib/types";

const { Pantheon, Darius } = abilities.champions as Record<"Pantheon" | "Darius", AbilityCatalog>;
const portrait = (name: string) => `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/${name}.png`;
const runePage: RunePage = {
  id: 1, name: "Sample rune page", patch_range: "Sample", sample_size: 500,
  wins: 250, losses: 250, raw_win_rate: 50, pick_rate: 50, adjusted_score: 0,
  rank_range: "Sample", region: "Sample", configuration: sample.runes,
  is_low_sample: false, data_status: "sample_data", stat_scope: "keystone", pick_rate_kind: "derived_matchup_share",
};
const items: Item[] = sample.items.map((item, index) => ({
  ...item, id: index + 1, order: index + 1, sample_size: 500, raw_win_rate: 50,
  adjusted_score: 0, pick_rate: 50, median_purchase_minute: null,
  is_low_sample: false, data_status: "sample_data", pick_rate_kind: "derived_matchup_share",
}));

export default function PrototypePage() {
  return (
    <main className="study-dashboard-page">
      <div className="study-dashboard-shell">
        <aside className="dashboard-context">
          <div className="dashboard-matchup">
            <span className="prototype-lane">Top lane · Fixed matchup</span>
            <div className="prototype-portraits" aria-label="Pantheon versus Darius">
              <img src={portrait("Pantheon")} alt="Pantheon" />
              <span>vs</span>
              <img src={portrait("Darius")} alt="Darius" />
            </div>
            <span className="eyebrow">Pantheon Top</span>
            <h1>vs Darius</h1>
          </div>
        </aside>
        <section className="dashboard-main">
          <div className="unified-dashboard">
            <div className="prototype-notice" role="note">
              <b>Prototype · Sample data</b>
              <p>Statistics and build choices below are invented examples. Advice and citation previews are fictional examples, not reviewed community guidance. No live statistics or community feeds are connected.</p>
            </div>
            <section className="unified-section">
              <header className="unified-section-heading"><h2>Build &amp; runes</h2></header>
              <div className="matchup-stat-strip prototype-stat-strip">
                <dl>
                  <div><dt>Game win rate</dt><dd>{sample.win_rate.toFixed(2)}%</dd></div>
                  <div>
                    <dt className="stat-label">Matchup rating
                      <InfoTooltip id="sample-rating-help" label="About this sample rating">This +1.0 rating is an invented example to demonstrate the scale. It is not calculated from match results and is not an assessment of this matchup.</InfoTooltip>
                    </dt>
                    <dd className="positive">
                      <div className="matchup-rating-scale" role="meter" aria-label="Sample matchup rating"
                        aria-valuemin={-5} aria-valuemax={5} aria-valuenow={sample.rating} aria-valuetext="Sample value: +1.0 on a scale from -5 to +5">
                        <div className="matchup-rating-track" aria-hidden="true">
                          <span className="matchup-rating-midpoint" />
                          <span className="matchup-rating-marker" style={{ left: `${(sample.rating + 5) * 10}%` }}><span className="matchup-rating-value">+{sample.rating.toFixed(1)}</span></span>
                        </div>
                        <div className="matchup-rating-ticks" aria-hidden="true"><span>-5</span><span>0</span><span>+5</span></div>
                      </div>
                    </dd>
                  </div>
                  <div><dt>Games</dt><dd>{sample.games.toLocaleString("en-US")}</dd></div>
                </dl>
              </div>
              <div className="build-dashboard-grid">
                <section className="dashboard-card dashboard-runes">
                  <header><h3>Runes</h3></header>
                  <RuneTable pages={[runePage]} summonerSpells={{ choices: sample.spells, sample_size: 500, raw_win_rate: 50, pick_rate: 50, is_low_sample: false }} />
                  <p className="table-note">Sample choices and numbers · Not recommendations</p>
                </section>
                <section className="dashboard-card dashboard-items">
                  <header><h3>Items</h3></header>
                  <ItemTable items={items} bonusItems={sample.bonus_items} />
                  <p className="table-note">Sample choices and numbers · Not recommendations</p>
                </section>
              </div>
            </section>

            <AbilityComparison playerName="Pantheon" playerAbilities={Pantheon} opponentName="Darius" opponentAbilities={Darius} />

            {sampleAdvice.sections.map(section => (
              <section className={`dashboard-card dashboard-advice community-consensus ${section.id === "opponent-advice" ? "general-consensus" : section.id === "champion-advice" ? "champion-guide" : ""}`} id={section.id} key={section.id}>
                <header><h2>{section.title}</h2></header>
                <p className="prototype-advice-note">Sample advice · Fictional examples</p>
                <ul className="advice-list">
                  {section.advice.map((advice, index) => (
                    <li className="advice-card" key={advice.id}>
                      <p className="advice-prose">
                        <AbilityText text={advice.text} playerName="Pantheon" opponentName="Darius"
                          playerAbilities={Pantheon} opponentAbilities={Darius} />
                        <span className="inline-citations" aria-label="Demo citations">
                          <Link href={`/demo-sources#${advice.id}`} title={`Fictional demo source: ${advice.source_title}`}
                            aria-label={`Demo source ${index + 1}: ${advice.source_title} (fictional)`}>[{index + 1}]</Link>
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <section className="dashboard-card unified-videos">
              <header><h2>Recent replay</h2></header>
              <p className="prototype-replay">Replay placeholder · No video is loaded in this demo.</p>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
