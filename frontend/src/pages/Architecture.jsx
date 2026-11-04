function Architecture() {
  return (
    <section className="dashboard">
      <div className="welcome">
        <div>
          <span className="eyebrow">URBANGRID AI</span>

          <h2>System Architecture</h2>

          <p>
            Overview of the technologies and components powering UrbanGrid.
          </p>
        </div>

        <div className="intersection-status">
          <span className="status-dot"></span>
          Architecture Ready
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>UrbanGrid Architecture</h3>
            <p>Intelligent traffic management pipeline</p>
          </div>
        </div>

        <div className="simulation-placeholder">
          <h3>React → Node.js → Python → SUMO</h3>

          <p>
            The dashboard communicates with the backend, which manages
            simulation data and connects the AI traffic-control service
            with SUMO through TraCI.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Frontend</span>
          <strong>React</strong>
          <small>Dashboard interface</small>
        </div>

        <div className="stat-card">
          <span>Backend</span>
          <strong>Node.js</strong>
          <small>API & services</small>
        </div>

        <div className="stat-card">
          <span>AI Service</span>
          <strong>Python</strong>
          <small>Traffic intelligence</small>
        </div>

        <div className="stat-card">
          <span>Simulation</span>
          <strong>SUMO</strong>
          <small>Traffic simulation</small>
        </div>
      </div>
    </section>
  );
}

export default Architecture;