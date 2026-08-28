import type { BonusItem, Item } from "@/lib/types";
import { itemIconUrl } from "@/lib/game-data";

const stageNames: Record<string, string> = {
  starting: "Starting items",
  boots: "Boots",
  first_completed: "First completed item",
  second_completed: "Second completed item",
  component: "Early components",
};

export function ItemTable({ items, bonusItems = [], compact = false }: { items: Item[]; bonusItems?: BonusItem[]; compact?: boolean }) {
  const visible = compact ? items.filter((item) => item.stage === "starting").slice(0, 2) : items;
  const usesDerivedShare = visible.some(
    (item) => item.pick_rate_kind === "derived_matchup_share",
  );
  const rateLabel = usesDerivedShare ? "Matchup share" : "Pick rate";
  return (
    <div className="item-table">
      <div className="item-row item-head">
        <span>Choice</span><span>Sample</span><span>{rateLabel}</span><span>Raw WR</span>
      </div>
      {visible.map((item) => (
        <div className="item-row" key={item.id}>
          <span className="item-name">
            <img src={itemIconUrl(item.item_id)} alt={`${item.name} icon`} title={item.name} />
            <span><b>{item.name}</b><small>{stageNames[item.stage] ?? item.stage}</small></span>
          </span>
          {item.data_status === "historical_guide" ? (
            <>
              <span data-label="Sample">Guide</span>
              <span data-label="Pick rate">Patch 14.12</span>
              <span data-label="Raw WR">Archived</span>
            </>
          ) : (
            <>
              <span data-label="Sample">{item.sample_size.toLocaleString()}{item.is_low_sample && <em>LOW</em>}</span>
              <span data-label={rateLabel}>{item.pick_rate.toFixed(1)}%</span>
              <span data-label="Raw WR">{item.raw_win_rate.toFixed(1)}%</span>
            </>
          )}
        </div>
      ))}
      {!compact && bonusItems.length > 0 && (
        <section className="bonus-items" aria-label="Bonus item suggestions">
          <span>Bonus items</span>
          <div>
            {bonusItems.map((item) => (
              <span className="bonus-item" key={item.id} title={item.name}>
                <img src={itemIconUrl(item.id)} alt="" />
                <b>{item.name}</b>
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
