# StockPulse 
<img width="1915" height="867" alt="image" src="https://github.com/user-attachments/assets/28ac125a-e435-4141-b7a3-8e62817daf21" />


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

## Start the backend

```bash
uvicorn backend.main:app --reload --port 8000
```


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

