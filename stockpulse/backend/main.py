from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_methods=['*'], allow_headers=['*'])

@app.get('/stocks')
def get_stocks(symbols: str):
    result = []
    for sym in symbols.split(','):
        sym = sym.strip().upper()
        try:
            t = yf.Ticker(sym)
            info = t.info
            hist = t.history(period='5d')
            candles = [{'open': round(r.Open,2), 'close': round(r.Close,2), 'high': round(r.High,2), 'low': round(r.Low,2)} for _,r in hist.iterrows()]
            sparkline = [round(p,2) for p in hist['Close'].tail(7).tolist()]
            result.append({'symbol': sym, 'name': info.get('longName', sym), 'price': info.get('currentPrice') or info.get('regularMarketPrice', 0), 'change': round(info.get('regularMarketChange', 0),2), 'changePercent': round(info.get('regularMarketChangePercent', 0),2), 'open': info.get('open',0), 'high': info.get('dayHigh',0), 'low': info.get('dayLow',0), 'volume': info.get('volume',0), 'marketCap': info.get('marketCap',0), 'pe': info.get('trailingPE'), 'week52High': info.get('fiftyTwoWeekHigh',0), 'week52Low': info.get('fiftyTwoWeekLow',0), 'sparkline': sparkline, 'candles': candles[-5:], 'sector': info.get('sector','Unknown'), 'description': info.get('longBusinessSummary','N/A')})
        except Exception as e:
            print(f'Error: {e}')
    return {'stocks': result}
