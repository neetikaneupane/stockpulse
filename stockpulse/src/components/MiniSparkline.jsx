/**
 * MiniSparkline
 * Renders a small inline SVG line chart for sidebar ticker rows.
 */
export default function MiniSparkline({ data, width = 80, height = 30 }) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  });

  const positive = data[data.length - 1] >= data[0];
  const lineColor = positive ? "#00f5a0" : "#ff6161";

  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke={lineColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
