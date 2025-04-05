import { getConnectionStates } from "../config/db.config.js";

export const healthCheck = (req, res) => {
  try {
    const dbStatus = getConnectionStates();
    const healthStatus = {
      status: "OK",
      timestamp: new Date().toISOString(),
      services: {
        database: {
          status: dbStatus.isConnected ? "Healthy" : "Unhealthy",

          details: {
            host: dbStatus.host,
            name: dbStatus.name,
            readyState: getReadyStatusText(dbStatus.readyState),
          },
        },
      },
      server: {
        status: "Healthy",
        memoryUsage: process.memoryUsage(),
        uptime: process.uptime(),
      },
    };

    const statusCode =
      healthStatus.services.database.status === "Healthy" ? 200 : 500;

    res.status(statusCode).json(healthStatus);
  } catch (err) {
    console.error("Health Check failed", err);
    res.status(500).json({
      status: "Error",
      timestamp: new Date().toISOString(),
      error: err.message,
    });
  }
};

function getReadyStatusText(state) {
  switch (state) {
    case 0:
      return "disconnected";
    case 1:
      return "connected";
    case 2:
      return "connecting";
    case 3:
      return "disconnecting";
    default:
      return "unknown";
  }
}