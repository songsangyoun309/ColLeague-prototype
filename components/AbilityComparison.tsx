import type { CSSProperties } from "react";
import type { AbilityCatalog, AbilityKey } from "@/lib/game-data";
import { AbilityIcon } from "./AbilityIcon";

const abilityKeys: AbilityKey[] = ["P", "Q", "W", "E", "R"];

export function AbilityComparison({
  playerName,
  playerAbilities,
  opponentName,
  opponentAbilities,
}: {
  playerName: string;
  playerAbilities: AbilityCatalog;
  opponentName: string;
  opponentAbilities: AbilityCatalog;
}) {
  const champions = [
    { name: playerName, abilities: playerAbilities, label: "You" },
    { name: opponentName, abilities: opponentAbilities, label: "Opponent" },
  ];
  return (
    <section className="dashboard-card ability-comparison" aria-labelledby="ability-comparison-title">
      <header>
        <h2 id="ability-comparison-title">Abilities & cooldowns</h2>
      </header>
      <p className="ability-comparison-note">
        Base cooldowns by ability rank · Before haste, resets or recasts
      </p>
      <div className="ability-comparison-grid">
        {champions.map(({ name, abilities, label }, side) => (
          <div className="ability-comparison-row" role="group" aria-label={`${name} abilities`}
            style={{ "--ability-side": side + 1 } as CSSProperties} key={label}>
            <h3><small>{label}</small>{name}</h3>
            {abilityKeys.map((key, index) => {
              const ability = abilities[key];
              return (
                <div className="ability-comparison-cell" data-ability-key={key}
                  style={{ "--ability-slot": index + 2 } as CSSProperties} key={key}>
                  <AbilityIcon ability={ability} fallbackKey={key} />
                  <b className="ability-comparison-name">{ability?.name ?? `${key} ability`}</b>
                  {ability?.cooldown && (
                    <span className="ability-cooldown"
                      aria-label={`${name} ${key} base cooldown: ${ability.cooldown.replaceAll("/", ", ")} seconds`}>
                      {ability.cooldown.split("/").map((value, rank) => (
                        <span className="ability-cooldown-rank" aria-hidden="true" key={rank}>
                          {rank > 0 && <span className="ability-cooldown-separator"> / </span>}
                          <b>{value}</b>
                        </span>
                      ))}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
