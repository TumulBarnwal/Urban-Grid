function Topbar() {
  return (
    <header className="topbar">
      <div>
        <h1>Traffic Command Center</h1>
        <p>Real-time intelligent traffic management</p>
      </div>

      <div className="system-status">
        <span className="status-dot"></span>
        System Online
      </div>
    </header>
  );
}

export default Topbar;