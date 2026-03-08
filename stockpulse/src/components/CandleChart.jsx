/**
 * CandleChart
 * SVG candlestick chart showing OHLC data for multiple sessions.
 */
export default function CandleChart({ candles, width = 500, height = 200 }) {
  if (!candles || candles.length === 0) return null;

  const padding = { top: 10, right: 20, bottom: 24, left: 50 };
  const w = width - padding.left - padding.right;
  const h = height - padding.top - padding.bottom;

  const allVals = candles.flatMap((c) => [c.high, c.low]);
  const minV  = Math.min(...allVals);
  const maxV  = Math.max(...allVals);
  const range = maxV - minV || 1;

  const scaleY  = (v) => h - ((v - minV) / range) * h;
  const candleW = Math.max(2, (w / candles.length) * 0.6);
  const gap     = w / candles.length;

  const TICKS = 5;
  const yTicks = Array.from({ length: TICKS }, (_, i) =>
    minV + (range / (TICKS - 1)) * i
  );

  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <g transform={`translate(${padding.left},${padding.top})`}>

        {/* Y-axis grid + labels */}
        {yTicks.map((t, i) => (
          <g key={i}>
            <line x1={0} x2={w} y1={scaleY(t)} y2={scaleY(t)} stroke="#ffffff08" strokeWidth="1" />
            <text
              x={-6} y={scaleY(t) + 4}
              textAnchor="end" fill="#ffffff44"
              fontSize="10" fontFamily="'Space Mono', monospace"
            >
              {t.toFixed(1)}
            </text>
          </g>
        ))}

        {/* Candles */}
        {candles.map((c, i) => {
          const x       = i * gap + gap / 2;
          const isGreen = c.close >= c.open;
          const col     = isGreen ? "#00f5a0" : "#ff6161";
          const bodyTop = scaleY(Math.max(c.open, c.close));
          const bodyBot = scaleY(Math.min(c.open, c.close));
          const bodyH   = Math.max(1, bodyBot - bodyTop);

          return (
            <g key={i}>
              {/* Wick */}
              <line x1={x} x2={x} y1={scaleY(c.high)} y2={scaleY(c.low)} stroke={col} strokeWidth="1" opacity="0.6" />
              {/* Body */}
              <rect x={x - candleW / 2} y={bodyTop} width={candleW} height={bodyH} fill={col} rx="1" opacity="0.9" />
            </g>
          );
        })}

        {/* X baseline */}
        <line x1={0} x2={w} y1={h} y2={h} stroke="#ffffff15" strokeWidth="1" />
      </g>
    </svg>
  );
}
