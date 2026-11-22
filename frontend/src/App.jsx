
import { useState, useEffect, useCallback } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import EmergencyControl from "./pages/EmergencyControl";
import RequestMonitor from "./pages/RequestMonitor";
import Analytics from "./pages/Analytics";
import Architecture from "./pages/Architecture";

import "./App.css";

const API_URL = "http://localhost:5000/api/emergency-requests";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [emergencyRequests, setEmergencyRequests] = useState([]);

  // Fetch emergency requests from MongoDB
  const fetchEmergencyRequests = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not fetch requests.");
      }

      setEmergencyRequests(data.requests || []);
    } catch (error) {
      console.error("Error fetching emergency requests:", error);
    }
  }, []);

  // Fetch requests on startup and refresh every 3 seconds
  useEffect(() => {
    fetchEmergencyRequests();

    const interval = setInterval(fetchEmergencyRequests, 3000);

    return () => clearInterval(interval);
  }, [fetchEmergencyRequests]);

  // Submit a new manual emergency request
  const addEmergencyRequest = async (request) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleId: request.vehicleId,
          vehicleType: request.vehicleType,
          intersectionId: request.intersection,
          approach: request.approach,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Request submission failed.");
      }

      await fetchEmergencyRequests();

      return data;
    } catch (error) {
      console.error("Error submitting emergency request:", error);
      throw error;
    }
  };

  // Activate emergency priority through the backend
  const updateEmergencyStatus = async (vehicleId, newStatus) => {
    if (newStatus !== "Priority Active") return;

    const request = emergencyRequests.find(
      (item) => item.vehicleId === vehicleId
    );

    if (!request) return;

    try {
      const response = await fetch(
        `${API_URL}/${request._id}/activate`,
        {
          method: "PATCH",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not activate priority.");
      }

      await fetchEmergencyRequests();

    } catch (error) {
      console.error("Error activating emergency priority:", error);
      alert(error.message);
    }
  };

  // Complete an active emergency request through the backend
  const completeEmergencyRequest = async (vehicleId) => {
    try {
      const request = emergencyRequests.find(
        (item) => item.vehicleId === vehicleId
      );

      if (!request) return;

      const response = await fetch(
        `${API_URL}/${request._id}/complete`,
        {
          method: "PATCH",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not complete request.");
      }

      await fetchEmergencyRequests();

    } catch (error) {
      console.error("Error completing emergency request:", error);
      alert(error.message);
    }
  };

  // Convert backend data into the format used by existing UI pages
  const sortedRequests = emergencyRequests.map((request) => ({
    ...request,
    intersection: request.intersectionId,
    requestedAt: new Date(request.createdAt).toLocaleTimeString(),
    status: request.status,
  }));

  // Only an actually activated request is considered active
  const activeEmergencyRequest =
    sortedRequests.find(
      (request) => request.status === "Priority Active"
    ) || sortedRequests[0] || null;

  // Render selected page
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
