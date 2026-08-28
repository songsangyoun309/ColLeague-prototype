"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type FocusEvent } from "react";

export function useTooltipPosition(preferred: "top" | "bottom", width: number) {
  const anchor = useRef<HTMLSpanElement>(null);
  const popover = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, maxHeight: 0, placement: preferred });

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const show = () => { cancelClose(); setOpen(true); };
  const leave = () => {
    cancelClose();
    // Allow the pointer to cross the gap into a long, scrollable tooltip.
    closeTimer.current = setTimeout(() => {
      if (!anchor.current?.contains(document.activeElement)) setOpen(false);
    }, 150);
  };
  const blur = (event: FocusEvent<HTMLSpanElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget) && !event.currentTarget.matches(":hover")) {
      setOpen(false);
    }
  };

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  useLayoutEffect(() => {
    if (!open || !anchor.current || !popover.current) return;
    const update = () => {
      const trigger = anchor.current!.getBoundingClientRect();
      const popup = popover.current!;
      const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
      const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
      const minTop = Math.max(8, headerBottom + 8);
      const bottomEdge = window.innerHeight - 8;
      if (trigger.bottom < minTop || trigger.top > bottomEdge) {
        setOpen(false);
        return;
      }
      const above = Math.max(0, trigger.top - minTop - 12);
      const below = Math.max(0, bottomEdge - trigger.bottom - 12);
      const height = popup.scrollHeight + 2;
      const spaces = { top: above, bottom: below };
      const opposite = preferred === "top" ? "bottom" : "top";
      const placement = height > spaces[preferred] && spaces[opposite] > spaces[preferred] ? opposite : preferred;
      const maxHeight = spaces[placement];
      const actualWidth = Math.min(width, viewportWidth - 16);
      const left = Math.max(8, Math.min(trigger.left + trigger.width / 2 - actualWidth / 2, viewportWidth - actualWidth - 8));
      const top = placement === "top"
        ? Math.max(minTop, trigger.top - 12 - Math.min(height, maxHeight))
        : Math.max(minTop, trigger.bottom + 12);
      setPosition({ top, left, maxHeight, placement });
    };
    const dismiss = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    window.addEventListener("keydown", dismiss);
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(update);
    observer?.observe(popover.current);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
      window.removeEventListener("keydown", dismiss);
      observer?.disconnect();
    };
  }, [open, preferred, width]);

  const style: CSSProperties = {
    position: "fixed", top: position.top, left: position.left, right: "auto", bottom: "auto",
    width, maxWidth: "calc(100vw - 16px)", maxHeight: open ? position.maxHeight : undefined,
    transform: "none", overflowY: "auto", overscrollBehavior: "contain",
    opacity: open ? 1 : 0, visibility: open ? "visible" : "hidden", pointerEvents: open ? "auto" : "none",
    textAlign: "left",
  };
  return {
    triggerProps: { ref: anchor, style: { zIndex: open ? 30 : undefined }, onMouseEnter: show, onMouseLeave: leave, onFocus: show, onBlur: blur },
    popoverProps: { ref: popover, style, "data-placement": position.placement, "data-positioned": true },
  };
}
