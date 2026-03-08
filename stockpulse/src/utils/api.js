export async function fetchStockData(symbols) {
  const response = await fetch(`http://localhost:8000/stocks?symbols=${symbols.join(",")}`);
  const data = await response.json();
  return data;
}