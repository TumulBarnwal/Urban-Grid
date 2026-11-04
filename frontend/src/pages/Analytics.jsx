function Analytics() {
  return (
    <section className="dashboard">
      <div className="welcome">
        <div>
          <span className="eyebrow">URBANGRID AI</span>

          <h2>Traffic Analytics</h2>

          <p>
            Analyze traffic flow, vehicle density and intersection performance.
          </p>
        </div>

        <div className="intersection-status">
          <span className="status-dot"></span>
          Analytics Active
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Average Speed</span>
          <strong>42</strong>
          <small>km/h</small>
        </div>

        <div className="stat-card">
          <span>Vehicles / Hour</span>
          <strong>684</strong>
          <small>Current estimate</small>
        </div>

        <div className="stat-card">
          <span>Average Wait Time</span>
          <strong>38</strong>
          <small>seconds</small>
        </div>

        <div className="stat-card">
          <span>Signal Efficiency</span>
          <strong>87%</strong>
          <small>Current performance</small>
        </div>
      </div>

      <div className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Traffic Flow</h3>
              <p>Vehicle movement through the intersection</p>
            </div>
          </div>

          <div className="simulation-placeholder">
            <h3>Traffic Chart</h3>

            <p>
              Real-time traffic charts will appear here after simulation
              data is connected.
            </p>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Performance</h3>
              <p>Intersection performance metrics</p>
            </div>
          </div>

          <div className="simulation-placeholder">
            <h3>87% Efficient</h3>

            <p>
              Analytics will be calculated from live SUMO simulation data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Analytics;