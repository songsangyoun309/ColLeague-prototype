import type { ReactNode } from "react";
import type { AbilityCatalog, AbilityDetails, AbilityKey } from "@/lib/game-data";
import { AbilityIcon } from "./AbilityIcon";

type AbilityOwner = "player" | "opponent";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function recentChampionOwner(
  before: string,
  playerName: string,
  opponentName: string,
): AbilityOwner | null {
  const playerIndex = before.lastIndexOf(playerName.toLowerCase());
  const opponentIndex = before.lastIndexOf(opponentName.toLowerCase());
  const nearestIndex = Math.max(playerIndex, opponentIndex);
  if (nearestIndex === -1) return null;
  if (nearestIndex < before.length - 56) return null;
  return playerIndex > opponentIndex ? "player" : "opponent";
}

function hasUninterruptedOwnerTail(before: string, ownerPattern: string, maxWords: number): boolean {
  const descriptor = `(?:\\s+(?!(?:p|q|w|e|r|and|or)\\b)[\\w'-]+){0,${maxWords}}`;
  return new RegExp(`\\b(?:${ownerPattern})(?:'s)?${descriptor}\\s*$`).test(before);
}

export function inferAbilityOwner(
  text: string,
  index: number,
  playerName: string,
  opponentName: string,
  lastOwner: AbilityOwner | null,
  hasStageNumber: boolean,
  previousAbilityEnd: number,
  defaultOwner: AbilityOwner = "player",
): AbilityOwner {
  const before = text.slice(Math.max(previousAbilityEnd, index - 120), index).toLowerCase().replace(/[’‘]/g, "'");
  const after = text.slice(index + 1, index + 32).toLowerCase();
  const clause = before.slice(Math.max(before.lastIndexOf("."), before.lastIndexOf(";"), before.lastIndexOf(":")) + 1);
  const player = escapeRegExp(playerName.toLowerCase());
  const opponent = escapeRegExp(opponentName.toLowerCase());

  // In "E his Q", the first key is the player's response and the possessive key is the opponent's.
  if (/^\s+(?:his|her|their|the\s+(?:first|second|third|1st|2nd|3rd))\b/.test(after)) return "player";

  const namesPlayer = hasUninterruptedOwnerTail(before, player, 3);
  const namesOpponent = hasUninterruptedOwnerTail(before, opponent, 4);
  if (namesPlayer && namesOpponent) return recentChampionOwner(before, playerName, opponentName) ?? defaultOwner;
  if (namesPlayer) return "player";
  if (namesOpponent) return "opponent";
  if (/\b(?:your|your own|own)\b(?:\s+[\w'-]+){0,3}\s*$/.test(before)) return "player";

  // Counterplay sections describe the opponent unless they explicitly name your spell.
  if (defaultOwner === "opponent") return "opponent";
  if (hasUninterruptedOwnerTail(before, "his|her|their|him|enemy|opponent", 4)) return "opponent";
  if (/\b(?:he|she|they)\b(?:\s+[\w'-]+){0,5}\s*$/.test(before)) return "opponent";
  if (/\b(?:dodge|avoid|bait|respect|track|answer|escape|miss|facetank|after|before)\b(?:\s+[\w'-]+){0,3}\s*$/.test(before)) return "opponent";
  if (/\b(?:get isolated|get empowered|let him use|let her use)\b(?:\s+[\w'-]+){0,2}\s*$/.test(before)) return "opponent";
  if (/\b(?:first|second|third|1st|2nd|3rd)\s*$/.test(before)) return "opponent";
  if (/\bagainst\b/.test(clause) && !/\b(?:use|save|hold|keep|tap)\b/.test(clause)) return "opponent";

  if (/\b(?:use|save|hold|keep|spend|tap|throw|face|cast|poke with|punish with|finish with|dismount with)\b(?:\s+[\w'-]+){0,3}\s*$/.test(before)) return "player";

  if (hasStageNumber) return "opponent";
  if (lastOwner && /^(?:\s+[\w'-]+)?\s*(?:\/|,?\s*\b(?:and|or))\s*(?:[\w'-]+\s+){0,1}$/.test(before)) return lastOwner;

  return recentChampionOwner(before, playerName, opponentName) ?? defaultOwner;
}

export function AbilityText({
  text,
  playerName,
  opponentName,
  playerAbilities,
  opponentAbilities,
  defaultOwner = "player",
}: {
  text: string;
  playerName: string;
  opponentName: string;
  playerAbilities: AbilityCatalog;
  opponentAbilities: AbilityCatalog;
  defaultOwner?: AbilityOwner;
}) {
  const output: ReactNode[] = [];
  const namedAbilities = new Map<string, { ability: AbilityDetails; owner: AbilityOwner }>([
    ...Object.values(playerAbilities).map((ability) => [ability.name, { ability, owner: "player" as const }] as const),
    ...Object.values(opponentAbilities).map((ability) => [ability.name, { ability, owner: "opponent" as const }] as const),
  ]);
  for (const name of namedAbilities.keys()) {
    if (/^[PQWER]{1,4}$/.test(name)) namedAbilities.delete(name);
  }
  for (const [name, details] of [...namedAbilities]) {
    const withoutPunctuation = name.replace(/[!?]+$/, "");
    if (withoutPunctuation !== name) namedAbilities.set(withoutPunctuation, details);
  }
  const abilityNames = [...namedAbilities.keys()]
    .sort((left, right) => right.length - left.length)
    .map(escapeRegExp)
    .join("|");
  // Supports full spell names plus Q, Q2/Q3, Q'd/Qed, plural Qs, and compact combos such as EQ.
  const pattern = new RegExp(
    `\\b(${abilityNames || "(?!)"})(?!\\w)|\\b([PQWER]{1,4})(\\d+|'d|ed|d|s)?\\b`,
    "g",
  );
  let lastIndex = 0;
  let previousAbilityEnd = 0;
  let lastOwner: AbilityOwner | null = null;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const namedAbility = match[1] ? namedAbilities.get(match[1]) : null;
    if (namedAbility) {
      output.push(text.slice(lastIndex, match.index));
      output.push(
        <span className="inline-ability" key={`${match.index}-${match[0]}`}>
          <AbilityIcon ability={namedAbility.ability} fallbackKey={namedAbility.ability.key} size="small" />
        </span>,
      );
      lastIndex = match.index + match[0].length;
      previousAbilityEnd = lastIndex;
      lastOwner = namedAbility.owner;
      continue;
    }

    const keys = match[2].split("") as AbilityKey[];
    const suffix = match[3] ?? "";
    const owner = inferAbilityOwner(
      text,
      match.index,
      playerName,
      opponentName,
      lastOwner,
      /^\d+$/.test(suffix),
      previousAbilityEnd,
      defaultOwner,
    );
    const catalog = owner === "opponent" ? opponentAbilities : playerAbilities;

    output.push(text.slice(lastIndex, match.index));
    // Hwei's QQ/QW/QE etc. select one spell, not two casts. The catalog has only family icons.
    if ((owner === "opponent" ? opponentName : playerName) === "Hwei" && /^[QWE]{2}$/.test(match[2])) {
      output.push(match[0]);
      lastIndex = match.index + match[0].length;
      previousAbilityEnd = lastIndex;
      lastOwner = owner;
      continue;
    }
    output.push(
      <span className="inline-ability-group" key={`${match.index}-${match[0]}`}>
        {keys.map((key, keyIndex) => (
          <span className="inline-ability" key={`${key}-${keyIndex}`}>
            <AbilityIcon ability={catalog[key]} fallbackKey={key} size="small" />
          </span>
        ))}
        {/^\d+$/.test(suffix) && <span className="ability-stage">{suffix}</span>}
      </span>,
    );
    lastIndex = match.index + match[0].length;
    previousAbilityEnd = lastIndex;
    lastOwner = owner;
  }

  output.push(text.slice(lastIndex));
  return <>{output}</>;
}
