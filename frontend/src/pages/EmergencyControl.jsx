
import {
  Siren,
  ShieldAlert,
  CheckCircle,
  Clock,
  MapPin,
} from "lucide-react";

function EmergencyControl({
  emergencyRequest,
  emergencyRequests = [],
  updateEmergencyStatus,
  completeEmergencyRequest,
}) {
  // Activate priority for the current emergency vehicle
  const handlePriority = () => {
    if (!emergencyRequest) return;

    updateEmergencyStatus(
      emergencyRequest.vehicleId,
      "Priority Active"
    );
  };

  // Mark the current emergency request as completed
  const handleComplete = () => {
    if (!emergencyRequest) return;

    completeEmergencyRequest(emergencyRequest.vehicleId);
  };

  const priorityActive =
    emergencyRequest?.status === "Priority Active";

  return (
    <section className="dashboard">
      <div className="welcome">
        <div>
          <span className="eyebrow">URBANGRID AI</span>
          <h2>Emergency Control</h2>
          <p>
            Monitor and manage emergency vehicle priority requests.
          </p>
        </div>

        <div className="intersection-status">
          <span className="status-dot"></span>
          Control Center Ready
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Active Requests</span>
          <strong>
            {String(emergencyRequests.length).padStart(2, "0")}
          </strong>
          <small>Requires attention</small>
        </div>

        <div className="stat-card">
          <span>Emergency Vehicles</span>
          <strong>
            {String(emergencyRequests.length).padStart(2, "0")}
          </strong>
          <small>Currently detected</small>
        </div>

        <div className="stat-card">
          <span>Priority Signals</span>
          <strong>{priorityActive ? "01" : "00"}</strong>
          <small>Currently active</small>
        </div>

        <div className="stat-card">
          <span>Completed Today</span>
          <strong>04</strong>
          <small>Successful clearances</small>
        </div>
      </div>

      <div className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Incoming Emergency</h3>
              <p>
                {emergencyRequest
                  ? "Highest priority request"
                  : "Waiting for emergency requests"}
              </p>
            </div>
            <Siren size={22} />
          </div>

          {emergencyRequest ? (
            <>
              <div className="emergency-control-card">
                <div className="control-icon">
                  <Siren size={28} />
                </div>

                <div className="control-details">
                  <strong>{emergencyRequest.vehicleId}</strong>
                  <span>
                    {emergencyRequest.vehicleType} approaching{" "}
                    {emergencyRequest.intersection}
                  </span>
                  <small>
                    Priority requested at {emergencyRequest.requestedAt}
                  </small>
                </div>

                <span className="priority">HIGH</span>
              </div>

              <div className="request-admin-details">
                <div>
                  <MapPin size={15} />
                  <span>Intersection</span>
                  <strong>{emergencyRequest.intersection}</strong>
                </div>

                <div>
                  <MapPin size={15} />
                  <span>Approaching From</span>
                  <strong>{emergencyRequest.approach}</strong>
                </div>

                <div>
                  <Clock size={15} />
                  <span>Status</span>
                  <strong>{emergencyRequest.status}</strong>
                </div>
              </div>

              {priorityActive ? (
                <button
                  className="complete-button"
                  onClick={handleComplete}
                >
                  <CheckCircle size={18} />
                  Vehicle Has Crossed — Complete Request
                </button>
              ) : (
                <button
                  className="priority-button"
                  onClick={handlePriority}
                >
                  <ShieldAlert size={18} />
                  Activate Emergency Priority
                </button>
              )}
            </>
          ) : (
            <div className="no-request">
              <Siren size={28} />
              <strong>No Active Emergency Request</strong>
              <span>
                Emergency vehicle requests will appear here.
              </span>
            </div>
          )}
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Priority Queue</h3>
              <p>Emergency requests ranked by priority</p>
            </div>
            <ShieldAlert size={22} />
          </div>

          <div className="priority-queue">
            {emergencyRequests.length === 0 ? (
              <div className="no-request">
                <ShieldAlert size={28} />
                <strong>No Emergency Requests</strong>
                <span>
                  Incoming emergency requests will appear here.
                </span>
              </div>
            ) : (
              emergencyRequests.map((request, index) => (
                <div
                  className={`queue-item ${
                    index === 0 ? "queue-active" : ""
                  }`}
                  key={`${request.vehicleId}-${request.requestedAt}`}
                >
                  <div className="queue-rank">#{index + 1}</div>

                  <div className="queue-details">
                    <strong>{request.vehicleId}</strong>
                    <span>
                      {request.vehicleType} • {request.approach} →{" "}
                      {request.intersection}
                    </span>
                  </div>

                  <div className="queue-status">
                    {request.status === "Priority Active" ? (
                      <span className="queue-priority">ACTIVE</span>
                    ) : (
                      <span className="queue-waiting">
                        {request.status === "Pending"
                          ? "QUEUED"
                          : request.status.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>Traffic Signal</h3>
            <p>Emergency priority status</p>
          </div>
          <CheckCircle size={22} />
        </div>

        <div className="signal-control-status">
          <div className="large-signal">
            <span className={priorityActive ? "" : "signal-red"}></span>
            <span className={priorityActive ? "signal-green" : ""}></span>
            <span></span>
          </div>

          <div>
            <strong>
              {priorityActive
                ? "Emergency Priority Active"
                : "Normal Operation"}
            </strong>
            <p>
              {priorityActive
                ? `Priority activated for ${emergencyRequest.vehicleId}.`
                : "Emergency priority has not been activated."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmergencyControl;
