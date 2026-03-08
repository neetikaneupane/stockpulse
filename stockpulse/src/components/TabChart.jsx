import CandleChart from "./CandleChart";
import { fmt } from "../utils/formatters";

/**
 * TabChart
 * Full candlestick chart + per-session summary cards.
 */
export default function TabChart({ stock }) {
  return (
    <div>
      <div className="stat-box">
        <div style={{ fontSize: 10, color: "#ffffff44", letterSpacing: 1, marginBottom: 16 }}>
          CANDLESTICK CHART · 5 SESSIONS
        </div>
        <div style={{ overflowX: "auto" }}>
          <CandleChart candles={stock.candles} width={600} height={220} />
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 10, color: "#ffffff33" }}>
          <span style={{ color: "#00f5a0" }}>■ BULLISH</span>
          <span style={{ color: "#ff6161" }}>■ BEARISH</span>
          <span>WICKS = HIGH/LOW · BODY = OPEN/CLOSE</span>
        </div>
      </div>

      {/* Per-session cards */}
      {stock.candles && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginTop: 16 }}>
          {stock.candles.map((c, i) => {
            const isGreen = c.close >= c.open;
            return (
              <div key={i} className="stat-box"
                style={{ borderColor: isGreen ? "#00f5a020" : "#ff616120" }}>
                <div style={{ fontSize: 9, color: "#ffffff33", marginBottom: 6 }}>
                  DAY -{stock.candles.length - 1 - i}
                </div>
                <div style={{ fontSize: 11, color: isGreen ? "#00f5a0" : "#ff6161", fontWeight: 700 }}>
                  {isGreen ? "▲" : "▼"} ${fmt(c.close)}
                </div>
                <div style={{ fontSize: 9, color: "#ffffff33", marginTop: 4 }}>
                  O: ${fmt(c.open)} H: ${fmt(c.high)} L: ${fmt(c.low)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
