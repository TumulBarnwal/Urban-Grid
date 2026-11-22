
import { useState } from "react";
import {
  Ambulance,
  ShieldAlert,
  Flame,
  MapPin,
  Radio,
  CheckCircle,
  Clock,
  Car,
} from "lucide-react";

function RequestMonitor({ setEmergencyRequest }) {
  // Vehicle information
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("Ambulance");
  const [intersection, setIntersection] = useState("INT-001");
  const [approach, setApproach] = useState("North");

  // Request states
  const [requestSent, setRequestSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [requestError, setRequestError] = useState("");

  // Emergency vehicle types
  const vehicleTypes = [
    {
      name: "Ambulance",
      icon: Ambulance,
    },
    {
      name: "Police",
      icon: ShieldAlert,
    },
    {
      name: "Fire Truck",
      icon: Flame,
    },
  ];

  // Handle vehicle type selection
  const handleVehicleChange = (type) => {
    setVehicleType(type.name);
    setRequestSent(false);
    setRequestError("");
  };

  // Send emergency priority request to backend
  const handlePriorityRequest = async () => {
    if (!vehicleNumber.trim() || submitting || requestSent) {
      return;
    }

    const request = {
      vehicleType,
      vehicleId: vehicleNumber.trim().toUpperCase(),
      intersection,
      approach,
    };

    try {
      setSubmitting(true);
      setRequestError("");

      await setEmergencyRequest(request);

      setRequestSent(true);
    } catch (error) {
      setRequestError(
        error.message ||
          "Could not send your request. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="dashboard">

      {/* Header */}
      <div className="welcome">
        <div>
          <span className="eyebrow">
            URBANGRID EMERGENCY PORTAL
          </span>

          <h2>Request Priority</h2>

          <p>
            Send a traffic signal priority request for your emergency vehicle.
          </p>
        </div>

        <div className="intersection-status">
          <span className="status-dot"></span>
          Connected to UrbanGrid
        </div>
      </div>

      {/* Vehicle Identification */}
      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>Vehicle Identification</h3>
            <p>
              Enter the registration number of the emergency vehicle.
            </p>
          </div>

          <Car size={22} />
        </div>

        <div className="vehicle-number-field">
          <label>Vehicle Number</label>

          <div className="vehicle-input-wrapper">
            <Car size={18} />

            <input
              type="text"
              value={vehicleNumber}
              placeholder="e.g. WB12AB1234"
              onChange={(e) => {
                setVehicleNumber(e.target.value);
                setRequestSent(false);
                setRequestError("");
              }}
            />
          </div>
        </div>
      </div>

      {/* Vehicle Type */}
      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>Emergency Vehicle</h3>
            <p>Select the type of emergency vehicle.</p>
          </div>

          <Radio size={22} />
        </div>

        <div className="vehicle-type-grid">
          {vehicleTypes.map((type) => {
            const Icon = type.icon;

            return (
              <button
                key={type.name}
                className={`vehicle-type ${
                  vehicleType === type.name ? "selected" : ""
                }`}
                onClick={() => handleVehicleChange(type)}
                disabled={submitting}
              >
                <Icon size={24} />
                <span>{type.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Request Details */}
      <div className="content-grid">

        {/* Request Information */}
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Request Details</h3>
              <p>
                Information sent with the priority request.
              </p>
            </div>
          </div>

          <div className="request-details">

            <div className="request-field">
              <span>Vehicle Number</span>
              <strong>
                {vehicleNumber
                  ? vehicleNumber.toUpperCase()
                  : "Not entered"}
              </strong>
            </div>

            <div className="request-field">
              <span>Vehicle Type</span>
              <strong>{vehicleType}</strong>
            </div>

            <div className="request-field">
              <span>Target Intersection</span>
              <strong>{intersection}</strong>
            </div>

            <div className="request-field">
              <span>Approaching From</span>

              <select
                value={approach}
                disabled={submitting}
                onChange={(e) => {
                  setApproach(e.target.value);
                  setRequestSent(false);
                  setRequestError("");
                }}
              >
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
              </select>
            </div>

            <div className="request-field">
              <span>Current Signal</span>
              <strong className="signal-text">RED</strong>
            </div>

          </div>

          {/* Send Request Button */}
          <button
            className={`priority-request-button ${
              requestSent ? "request-active" : ""
            }`}
            onClick={handlePriorityRequest}
            disabled={
              requestSent ||
              submitting ||
              !vehicleNumber.trim()
            }
          >
            {submitting ? (
              "Sending Request..."
            ) : requestSent ? (
              <>
                <CheckCircle size={20} />
                Priority Request Sent
              </>
            ) : (
              <>
                <ShieldAlert size={20} />
                Request Traffic Priority
              </>
            )}
          </button>

          {/* Empty Vehicle Number Warning */}
          {!vehicleNumber.trim() && !requestSent && (
            <div className="request-warning">
              <span>
                Enter your vehicle number before sending a priority request.
              </span>
            </div>
          )}

          {/* Backend Error */}
          {requestError && (
            <div className="request-warning">
              {requestError}
            </div>
          )}

          {/* Confirmation */}
          {requestSent && (
            <div className="request-confirmation">
              <CheckCircle size={18} />

              <div>
                <strong>Request received by UrbanGrid</strong>

                <span>
                  Vehicle {vehicleNumber.toUpperCase()} is now waiting for
                  priority approval.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Current Status */}
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Intersection Status</h3>
              <p>Current traffic information.</p>
            </div>

            <MapPin size={22} />
          </div>

          <div className="intersection-user-status">

            <div className="status-row">
              <span>Intersection</span>
              <strong>{intersection}</strong>
            </div>

            <div className="status-row">
              <span>Approaching From</span>
              <strong>{approach}</strong>
            </div>

            <div className="status-row">
              <span>Signal</span>
              <strong className="signal-text">RED</strong>
            </div>

            <div className="status-row">
              <span>Traffic Density</span>
              <strong>Medium</strong>
            </div>

            <div className="status-row">
              <span>UrbanGrid Connection</span>

              <strong className="connected-text">
                <span className="status-dot"></span>
                Connected
              </strong>
            </div>

          </div>

          {/* Request Status */}
          <div className="request-status-box">
            <Clock size={18} />

            <div>
              <strong>
                {requestSent
                  ? "Priority request processing"
                  : submitting
                  ? "Sending priority request"
                  : "No active priority request"}
              </strong>

              <span>
                {requestSent
                  ? "Please proceed toward the intersection."
                  : submitting
                  ? "Connecting to UrbanGrid backend..."
                  : "Request priority when approaching the intersection."}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default RequestMonitor;
