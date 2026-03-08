import { fmt, fmtBig, fmtVolume, isUp } from "../utils/formatters";

/**
 * TabFundamentals
 * Detailed financial metrics in a two-column card grid.
 */
export default function TabFundamentals({ stock }) {
  const up = isUp(stock.change);

  const items = [
    {
      label: "MARKET CAPITALIZATION",
      val: fmtBig(stock.marketCap),
      desc: "Total market value of outstanding shares",
    },
    {
      label: "PRICE-TO-EARNINGS",
      val: fmt(stock.pe),
      desc: "Ratio of stock price to annual earnings per share",
    },
    {
      label: "TRADING VOLUME",
      val: fmtVolume(stock.volume),
      desc: "Shares traded in current session",
    },
    {
      label: "DAY RANGE",
      val: `$${fmt(stock.low)} – $${fmt(stock.high)}`,
      desc: "Intraday price range",
    },
    {
      label: "52-WEEK HIGH",
      val: `$${fmt(stock.week52High)}`,
      desc: "Highest price in past 52 weeks",
      color: "#00f5a0",
    },
    {
      label: "52-WEEK LOW",
      val: `$${fmt(stock.week52Low)}`,
      desc: "Lowest price in past 52 weeks",
      color: "#ff6161",
    },
    {
      label: "DAILY CHANGE",
      val: `${up ? "+" : ""}$${fmt(stock.change)}`,
      desc: "Price change from previous close",
      color: up ? "#00f5a0" : "#ff6161",
    },
    {
      label: "CHANGE %",
      val: `${up ? "+" : ""}${fmt(stock.changePercent)}%`,
      desc: "Percentage change from previous close",
      color: up ? "#00f5a0" : "#ff6161",
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {items.map(({ label, val, desc, color }) => (
        <div key={label} className="stat-box">
          <div style={{ fontSize: 9, letterSpacing: 1, color: "#ffffff44", marginBottom: 4 }}>{label}</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: color || "#e8eaf0", marginBottom: 6 }}>{val}</div>
          <div style={{ fontSize: 10, color: "#ffffff33" }}>{desc}</div>
        </div>
      ))}
    </div>
  );
}
