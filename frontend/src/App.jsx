
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import EmergencyControl from "./pages/EmergencyControl";
import RequestMonitor from "./pages/RequestMonitor";
import Analytics from "./pages/Analytics";
import Architecture from "./pages/Architecture";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  // Store all emergency requests
  const [emergencyRequests, setEmergencyRequests] = useState([]);

  // Add a new emergency request
  const addEmergencyRequest = (request) => {
    setEmergencyRequests((previousRequests) => [
      ...previousRequests,
      request,
    ]);
  };

  // Update the status of a specific emergency vehicle
  const updateEmergencyStatus = (vehicleId, newStatus) => {
    setEmergencyRequests((previousRequests) =>
      previousRequests.map((request) =>
        request.vehicleId === vehicleId
          ? { ...request, status: newStatus }
          : request
      )
    );
  };

  // Complete an emergency request
  const completeEmergencyRequest = (vehicleId) => {
    updateEmergencyStatus(vehicleId, "Completed");
  };

  // Assign priority scores to emergency vehicle types
  const getPriorityScore = (vehicleType) => {
    if (vehicleType === "Ambulance") return 3;

    if (
      vehicleType === "Police" ||
      vehicleType === "Fire Truck"
    ) {
      return 2;
    }

    return 1;
  };

  // Keep completed requests in history, but remove them from the active queue
  const sortedRequests = emergencyRequests
    .filter((request) => request.status !== "Completed")
    .sort((a, b) => {
      const priorityDifference =
        getPriorityScore(b.vehicleType) -
        getPriorityScore(a.vehicleType);

      if (priorityDifference !== 0) {
        return priorityDifference;
      }

      return (
        new Date(`1970-01-01T${a.requestedAt}`) -
        new Date(`1970-01-01T${b.requestedAt}`)
      );
    });

  // Highest-priority active request
  const activeEmergencyRequest = sortedRequests[0] || null;

  const renderPage = () => {
    switch (activePage) {
      case "Emergency Control":
        return (
          <EmergencyControl
            emergencyRequest={activeEmergencyRequest}
            emergencyRequests={sortedRequests}
            updateEmergencyStatus={updateEmergencyStatus}
            completeEmergencyRequest={completeEmergencyRequest}
          />
        );

      case "Request Monitor":
        return (
          <RequestMonitor
            setEmergencyRequest={addEmergencyRequest}
            emergencyRequests={emergencyRequests}
          />
        );

      case "Analytics":
        return <Analytics />;

      case "Architecture":
        return <Architecture />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main">
        <Topbar />
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
