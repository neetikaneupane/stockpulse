// Format a number to fixed decimal places with commas
export const fmt = (n, dec = 2) =>
  n != null
    ? Number(n).toLocaleString(undefined, {
        minimumFractionDigits: dec,
        maximumFractionDigits: dec,
      })
    : "—";

// Format large numbers as $T / $B / $M
export const fmtBig = (n) => {
  if (!n) return "—";
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9)  return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6)  return `$${(n / 1e6).toFixed(2)}M`;
  return `$${n}`;
};

// Format volume as "54.32M shares"
export const fmtVolume = (n) =>
  n ? `${(n / 1e6).toFixed(2)}M shares` : "—";

// Returns true if the change value is positive (or zero)
export const isUp = (change) => Number(change) >= 0;
