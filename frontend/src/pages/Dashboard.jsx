
import { Siren } from "lucide-react";

function Dashboard() {
  return (
    <section className="dashboard">
      {/* Welcome Section */}
      <div className="welcome">
        <div>
          <span className="eyebrow">URBANGRID AI</span>

          <h2>Intersection Overview</h2>

          <p>
            Monitor traffic flow, emergency requests and signal activity
            from one place.
          </p>
        </div>

        <div className="intersection-status">
          <span className="status-dot"></span>
          Simulation Ready
        </div>
      </div>

      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <span>Active Intersections</span>
          <strong>01</strong>
          <small>Currently monitored</small>
        </div>

        <div className="stat-card">
          <span>Vehicles Detected</span>
          <strong>128</strong>
          <small>Live simulation</small>
        </div>

        <div className="stat-card">
          <span>Emergency Requests</span>
          <strong>03</strong>
          <small>Today</small>
        </div>

        <div className="stat-card">
          <span>Traffic Efficiency</span>
          <strong>87%</strong>
          <small>Current performance</small>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-grid">

        {/* Live Traffic */}
        <div className="panel traffic-panel">
          <div className="panel-header">
            <div>
              <h3>Live Traffic</h3>
              <p>Intersection simulation</p>
            </div>

            <span className="live-badge">LIVE</span>
          </div>

          {/* Traffic Information */}
          <div className="traffic-info">
            <div>
              <span>Intersection</span>
              <strong>INT-001</strong>
            </div>

            <div>
              <span>Signal</span>
              <strong className="signal-text">RED</strong>
            </div>

            <div>
              <span>Density</span>
              <strong>Medium</strong>
            </div>

            <div>
              <span>Emergency Mode</span>
              <strong className="normal-text">Standby</strong>
            </div>
          </div>

          {/* Intersection */}
          <div className="intersection-view">

            {/* Roads */}
            <div className="road horizontal-road">
              <div className="lane"></div>
              <div className="lane"></div>
            </div>

            <div className="road vertical-road">
              <div className="lane"></div>
              <div className="lane"></div>
            </div>

            {/* Intersection Center */}
            <div className="intersection-center">

              {/* Traffic Light */}
              <div className="traffic-light">
                <span className="light red active"></span>
                <span className="light yellow"></span>
                <span className="light green"></span>
              </div>

              {/* Signal Status */}
              <div className="signal-status">
                <span className="signal-indicator red-indicator"></span>

                <div>
                  <strong>RED SIGNAL</strong>
                  <small>North-South traffic stopped</small>
                </div>
              </div>

            </div>

            {/* Vehicles */}
            <div className="vehicle vehicle-1"></div>

            <div className="vehicle vehicle-2"></div>

            <div className="vehicle emergency-vehicle"></div>

            {/* Simulation Status */}
            <div className="simulation-label">
              <span className="status-dot"></span>
              SUMO Simulation
            </div>

          </div>
        </div>

        {/* Emergency Activity */}
        <div className="panel emergency-panel">
          <div className="panel-header">
            <div>
              <h3>Emergency Activity</h3>
              <p>Latest priority requests</p>
            </div>

            <Siren size={22} />
          </div>

          {/* Emergency Request 1 */}
          <div className="emergency-item">
            <div className="emergency-icon">
              <Siren size={18} />
            </div>

            <div>
              <strong>AMB-001</strong>
              <span>Priority request pending</span>
            </div>

            <span className="priority">HIGH</span>
          </div>

          {/* Emergency Request 2 */}
          <div className="emergency-item">
            <div className="emergency-icon">
              <Siren size={18} />
            </div>

            <div>
              <strong>FIRE-002</strong>
              <span>Request completed</span>
            </div>

            <span className="completed">DONE</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Dashboard;

