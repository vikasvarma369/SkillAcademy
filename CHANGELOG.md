# 1. Database Connection Upgrade

## Changes Made

- **Improved Connection Handling**: Added automatic reconnection when the database disconnects.

- **Better Error Handling**: Ensured errors are properly caught and logged.

- **Graceful Shutdown**: Closes the database connection safely when the app stops.

- **Singleton Pattern**: Prevents multiple instances of the database connection.

- **Environment-Based Debugging**: Enables Mongoose debug mode only in development.

## Why This Upgrade?

- **More Stability**: Handles disconnections and retries automatically.

- **Less Downtime**: Ensures the app tries to reconnect when the database goes down.

- **Cleaner Code**: Reduces duplicate connection logic.

- **Easier Debugging**: Only logs detailed info when in development mode.

- **Better Performance**: Prevents unnecessary reconnections and optimizes resource use.

## Usage

Import and connect the database:

```javascript
import connectToDb from "./database";

(async () => {
  await connectToDb();
})();
```

Check connection status:

```javascript
import { getConnectionStates } from "./database";
console.log(getConnectionStates());
```

# 2. Security Upgrade

## Changes Made

- **Rate Limiting**: Limits requests from one IP to prevent abuse.

- **Helmet**: Adds security headers to protect against common attacks.

- **XSS Protection**: Sanitizes inputs to stop malicious scripts.

- **Mongo Sanitize**: Protects against database injection attacks.

- **HPP Protection**: Blocks harmful query parameters in requests.

## Additional Changes

- **Body Size Limit**: Reduces request size to avoid overload.

- **Logging**: Adds request logging in development for easier debugging.

- **CORS Settings**: Restricts cross-origin requests for better security.

## Benefit

These changes make the app more secure by preventing common attacks and improving performance.

# 3. Health Upgrade

## Changes Made

- **Health Check Endpoint**: New endpoint to check app health.
- **Detailed Metrics**: Includes database status, memory usage, and uptime.

- **Health Controller**: Handles health check logic.

- **Health Routes**: Routes for health checks.

## Why This Upgrade?

- **Proactive Monitoring**: Monitor app health proactively.

- **Quick Diagnostics**: Diagnose issues quickly.

- **Improved Reliability**: Ensure smooth operation.

- **Resource Management**: Monitor resource usage.

## Example Response

```json
{
  "status": "UP",
  "uptime": 123456,
  "memoryUsage": {
    "rss": 12345678,
    "heapTotal": 12345678,
    "heapUsed": 12345678,
    "external": 12345678
  },
  "dbConnection": "Connected"
}
```
