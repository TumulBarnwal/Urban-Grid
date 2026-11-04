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

  const [requestSent, setRequestSent] = useState(false);


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

    // Allow another request after changing vehicle
    setRequestSent(false);
  };


  // Send emergency priority request
  const handlePriorityRequest = () => {

    // Don't allow empty vehicle number
    if (!vehicleNumber.trim()) {
      return;
    }


    const request = {
      vehicleType: vehicleType,

      vehicleId: vehicleNumber.trim().toUpperCase(),

      intersection: intersection,

      approach: approach,

      status: "Pending",

      requestedAt: new Date().toLocaleTimeString(),
    };


    // Send request to UrbanGrid
    setEmergencyRequest(request);

    // Show confirmation
    setRequestSent(true);
  };


  return (
    <section className="dashboard">


      {/* Header */}
      <div className="welcome">

        <div>

          <span className="eyebrow">
            URBANGRID EMERGENCY PORTAL
          </span>

          <h2>
            Request Priority
          </h2>

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

            <h3>
              Vehicle Identification
            </h3>

            <p>
              Enter the registration number of the emergency vehicle.
            </p>

          </div>

          <Car size={22} />

        </div>


        <div className="vehicle-number-field">

          <label>
            Vehicle Number
          </label>

          <div className="vehicle-input-wrapper">

            <Car size={18} />

            <input
              type="text"
              value={vehicleNumber}
              placeholder="e.g. WB12AB1234"
              onChange={(e) => {
                setVehicleNumber(e.target.value);
                setRequestSent(false);
              }}
            />

          </div>

        </div>

      </div>



      {/* Vehicle Type */}
      <div className="panel">

        <div className="panel-header">

          <div>

            <h3>
              Emergency Vehicle
            </h3>

            <p>
              Select the type of emergency vehicle.
            </p>

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
                  vehicleType === type.name
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleVehicleChange(type)}
              >

                <Icon size={24} />

                <span>
                  {type.name}
                </span>

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

              <h3>
                Request Details
              </h3>

              <p>
                Information sent with the priority request.
              </p>

            </div>

          </div>


          <div className="request-details">


            {/* Vehicle Number */}
            <div className="request-field">

              <span>
                Vehicle Number
              </span>

              <strong>
                {vehicleNumber
                  ? vehicleNumber.toUpperCase()
                  : "Not entered"}
              </strong>

            </div>


            {/* Vehicle Type */}
            <div className="request-field">

              <span>
                Vehicle Type
              </span>

              <strong>
                {vehicleType}
              </strong>

            </div>


            {/* Intersection */}
            <div className="request-field">

              <span>
                Target Intersection
              </span>

              <strong>
                {intersection}
              </strong>

            </div>


            {/* Approach */}
            <div className="request-field">

              <span>
                Approaching From
              </span>

              <select
                value={approach}
                onChange={(e) => {
                  setApproach(e.target.value);
                  setRequestSent(false);
                }}
              >

                <option value="North">
                  North
                </option>

                <option value="South">
                  South
                </option>

                <option value="East">
                  East
                </option>

                <option value="West">
                  West
                </option>

              </select>

            </div>


            {/* Current Signal */}
            <div className="request-field">

              <span>
                Current Signal
              </span>

              <strong className="signal-text">
                RED
              </strong>

            </div>


          </div>



          {/* Send Request Button */}

          <button
            className={`priority-request-button ${
              requestSent
                ? "request-active"
                : ""
            }`}
            onClick={handlePriorityRequest}
            disabled={
              requestSent ||
              !vehicleNumber.trim()
            }
          >

            {requestSent ? (

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



          {/* Confirmation */}

          {requestSent && (

            <div className="request-confirmation">

              <CheckCircle size={18} />

              <div>

                <strong>
                  Request received by UrbanGrid
                </strong>

                <span>
                  Vehicle {vehicleNumber.toUpperCase()} is now waiting for priority approval.
                </span>

              </div>

            </div>

          )}

        </div>



        {/* Current Status */}
        <div className="panel">

          <div className="panel-header">

            <div>

              <h3>
                Intersection Status
              </h3>

              <p>
                Current traffic information.
              </p>

            </div>

            <MapPin size={22} />

          </div>


          <div className="intersection-user-status">


            <div className="status-row">

              <span>
                Intersection
              </span>

              <strong>
                {intersection}
              </strong>

            </div>


            <div className="status-row">

              <span>
                Approaching From
              </span>

              <strong>
                {approach}
              </strong>

            </div>


            <div className="status-row">

              <span>
                Signal
              </span>

              <strong className="signal-text">
                RED
              </strong>

            </div>


            <div className="status-row">

              <span>
                Traffic Density
              </span>

              <strong>
                Medium
              </strong>

            </div>


            <div className="status-row">

              <span>
                UrbanGrid Connection
              </span>

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
                  : "No active priority request"}

              </strong>


              <span>

                {requestSent
                  ? "Please proceed toward the intersection."
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