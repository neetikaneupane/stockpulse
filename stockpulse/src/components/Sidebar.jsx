import MiniSparkline from "./MiniSparkline";

/**
 * Sidebar
 * Left panel: search bar, add-ticker input, and the scrollable watchlist.
 */
export default function Sidebar({
  filteredStocks, selected, loading,
  search, onSearchChange,
  onSelectStock, onRemoveStock, onAddStock,
  watchlist,
}) {
  const handleAdd = (input) => {
    const sym = input.trim().toUpperCase();
    if (sym) onAddStock(sym);
  };

  return (
    <div style={{
      width: 260, borderRight: "1px solid #1a2535",
      display: "flex", flexDirection: "column",
      background: "#09101a", overflow: "hidden",
    }}>
      {/* Search */}
      <div style={{ padding: "12px 12px 8px" }}>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="SEARCH SYMBOLS..."
          style={{ width: "100%", fontSize: 11 }}
        />
      </div>

      {/* Add ticker */}
      <AddTickerRow onAdd={handleAdd} watchlist={watchlist} />

      {/* List */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {loading ? (
          <div style={{ padding: 20, textAlign: "center", color: "#ffffff33", fontSize: 11 }}>
            LOADING MARKET DATA...
          </div>
        ) : (
          filteredStocks.map((s, i) => (
            <TickerRow
              key={s.symbol}
              stock={s}
              selected={selected === s.symbol}
              animDelay={i * 0.04}
              onClick={() => onSelectStock(s.symbol)}
              onRemove={() => onRemoveStock(s.symbol)}
            />
          ))
        )}
      </div>

      <div style={{ padding: "10px 12px", borderTop: "1px solid #1a2535", fontSize: 10, color: "#ffffff33" }}>
        {watchlist.length} SYMBOLS · AUTO-REFRESH 60s
      </div>
    </div>
  );
}

/* ── sub-components ──────────────────────────────────────────── */

function AddTickerRow({ onAdd, watchlist }) {
  const [val, setVal] = React.useState("");

  const submit = () => {
    onAdd(val);
    setVal("");
  };

  return (
    <div style={{ padding: "0 12px 8px", display: "flex", gap: 6 }}>
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="ADD TICKER"
        style={{ flex: 1, fontSize: 11 }}
      />
      <button className="btn" onClick={submit}
        style={{ background: "#00f5a0", color: "#080c14", border: "none", borderRadius: 4, padding: "6px 10px", fontWeight: 700, fontSize: 13 }}>
        +
      </button>
    </div>
  );
}

function TickerRow({ stock: s, selected, animDelay, onClick, onRemove }) {
  const up = Number(s.change) >= 0;

  return (
    <div className="ticker-row fade-in" onClick={onClick}
      style={{
        padding: "10px 12px", borderBottom: "1px solid #0d1420",
        background: selected ? "#0d1f35" : "transparent",
        borderLeft: selected ? "2px solid #00f5a0" : "2px solid transparent",
        animationDelay: `${animDelay}s`,
      }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: selected ? "#00f5a0" : "#e8eaf0" }}>{s.symbol}</div>
          <div style={{ fontSize: 9, color: "#ffffff44", marginTop: 1 }}>
            {s.name?.split(" ").slice(0, 2).join(" ")}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>${Number(s.price).toFixed(2)}</div>
          <div style={{ fontSize: 10, color: up ? "#00f5a0" : "#ff6161", fontWeight: 700 }}>
            {up ? "▲" : "▼"} {Math.abs(s.changePercent || 0).toFixed(2)}%
          </div>
        </div>
      </div>
      <div style={{ marginTop: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <MiniSparkline data={s.sparkline} />
        <button className="btn pill" onClick={(e) => { e.stopPropagation(); onRemove(); }}
          style={{ background: "#1a0d0d", color: "#ff6161", fontSize: 9, padding: "2px 6px" }}>
          ✕
        </button>
      </div>
    </div>
  );
}

// React is available globally in CRA; import explicitly for the sub-component
import React from "react";
