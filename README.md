# 📈 StockPulse Terminal

A real-time stock tracker terminal built with **React** — featuring live watchlists, candlestick charts, price alerts, fundamentals, and a sleek dark terminal UI.

![StockPulse Terminal](https://img.shields.io/badge/version-2.0-00f5a0?style=flat-square) ![React](https://img.shields.io/badge/React-18.2-61dafb?style=flat-square&logo=react) ![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

---

## ✨ Features

- 🔍 **Search & add** any NYSE / NASDAQ ticker to your watchlist
- 📊 **Candlestick chart** — 5-session OHLC view
- 📉 **Mini sparklines** — inline trend lines per stock in the sidebar
- 🔔 **Price alerts** — set a target price and get notified when triggered
- 📋 **4 detail tabs** — Overview, Chart, Fundamentals, Info
- 📡 **Auto-refresh** every 60 seconds
- 🗂️ **Sort** by symbol, price, or % change
- 🌐 **Market Summary Panel** — compact right-side overview of all watched stocks
- 🟢 **52-week range slider** — see where the stock sits in its yearly range
- ⚡ Supports both **AI-simulated data** (no setup) and **real live data** via yfinance

---

## 🖥️ Preview

> Dark terminal aesthetic with real-time stock data, candlestick charts, and price alert system.

---

## 🗂️ Project Structure

```
stockpulse/
├── public/
│   └── index.html                  # HTML shell
├── src/
│   ├── utils/
│   │   ├── api.js                  # Data source (swap here for real data)
│   │   ├── constants.js            # Default watchlist, tabs, refresh interval
│   │   ├── formatters.js           # Number & display formatting helpers
│   │   └── globalStyles.js         # Global CSS injected at root
│   ├── hooks/
│   │   └── useStocks.js            # Central state: watchlist, fetch, alerts, sort
│   ├── components/
│   │   ├── Sidebar.jsx             # Left panel: search + watchlist
│   │   ├── StockHeader.jsx         # Symbol, price, change, alert input
│   │   ├── MarketSummaryPanel.jsx  # Right panel: compact list + sort
│   │   ├── MiniSparkline.jsx       # Small inline SVG trend line
│   │   ├── CandleChart.jsx         # SVG OHLC candlestick chart
│   │   ├── TabOverview.jsx         # Overview tab: stats + range bar
│   │   ├── TabChart.jsx            # Chart tab: candlestick + session cards
│   │   ├── TabFundamentals.jsx     # Fundamentals tab: detailed metrics
│   │   └── TabInfo.jsx             # Info tab: description + alert manager
│   ├── App.jsx                     # Root component, layout, tab routing
│   └── index.js                    # React entry point
├── backend/
│   └── main.py                     # (Optional) Python yfinance API server
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

| Tool    | Version | Install                    |
|---------|---------|----------------------------|
| Node.js | 18+     | https://nodejs.org         |
| npm     | 9+      | Comes with Node.js         |
| Python  | 3.8+    | https://python.org *(optional, for real data)* |

---

### Frontend Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/stockpulse.git
cd stockpulse

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

App runs at → **http://localhost:3000**

> By default, the app uses **AI-simulated stock data** — no API key or backend needed.

---

### Build for Production

```bash
npm run build
# Output goes to /build — deploy to Vercel, Netlify, or any static host
```

---

## 📡 Real Live Data (yfinance Backend)

To get **real stock prices**, run the included Python backend alongside the frontend.

### 1. Install Python dependencies

```bash
pip install fastapi yfinance uvicorn
```

### 2. Create `backend/main.py`

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

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
# From your project root
uvicorn backend.main:app --reload --port 8000
```

Backend runs at → **http://localhost:8000**

### 4. Update `src/utils/api.js`

Replace the fetch function body with:

```js
export async function fetchStockData(symbols) {
  const response = await fetch(`http://localhost:8000/stocks?symbols=${symbols.join(",")}`);
  const data = await response.json();
  return data;
}
```

### Running both together

You need **two terminals open at the same time:**

```
Terminal 1 (Backend)        Terminal 2 (Frontend)
────────────────────        ─────────────────────
cd stockpulse               cd stockpulse
uvicorn backend.main:app    npm start
--reload --port 8000
▶ localhost:8000             ▶ localhost:3000
```

---

## ➕ Adding More Stocks

**In the app:** Type any ticker in the search box and click **+**

**As defaults on startup**, edit `src/utils/constants.js`:

```js
export const DEFAULT_WATCHLIST = [
  // Big Tech
  "AAPL", "MSFT", "GOOGL", "AMZN", "META", "NVDA", "TSLA", "NFLX",
  // Finance
  "JPM", "BAC", "GS", "V", "MA",
  // Healthcare
  "JNJ", "PFE", "UNH",
  // Energy
  "XOM", "CVX",
  // Add any NYSE / NASDAQ ticker here
];
```

Supports **8,000+ US stocks**, ETFs, crypto (BTC-USD), indices (^GSPC), and international markets.

---

## 🔧 Configuration

| File | What to change |
|------|---------------|
| `src/utils/constants.js` | Default watchlist, refresh interval, sort options |
| `src/utils/api.js` | Switch between AI-simulated and real data source |
| `backend/main.py` | Add more fields from yfinance |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, plain CSS-in-JS |
| Charts | Custom SVG (no chart library) |
| Data (default) | Anthropic Claude API (simulated) |
| Data (real) | Python + yfinance + FastAPI |
| Deployment | Vercel / Netlify (frontend), any Python host (backend) |

---



## 🙌 Acknowledgements

- [yfinance](https://github.com/ranaroussi/yfinance) — Yahoo Finance data
- [FastAPI](https://fastapi.tiangolo.com) — Python backend framework
- [Anthropic Claude](https://anthropic.com) — AI-powered simulated data mode
