export const DDRAGON_VERSION = "16.15.1";

export type AbilityKey = "P" | "Q" | "W" | "E" | "R";

export type AbilityDetails = {
  champion: string;
  key: AbilityKey;
  id: string;
  name: string;
  description: string;
  cooldown: string;
  cost: string;
  resource: string | null;
  iconUrl: string;
  patch: string;
};

export type AbilityCatalog = Record<string, AbilityDetails>;

export function itemIconUrl(itemId: number): string {
  return `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/item/${itemId}.png`;
}

const SUMMONER_SPELL_FILES: Record<number, string> = {
  1: "SummonerBoost",
  3: "SummonerExhaust",
  4: "SummonerFlash",
  6: "SummonerHaste",
  7: "SummonerHeal",
  11: "SummonerSmite",
  12: "SummonerTeleport",
  14: "SummonerDot",
  21: "SummonerBarrier",
};

export function summonerSpellIconUrl(spellId: number): string | null {
  const file = SUMMONER_SPELL_FILES[spellId];
  return file
    ? `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/spell/${file}.png`
    : null;
}

const RUNE_ICON_PATHS: Record<string, string> = {
  "Biscuit Delivery": "Styles/Inspiration/BiscuitDelivery/BiscuitDelivery.png",
  "Bone Plating": "Styles/Resolve/BonePlating/BonePlating.png",
  Conditioning: "Styles/Resolve/Conditioning/Conditioning.png",
  Conqueror: "Styles/Precision/Conqueror/Conqueror.png",
  "Cosmic Insight": "Styles/Inspiration/CosmicInsight/CosmicInsight.png",
  "Coup de Grace": "Styles/Precision/CoupDeGrace/CoupDeGrace.png",
  "Cut Down": "Styles/Precision/CutDown/CutDown.png",
  Demolish: "Styles/Resolve/Demolish/Demolish.png",
  Electrocute: "Styles/Domination/Electrocute/Electrocute.png",
  "Grisly Mementos": "Styles/Domination/GrislyMementos/GrislyMementos.png",
  "Last Stand": "Styles/Sorcery/LastStand/LastStand.png",
  "Legend: Alacrity": "Styles/Precision/LegendAlacrity/LegendAlacrity.png",
  "Legend: Haste": "Styles/Precision/LegendHaste/LegendHaste.png",
  "Manaflow Band": "Styles/Sorcery/ManaflowBand/ManaflowBand.png",
  Overgrowth: "Styles/Resolve/Overgrowth/Overgrowth.png",
  "Presence of Mind": "Styles/Precision/PresenceOfMind/PresenceOfMind.png",
  "Press the Attack": "Styles/Precision/PressTheAttack/PressTheAttack.png",
  "Relentless Hunter": "Styles/Domination/RelentlessHunter/RelentlessHunter.png",
  Scorch: "Styles/Sorcery/Scorch/Scorch.png",
  "Second Wind": "Styles/Resolve/SecondWind/SecondWind.png",
  "Sixth Sense": "Styles/Domination/SixthSense/SixthSense.png",
  "Sudden Impact": "Styles/Domination/SuddenImpact/SuddenImpact.png",
  Transcendence: "Styles/Sorcery/Transcendence/Transcendence.png",
  "Treasure Hunter": "Styles/Domination/TreasureHunter/TreasureHunter.png",
  Triumph: "Styles/Precision/Triumph.png",
  "Ultimate Hunter": "Styles/Domination/UltimateHunter/UltimateHunter.png",
  Unflinching: "Styles/Sorcery/Unflinching/Unflinching.png",
  "Adaptive Force": "StatMods/StatModsAdaptiveForceIcon.png",
  "Attack Speed": "StatMods/StatModsAttackSpeedIcon.png",
  "Ability Haste": "StatMods/StatModsCDRScalingIcon.png",
  "Health Scaling": "StatMods/StatModsHealthScalingIcon.png",
  "Move Speed": "StatMods/StatModsMovementSpeedIcon.png",
  Health: "StatMods/StatModsHealthPlusIcon.png",
  "Tenacity and Slow Resist": "StatMods/StatModsTenacityIcon.png",
};

export function runeIconUrl(runeName: string): string | null {
  const path = RUNE_ICON_PATHS[runeName];
  return path ? `https://ddragon.leagueoflegends.com/cdn/img/perk-images/${path}` : null;
}
