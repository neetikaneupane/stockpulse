/**
 * TabInfo
 * Company description, sector badge, and price-alert management.
 */
export default function TabInfo({ stock, alerts, onRemoveAlert }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Description */}
      <div className="stat-box">
        <div style={{ fontSize: 9, color: "#ffffff44", letterSpacing: 1, marginBottom: 10 }}>
          ABOUT {stock.symbol}
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.7, color: "#ccd0d9" }}>
          {stock.description}
        </div>
      </div>

      {/* Sector */}
      <div className="stat-box">
        <div style={{ fontSize: 9, color: "#ffffff44", letterSpacing: 1, marginBottom: 10 }}>SECTOR</div>
        <span className="pill" style={{ background: "#1a2535", color: "#00d9f5", fontSize: 13 }}>
          {stock.sector}
        </span>
      </div>

      {/* Alerts */}
      <div className="stat-box">
        <div style={{ fontSize: 9, color: "#ffffff44", letterSpacing: 1, marginBottom: 10 }}>PRICE ALERTS</div>
        {Object.keys(alerts).length === 0 ? (
          <div style={{ fontSize: 11, color: "#ffffff33" }}>
            No alerts set. Use the alert input above to set price targets.
          </div>
        ) : (
          Object.entries(alerts).map(([sym, price]) => (
            <div key={sym} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "8px 0", borderBottom: "1px solid #1a2535",
            }}>
              <span style={{ fontSize: 12 }}>
                <strong>{sym}</strong> → ${price}
              </span>
              <button className="btn pill" onClick={() => onRemoveAlert(sym)}
                style={{ background: "#1a0d0d", color: "#ff6161" }}>
                REMOVE
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
