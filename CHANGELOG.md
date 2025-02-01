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

