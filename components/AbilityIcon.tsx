"use client";

import { useId } from "react";
import type { AbilityDetails } from "@/lib/game-data";
import { useTooltipPosition } from "./useTooltipPosition";

export function AbilityIcon({
  ability,
  fallbackKey,
  size = "regular",
}: {
  ability?: AbilityDetails;
  fallbackKey: string;
  size?: "small" | "regular";
}) {
  const tooltipId = useId();
  const { triggerProps, popoverProps } = useTooltipPosition("top", 350);
  if (!ability) {
    return (
      <span className={`ability-tooltip fallback ${size}`} aria-label={`${fallbackKey} ability`}>
        <span className="ability-icon fallback">{fallbackKey}</span>
        <span className="ability-keybind" aria-hidden="true">{fallbackKey}</span>
      </span>
    );
  }

  return (
    <span {...triggerProps} className={`ability-tooltip ${size}`} tabIndex={0} aria-label={`${ability.champion} ${ability.name}`} aria-describedby={tooltipId}>
      <img className="ability-icon" src={ability.iconUrl} alt={`${ability.name} ability icon`} />
      <span className="ability-keybind" aria-hidden="true">{ability.key}</span>
      <span {...popoverProps} className="ability-popover" role="tooltip" id={tooltipId}>
        <span className="ability-popover-head">
          <img src={ability.iconUrl} alt="" />
          <span>
            <small>{ability.champion} · {ability.key}</small>
            <b>{ability.name}</b>
          </span>
        </span>
        <span className="ability-description">{ability.description}</span>
        <span className="ability-stats">
          {ability.cooldown && <span>Cooldown <b>{ability.cooldown}s</b></span>}
          {ability.cost && <span>Cost <b>{ability.cost}</b></span>}
          <span>Patch <b>{ability.patch}</b></span>
        </span>
      </span>
    </span>
  );
}
