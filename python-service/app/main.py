from datetime import datetime, timezone

from fastapi import FastAPI

try:
    import traci
    TRACI_AVAILABLE = True
except ImportError:
    TRACI_AVAILABLE = False

app = FastAPI(
    title="UrbanGrid Python Service",
    description="Python traffic-control service for UrbanGrid",
    version="1.0.0",
)


@app.get("/")
def home():
    return {
        "success": True,
        "message": "UrbanGrid Python Service is running!",
        "service": "UrbanGrid Python API",
    }


@app.get("/api/health")
def health_check():
    return {
        "success": True,
        "status": "healthy",
        "service": "Python Traffic Controller",
        "traci_available": TRACI_AVAILABLE,
        "sumo_connected": False,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
