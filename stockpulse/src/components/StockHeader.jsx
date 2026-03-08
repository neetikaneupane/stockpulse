import { useState } from "react";
import { fmt, isUp } from "../utils/formatters";

/**
 * StockHeader
 * Displays the selected stock's symbol, name, price, change badge,
 * and the price-alert input row.
 */
export default function StockHeader({ stock, alerts, onSetAlert }) {
  const [alertInput, setAlertInput] = useState("");

  const handleSet = () => {
    const price = parseFloat(alertInput);
    if (!isNaN(price)) {
      onSetAlert(stock.symbol, price);
      setAlertInput("");
    }
  };

  const up = isUp(stock.change);

  return (
    <div style={{ padding: "16px 24px", borderBottom: "1px solid #1a2535", background: "#09101a" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>

        {/* Left: symbol + price */}
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "#fff" }}>
              {stock.symbol}
            </span>
            <span style={{ fontSize: 13, color: "#ffffff55" }}>{stock.name}</span>
            <span className="pill" style={{ background: "#1a2535", color: "#ffffff77", fontSize: 10 }}>
              {stock.sector}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 6 }}>
            <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: -1 }}>${fmt(stock.price)}</span>
            <span className="pill" style={{
              background: up ? "#00290f" : "#290000",
              color: up ? "#00f5a0" : "#ff6161",
              fontSize: 12,
            }}>
              {up ? "▲" : "▼"} ${Math.abs(stock.change || 0).toFixed(2)} ({Math.abs(stock.changePercent || 0).toFixed(2)}%)
            </span>
          </div>
        </div>

        {/* Right: alert input */}
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={alertInput}
            onChange={(e) => setAlertInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSet()}
            placeholder="Set alert price"
            style={{ width: 130, fontSize: 11 }}
          />
          <button className="btn" onClick={handleSet}
            style={{ background: "#1a2535", color: "#f5a200", border: "1px solid #2a3545", padding: "6px 12px", borderRadius: 4, fontSize: 11 }}>
            🔔 SET ALERT
          </button>
        </div>
      </div>

      {/* Alert status */}
      {alerts[stock.symbol] && (
        <div style={{ marginTop: 8, fontSize: 11, color: "#f5a200" }}>
          ⚡ Alert set at ${alerts[stock.symbol]} · Current: ${fmt(stock.price)} ·{" "}
          {stock.price >= alerts[stock.symbol] ? "🟡 TRIGGERED" : "⏳ PENDING"}
        </div>
      )}
    </div>
  );
}
