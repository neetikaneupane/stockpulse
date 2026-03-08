import { fmt, fmtBig, isUp } from "../utils/formatters";

/**
 * TabOverview
 * Shows key stats grid, 52-week range bar, and intraday sparkline.
 */
export default function TabOverview({ stock }) {
  const stats = [
    { label: "OPEN",       val: `$${fmt(stock.open)}` },
    { label: "HIGH",       val: `$${fmt(stock.high)}`,       color: "#00f5a0" },
    { label: "LOW",        val: `$${fmt(stock.low)}`,        color: "#ff6161" },
    { label: "VOLUME",     val: stock.volume ? `${(stock.volume / 1e6).toFixed(2)}M` : "—" },
    { label: "MARKET CAP", val: fmtBig(stock.marketCap) },
    { label: "P/E RATIO",  val: fmt(stock.pe) },
    { label: "52W HIGH",   val: `$${fmt(stock.week52High)}`, color: "#00f5a0" },
    { label: "52W LOW",    val: `$${fmt(stock.week52Low)}`,  color: "#ff6161" },
  ];

  const lo  = stock.week52Low;
  const hi  = stock.week52High;
  const cur = stock.price;
  const rangePct = ((cur - lo) / (hi - lo || 1)) * 100;

  return (
    <div>
      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {stats.map(({ label, val, color }) => (
          <div key={label} className="stat-box">
            <div style={{ fontSize: 9, color: "#ffffff44", letterSpacing: 1, marginBottom: 6 }}>{label}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: color || "#e8eaf0" }}>{val}</div>
          </div>
        ))}
      </div>

      {/* 52-week range */}
      <div className="stat-box" style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 10, color: "#ffffff44", letterSpacing: 1, marginBottom: 10 }}>52-WEEK RANGE</div>
        <div style={{ position: "relative", height: 6, background: "#1a2535", borderRadius: 3 }}>
          <div style={{
            position: "absolute", left: 0, top: 0, height: "100%",
            width: `${rangePct}%`,
            background: "linear-gradient(90deg, #ff6161, #00f5a0)",
            borderRadius: 3,
          }} />
          <div style={{
            position: "absolute", top: -3, left: `${rangePct}%`,
            width: 12, height: 12,
            background: "#fff", borderRadius: "50%",
            transform: "translateX(-50%)",
            border: "2px solid #00f5a0",
          }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: "#ffffff55" }}>
          <span>${fmt(lo)}</span>
          <span style={{ color: "#00f5a0" }}>${fmt(cur)} (current)</span>
          <span>${fmt(hi)}</span>
        </div>
      </div>

      {/* Intraday sparkline (full width) */}
      {stock.sparkline && (
        <div className="stat-box">
          <div style={{ fontSize: 10, color: "#ffffff44", letterSpacing: 1, marginBottom: 12 }}>INTRADAY TREND</div>
          <FullSparkline data={stock.sparkline} />
        </div>
      )}
    </div>
  );
}

function FullSparkline({ data }) {
  const min   = Math.min(...data);
  const max   = Math.max(...data);
  const range = max - min || 1;
  const W = 300, H = 60;

  const pts = data.map((v, i) => `${(i / (data.length - 1)) * W},${H - ((v - min) / range) * 55}`);
  const fill = `${pts.join(" ")} ${W},${H} 0,${H}`;
  const pos  = data[data.length - 1] >= data[0];
  const col  = pos ? "#00f5a0" : "#ff6161";
  const id   = "sg-full";

  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={col} stopOpacity="0.3" />
          <stop offset="100%" stopColor={col} stopOpacity="0"   />
        </linearGradient>
      </defs>
      <polygon points={fill} fill={`url(#${id})`} />
      <polyline points={pts.join(" ")} fill="none" stroke={col} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
