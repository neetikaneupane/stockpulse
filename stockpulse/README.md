# StockPulse Terminal

A full-featured stock price tracker built with React.

---

## Requirements

| Tool        | Version  | Install                              |
|-------------|----------|--------------------------------------|
| Node.js     | 18+      | https://nodejs.org                   |
| npm         | 9+       | Comes with Node                      |

No API key is needed for the default AI-simulated mode.
To use **real live data**, see the "Real Data" section below.

---

## Project Structure

```
stockpulse/
├── public/
│   └── index.html          # HTML shell
├── src/
│   ├── utils/
│   │   ├── api.js           # Anthropic API call (swap for real data here)
│   │   ├── constants.js     # App-wide constants (watchlist, tabs, etc.)
│   │   ├── formatters.js    # Number/display formatting helpers
│   │   └── globalStyles.js  # Shared CSS injected at root
│   ├── hooks/
│   │   └── useStocks.js     # Central state: watchlist, fetch, alerts, sort
│   ├── components/
│   │   ├── Sidebar.jsx          # Left panel: search + watchlist
│   │   ├── StockHeader.jsx      # Symbol, price, change, alert input
│   │   ├── MarketSummaryPanel.jsx  # Right panel: compact list + sort
│   │   ├── MiniSparkline.jsx    # Small inline SVG trend line
│   │   ├── CandleChart.jsx      # SVG OHLC candlestick chart
│   │   ├── TabOverview.jsx      # Overview tab: stats + range bar
│   │   ├── TabChart.jsx         # Chart tab: candlestick + session cards
│   │   ├── TabFundamentals.jsx  # Fundamentals tab: detailed metrics
│   │   └── TabInfo.jsx          # Info tab: description + alert manager
│   ├── App.jsx              # Root component, layout, tab routing
│   └── index.js             # React entry point
└── package.json
```

---

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start
# Opens at http://localhost:3000
```

---

## Build for Production

```bash
npm run build
# Output goes to /build — deploy to Vercel, Netlify, or any static host
```

---

## Using Real Live Data (yfinance backend)

The default `src/utils/api.js` uses Claude AI to generate simulated data.
To use real prices, run a small Python backend:

### 1. Install Python dependencies

```bash
pip install yfinance fastapi uvicorn
```

### 2. Create `backend/main.py`

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.get("/stocks")
def get_stocks(symbols: str):
    result = []
    for sym in symbols.split(","):
        t = yf.Ticker(sym.strip())
        info = t.info
        hist = t.history(period="5d")
        candles = [
            {"open": row.Open, "close": row.Close, "high": row.High, "low": row.Low}
            for _, row in hist.iterrows()
        ]
        result.append({
            "symbol": sym,
            "name": info.get("longName", sym),
            "price": info.get("currentPrice", 0),
            "change": info.get("regularMarketChange", 0),
            "changePercent": info.get("regularMarketChangePercent", 0),
            "open": info.get("open", 0),
            "high": info.get("dayHigh", 0),
            "low": info.get("dayLow", 0),
            "volume": info.get("volume", 0),
            "marketCap": info.get("marketCap", 0),
            "pe": info.get("trailingPE", None),
            "week52High": info.get("fiftyTwoWeekHigh", 0),
            "week52Low": info.get("fiftyTwoWeekLow", 0),
            "sparkline": list(hist["Close"].tail(7)),
            "candles": candles[-5:],
            "sector": info.get("sector", "Unknown"),
            "description": info.get("longBusinessSummary", "")
        })
    return {"stocks": result}
```

### 3. Start the backend

```bash
uvicorn backend.main:app --reload --port 8000
```

### 4. Update `src/utils/api.js`

Replace the `fetch` URL with:
```js
const response = await fetch(`http://localhost:8000/stocks?symbols=${symbols.join(",")}`);
const data = await response.json();
return data;
```

---

## Features

- Live watchlist — add / remove any ticker
- Auto-refresh every 60 seconds
- Per-stock sparklines in sidebar
- Candlestick OHLC chart (5 sessions)
- 52-week range slider
- Price alerts with triggered / pending status
- Sort by symbol, price, or % change
- Search / filter by name or ticker
- 4 detail tabs: Overview, Chart, Fundamentals, Info
- Market summary right panel
