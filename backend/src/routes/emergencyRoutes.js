
const express = require("express");
const EmergencyRequest = require("../models/EmergencyRequest");

const router = express.Router();

// Emergency vehicle priority
const PRIORITY = {
  Ambulance: 3,
  Police: 2,
  "Fire Truck": 2,
};

// Sort by priority first, then arrival time (FIFO).
function sortRequests(requests) {
  return [...requests].sort((a, b) => {
    const priorityDifference =
      PRIORITY[b.vehicleType] - PRIORITY[a.vehicleType];

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    return new Date(a.createdAt) - new Date(b.createdAt);
  });
}

// POST /api/emergency-requests
// Save a new emergency request in MongoDB.
router.post("/", async (req, res) => {
  try {
    const { vehicleId, vehicleType, intersectionId, approach } = req.body;

    if (
      !vehicleId?.trim?.() ||
      !vehicleType ||
      !intersectionId?.trim?.() ||
      !approach?.trim?.()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide vehicleId, vehicleType, intersectionId and approach.",
      });
    }

    if (!Object.prototype.hasOwnProperty.call(PRIORITY, vehicleType)) {
      return res.status(400).json({
        success: false,
        message: "Vehicle type must be Ambulance, Police or Fire Truck.",
      });
    }

    const newRequest = await EmergencyRequest.create({
      vehicleId,
      vehicleType,
      intersectionId,
      approach,
      status: "Pending",
    });

    const pendingRequests = await EmergencyRequest.find({
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Emergency request received successfully.",
      request: newRequest,
      queue: sortRequests(pendingRequests),
    });
  } catch (error) {
    console.error("Error creating emergency request:", error);

    return res.status(500).json({
      success: false,
      message: "Could not create emergency request.",
    });
  }
});

// GET /api/emergency-requests
// Retrieve all pending and active requests in priority order.
router.get("/", async (req, res) => {
  try {
    const requests = await EmergencyRequest.find({
      status: { $in: ["Pending", "Priority Active"] },
    });

    const queue = sortRequests(requests);

    return res.status(200).json({
      success: true,
      count: queue.length,
      requests: queue,
    });
  } catch (error) {
    console.error("Error fetching emergency requests:", error);

    return res.status(500).json({
      success: false,
      message: "Could not fetch emergency requests.",
    });
  }
});

// PATCH /api/emergency-requests/:id/activate
// Activate the highest-priority pending emergency request.
router.patch("/:id/activate", async (req, res) => {
  try {
    // Check whether another emergency is already active.
    const activeRequest = await EmergencyRequest.findOne({
      status: "Priority Active",
    });

    if (activeRequest) {
      return res.status(409).json({
        success: false,
        message: `Priority is already active for ${activeRequest.vehicleId}. Complete that request first.`,
      });
    }

    const request = await EmergencyRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Emergency request not found.",
      });
    }

    if (request.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending requests can be activated.",
      });
    }

    // Find the highest-priority pending request.
    const pendingRequests = await EmergencyRequest.find({
      status: "Pending",
    });

    const highestPriorityRequest = sortRequests(pendingRequests)[0];

    if (
      !highestPriorityRequest ||
      highestPriorityRequest._id.toString() !== request._id.toString()
    ) {
      return res.status(409).json({
        success: false,
        message:
          "A higher-priority emergency request is waiting. Activate that vehicle first.",
      });
    }

    request.status = "Priority Active";
    await request.save();

    return res.status(200).json({
      success: true,
      message: "Emergency priority activated successfully.",
      request,
    });
  } catch (error) {
    console.error("Error activating emergency priority:", error);

    return res.status(500).json({
      success: false,
      message: "Could not activate emergency priority.",
    });
  }
});

// PATCH /api/emergency-requests/:id/complete
// Mark an active emergency request as completed.
router.patch("/:id/complete", async (req, res) => {
  try {
    const request = await EmergencyRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Emergency request not found.",
      });
    }

    if (request.status !== "Priority Active") {
      return res.status(400).json({
        success: false,
        message: "Only an active emergency request can be completed.",
      });
    }

    request.status = "Completed";
    request.completedAt = new Date();

    await request.save();

    const pendingRequests = await EmergencyRequest.find({
      status: "Pending",
    });

    const nextRequest = sortRequests(pendingRequests)[0] || null;

    return res.status(200).json({
      success: true,
      message: "Emergency request completed.",
      completedRequest: request,
      nextRequest,
    });
  } catch (error) {
    console.error("Error completing emergency request:", error);

    return res.status(500).json({
      success: false,
      message: "Could not complete emergency request.",
    });
  }
});

module.exports = router;
