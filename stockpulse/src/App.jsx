import { useState } from "react";
import { useStocks } from "./hooks/useStocks";
import { TABS } from "./utils/constants";
import globalStyles from "./utils/globalStyles";

import Sidebar             from "./components/Sidebar";
import StockHeader         from "./components/StockHeader";
import MarketSummaryPanel  from "./components/MarketSummaryPanel";
import TabOverview         from "./components/TabOverview";
import TabChart            from "./components/TabChart";
import TabFundamentals     from "./components/TabFundamentals";
import TabInfo             from "./components/TabInfo";

export default function App() {
  const {
    stocks, filteredStocks, selectedStock, loading, refreshing,
    watchlist, selected, lastUpdated, alerts, search, sortBy, sortDir,
    setSelected, setSearch, handleSort,
    addStock, removeStock, setAlert, removeAlert,
    refresh,
  } = useStocks();

  const [tab, setTab] = useState("overview");

  return (
    <div style={{
      minHeight: "100vh", background: "#080c14", color: "#e8eaf0",
      fontFamily: "'Space Mono', 'Courier New', monospace",
      display: "flex", flexDirection: "column",
    }}>
      <style>{globalStyles}</style>

      {/* ── TOP HEADER ────────────────────────────────────────────── */}
      <header style={{
        borderBottom: "1px solid #1a2535", padding: "12px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "#09101a",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#00f5a0", boxShadow: "0 0 8px #00f5a0",
            animation: "pulse 2s infinite",
          }} />
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: 2, color: "#fff" }}>
            STOCKPULSE
          </span>
          <span style={{ fontSize: 10, color: "#ffffff33", letterSpacing: 1 }}>TERMINAL v2.0</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {lastUpdated && (
            <span style={{ fontSize: 10, color: "#ffffff33" }}>
              UPDATED {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button className="btn" onClick={refresh}
            style={{ background: "#0d1420", border: "1px solid #1a2535", color: "#00f5a0", padding: "6px 14px", borderRadius: 4, fontSize: 11, letterSpacing: 1 }}>
            {refreshing ? "REFRESHING..." : "↻ REFRESH"}
          </button>
        </div>
      </header>

      {/* ── BODY ──────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", height: "calc(100vh - 53px)" }}>

        <Sidebar
          filteredStocks={filteredStocks}
          selected={selected}
          loading={loading}
          search={search}
          onSearchChange={setSearch}
          onSelectStock={setSelected}
          onRemoveStock={removeStock}
          onAddStock={addStock}
          watchlist={watchlist}
        />

        {/* ── DETAIL PANEL ──────────────────────────────────────── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {selectedStock ? (
            <>
              <StockHeader
                stock={selectedStock}
                alerts={alerts}
                onSetAlert={setAlert}
              />

              {/* Tab bar */}
              <div style={{ display: "flex", borderBottom: "1px solid #1a2535", padding: "0 24px", background: "#09101a", gap: 4 }}>
                {TABS.map((t) => (
                  <div key={t} className={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
                    {t}
                  </div>
                ))}
              </div>

              {/* Tab content */}
              <div style={{ flex: 1, overflowY: "auto", padding: 24 }} className="fade-in">
                {tab === "overview"      && <TabOverview     stock={selectedStock} />}
                {tab === "chart"         && <TabChart        stock={selectedStock} />}
                {tab === "fundamentals"  && <TabFundamentals stock={selectedStock} />}
                {tab === "info"          && <TabInfo         stock={selectedStock} alerts={alerts} onRemoveAlert={removeAlert} />}
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff22", fontSize: 13 }}>
              SELECT A SYMBOL FROM THE WATCHLIST
            </div>
          )}
        </div>

        <MarketSummaryPanel
          stocks={stocks}
          selected={selected}
          onSelect={setSelected}
          sortBy={sortBy}
          sortDir={sortDir}
          onSort={handleSort}
        />
      </div>
    </div>
  );
}
