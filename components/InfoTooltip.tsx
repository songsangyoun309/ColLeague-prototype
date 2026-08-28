"use client";

import { useTooltipPosition } from "./useTooltipPosition";

export function InfoTooltip({
  label,
  children,
  id,
}: {
  label: string;
  children: string;
  id: string;
}) {
  const { triggerProps, popoverProps } = useTooltipPosition("bottom", 240);
  return (
    <span {...triggerProps} className="info-tooltip">
      <button type="button" aria-label={label} aria-describedby={id}>?</button>
      <span {...popoverProps} className="info-tooltip-popover" id={id} role="tooltip">
        {children}
      </span>
    </span>
  );
}
