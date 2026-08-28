import type { RunePage, SummonerSpellSet } from "@/lib/types";
import { runeIconUrl, summonerSpellIconUrl } from "@/lib/game-data";

function RunePicks({ names, label, shards = false }: { names: string[]; label: string; shards?: boolean }) {
  return (
    <div className="rune-picks" role="list" aria-label={label}>
      {names.map((name, index) => {
        const icon = runeIconUrl(name);
        return (
          <span className={shards ? "rune-pick rune-shard" : "rune-pick"} key={`${name}-${index}`} title={name} role="listitem">
            {icon
              ? <img src={icon} alt="" loading="lazy" />
              : <span className="rune-pick-fallback" aria-hidden="true">{name.slice(0, 1)}</span>}
            <span className="rune-pick-name">{name}</span>
          </span>
        );
      })}
    </div>
  );
}

export function RuneTable({ pages, summonerSpells, compact = false }: { pages: RunePage[]; summonerSpells?: SummonerSpellSet | null; compact?: boolean }) {
  return (
    <div className={compact ? "rune-grid compact" : "rune-grid"}>
      {pages.map((page) => {
        const icon = runeIconUrl(page.configuration.keystone);
        const isGuide = page.data_status === "historical_guide";
        const isKeystoneStat = page.stat_scope === "keystone";
        const isDerivedShare = page.pick_rate_kind === "derived_matchup_share";
        return (
          <article className="rune-card" key={page.id}>
            <div className="rune-card-header">
              <span className="keystone-orb" title={page.configuration.keystone}>
                {icon
                  ? <img src={icon} alt={`${page.configuration.keystone} rune icon`} />
                  : page.configuration.keystone.slice(0, 1)}
              </span>
              <div>
                <span className="eyebrow">Sample rune page</span>
                <h3>{page.configuration.keystone}</h3>
              </div>
              {page.is_low_sample && <span className="low-sample">Low sample</span>}
            </div>

            <div className="rune-paths">
              <div className="rune-path"><span>Primary</span><RunePicks names={page.configuration.primary} label="Primary runes" /></div>
              <div className="rune-path"><span>Secondary</span><RunePicks names={page.configuration.secondary} label="Secondary runes" /></div>
              {!compact && <div className="rune-path"><span>Shards</span><RunePicks names={page.configuration.shards} label="Rune shards" shards /></div>}
            </div>

            {isGuide ? (
              <p className="guide-data-note">Archived Patch {page.patch_range} recommendation</p>
            ) : <dl className="rune-stats">
              <div><dt>{isKeystoneStat ? "Keystone sample" : "Sample"}</dt><dd>{page.sample_size.toLocaleString()} games</dd></div>
              <div><dt>{isDerivedShare ? "Matchup share" : "Pick rate"}</dt><dd>{page.pick_rate.toFixed(1)}%</dd></div>
              <div><dt>{isKeystoneStat ? "Keystone WR" : "Raw WR"}</dt><dd>{page.raw_win_rate.toFixed(1)}%</dd></div>
              <div><dt>Coverage</dt><dd>{page.rank_range} · {page.region}</dd></div>
            </dl>}

            {summonerSpells && (
              <div className="summoner-spell-set">
                <div>
                  <span>Sample spell choices</span>
                  <div className="summoner-spell-icons">
                    {summonerSpells.choices.map((spell) => {
                      const spellIcon = summonerSpellIconUrl(spell.id);
                      return (
                        <span key={spell.id} title={spell.name}>
                          {spellIcon && <img src={spellIcon} alt={`${spell.name} summoner spell`} />}
                          <b>{spell.name}</b>
                        </span>
                      );
                    })}
                  </div>
                </div>
                <dl>
                  <div><dt>Sample</dt><dd>{summonerSpells.sample_size.toLocaleString()} games</dd></div>
                  <div><dt>Raw WR</dt><dd>{summonerSpells.raw_win_rate.toFixed(1)}%</dd></div>
                </dl>
                {summonerSpells.is_low_sample && <span className="low-sample">Low sample</span>}
              </div>
            )}

          </article>
        );
      })}
    </div>
  );
}
