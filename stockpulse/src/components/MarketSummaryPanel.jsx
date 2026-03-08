import { fmt, isUp } from "../utils/formatters";
import { SORT_OPTIONS } from "../utils/constants";

/**
 * MarketSummaryPanel
 * Right panel: compact price list + sort controls.
 */
export default function MarketSummaryPanel({ stocks, selected, onSelect, sortBy, sortDir, onSort }) {
  return (
    <div style={{
      width: 200, borderLeft: "1px solid #1a2535",
      background: "#09101a", display: "flex", flexDirection: "column",
      overflow: "hidden",
    }}>
      <div style={{ padding: "12px 14px", borderBottom: "1px solid #1a2535", fontSize: 10, color: "#ffffff44", letterSpacing: 1 }}>
        MARKET SUMMARY
      </div>

      {/* Stock list */}
      <div style={{ overflowY: "auto", flex: 1 }}>
        {stocks.map((s) => {
          const up = isUp(s.change);
          return (
            <div key={s.symbol} onClick={() => onSelect(s.symbol)}
              style={{
                padding: "10px 14px", borderBottom: "1px solid #0d1420",
                cursor: "pointer",
                background: selected === s.symbol ? "#0d1f35" : "transparent",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: selected === s.symbol ? "#00f5a0" : "#e8eaf0" }}>
                  {s.symbol}
                </span>
                <span style={{ fontSize: 10, color: up ? "#00f5a0" : "#ff6161" }}>
                  {up ? "▲" : "▼"}{Math.abs(s.changePercent || 0).toFixed(1)}%
                </span>
              </div>
              <div style={{ fontSize: 12, marginTop: 2, fontWeight: 700 }}>${fmt(s.price)}</div>
            </div>
          );
        })}
      </div>

      {/* Sort controls */}
      <div style={{ padding: "10px 14px", borderTop: "1px solid #1a2535" }}>
        <div style={{ fontSize: 9, color: "#ffffff33", marginBottom: 8, letterSpacing: 1 }}>SORT BY</div>
        {SORT_OPTIONS.map(([key, label]) => (
          <div key={key} onClick={() => onSort(key)}
            style={{
              fontSize: 10, padding: "4px 0", cursor: "pointer",
              color: sortBy === key ? "#00f5a0" : "#ffffff44",
              letterSpacing: 0.5,
            }}>
            {sortBy === key ? (sortDir === 1 ? "↑" : "↓") : "·"} {label}
          </div>
        ))}
      </div>
    </div>
  );
}
