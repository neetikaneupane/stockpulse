import { useState, useEffect, useRef, useCallback } from "react";
import { fetchStockData } from "../utils/api";
import { DEFAULT_WATCHLIST, REFRESH_INTERVAL_MS } from "../utils/constants";

/**
 * useStocks
 * Central state hook for the stock tracker.
 * Manages: watchlist, fetched stock data, selected symbol,
 * price alerts, sorting, search, and auto-refresh.
 */
export function useStocks() {
  const [watchlist, setWatchlist]     = useState(DEFAULT_WATCHLIST);
  const [stocks, setStocks]           = useState([]);
  const [loading, setLoading]         = useState(true);
  const [refreshing, setRefreshing]   = useState(false);
  const [selected, setSelected]       = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [alerts, setAlerts]           = useState({});
  const [search, setSearch]           = useState("");
  const [sortBy, setSortBy]           = useState("symbol");
  const [sortDir, setSortDir]         = useState(1);
  const intervalRef = useRef(null);

  const loadStocks = useCallback(async (symbols) => {
    setRefreshing(true);
    try {
      const data = await fetchStockData(symbols);
      setStocks(data.stocks || []);
      setLastUpdated(new Date());
      if (!selected && data.stocks?.length > 0) {
        setSelected(data.stocks[0].symbol);
      }
    } catch (e) {
      console.error("Failed to fetch stock data:", e);
    }
    setRefreshing(false);
    setLoading(false);
  }, [selected]);

  // Initial load + auto-refresh
  useEffect(() => {
    loadStocks(watchlist);
    intervalRef.current = setInterval(() => loadStocks(watchlist), REFRESH_INTERVAL_MS);
    return () => clearInterval(intervalRef.current);
  }, [watchlist]);

  const addStock = (symbol) => {
    const sym = symbol.trim().toUpperCase();
    if (!sym || watchlist.includes(sym)) return;
    setWatchlist((prev) => [...prev, sym]);
  };

  const removeStock = (sym) => {
    const next = watchlist.filter((s) => s !== sym);
    setWatchlist(next);
    if (selected === sym) setSelected(next[0] || null);
  };

  const setAlert = (sym, price) => {
    setAlerts((prev) => ({ ...prev, [sym]: price }));
  };

  const removeAlert = (sym) => {
    setAlerts((prev) => {
      const next = { ...prev };
      delete next[sym];
      return next;
    });
  };

  const handleSort = (key) => {
    if (sortBy === key) setSortDir((d) => -d);
    else { setSortBy(key); setSortDir(-1); }
  };

  const filteredStocks = stocks
    .filter((s) =>
      s.symbol.includes(search.toUpperCase()) ||
      s.name?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const va = a[sortBy] ?? 0;
      const vb = b[sortBy] ?? 0;
      return typeof va === "string"
        ? va.localeCompare(vb) * sortDir
        : (va - vb) * sortDir;
    });

  const selectedStock = stocks.find((s) => s.symbol === selected) || null;

  return {
    // state
    stocks, filteredStocks, selectedStock, loading, refreshing,
    watchlist, selected, lastUpdated, alerts, search, sortBy, sortDir,
    // actions
    setSelected, setSearch, handleSort,
    addStock, removeStock, setAlert, removeAlert,
    refresh: () => loadStocks(watchlist),
  };
}
