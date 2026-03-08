const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@700;800&display=swap');

  * { box-sizing: border-box; }

  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: #0d1420; }
  ::-webkit-scrollbar-thumb { background: #1e2d45; border-radius: 2px; }

  .ticker-row:hover { background: #0d1f35 !important; cursor: pointer; }

  .btn { cursor: pointer; border: none; outline: none; transition: all 0.15s; }
  .btn:hover { opacity: 0.8; transform: translateY(-1px); }
  .btn:active { transform: translateY(0); }

  .pill {
    border-radius: 4px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    padding: 2px 8px;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .tab {
    cursor: pointer;
    padding: 6px 16px;
    font-size: 11px;
    letter-spacing: 1px;
    border-bottom: 2px solid transparent;
    transition: all 0.15s;
    opacity: 0.5;
    text-transform: uppercase;
  }
  .tab.active { opacity: 1; border-bottom-color: #00f5a0; color: #00f5a0; }
  .tab:hover { opacity: 0.8; }

  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  .fade-in { animation: fadeIn 0.3s ease forwards; }

  .stat-box {
    background: #0d1420;
    border: 1px solid #1a2535;
    border-radius: 6px;
    padding: 12px 16px;
  }

  input {
    background: #0d1420;
    border: 1px solid #1a2535;
    color: #e8eaf0;
    font-family: 'Space Mono', monospace;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 12px;
    outline: none;
    transition: border 0.15s;
  }
  input:focus { border-color: #00f5a0; }
`;

export default globalStyles;
