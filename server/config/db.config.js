import mongoose from "mongoose";

const Max_Connection_Retries = 3;
const Retry_Interval = 5000;

class DataBaseConnection {
  constructor() {
    this.retryCount = 0;
    this.isConnected = false;

    // configure mongoose settings
    mongoose.set("strictQuery", true);

    // handle connection events
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connection established successfully ✅");
      this.isConnected = true;
    });

    mongoose.connection.on("error", (err) => {
      console.log(`MongoDB connection error: ${err} ❌`);
      this.isConnected = false;
    });

    mongoose.connection.on("disconnected", async () => {
      console.log("MongoDB disconnected  ⚠️");
      this.isConnected = false;

      await this.handleDisconnection();
    });
  }

  // connect to the database
  async connect() {
    try {
      if (!process.env.MONGO_URI) {
        throw new Error("Mongo URI is not defined.");
      }

      const connectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
      };

      if (process.env.NODE_ENV === "development") {
        mongoose.set("debug", true);
      }

      await mongoose.connect(process.env.MONGO_URI, connectionOptions);

      this.retryCount = 0;
    } catch (error) {
      console.error("Failed to connect to MongoDB:");
      // handle connection
      await this.handleConnectionError();
    }
  }

  // Handle connection Error
  async handleConnectionError() {
    try {
      if (this.retryCount < Max_Connection_Retries) {
        this.retryCount++;

        await new Promise((resolve) => {
          setTimeout(() => {
            resolve;
          }, Retry_Interval);
        });

        return this.connect();
      }
    } catch (error) {
      console.log(
        `Failed to connect to mongoDB after ${Max_Connection_Retries} attemps.`
      );
      process.exit(1);
    }
  }

  // Handle disconnection
  async handleDisconnection() {
    try {
      if (!this.isConnected) {
        console(`Attempting to reconnect to Database.... ${this.retryCount}`);
        await this.connect();
      }
    } catch (error) {
      console.error("Error during database disconnection:", error);
      process.exit(1);
    }
  }

  // Handle App Termination
  async handleAppTermination() {
    try {
      await mongoose.connection.close();
      console.log("MongoDB connection closed through app termination");
      process.exit(0);
    } catch (error) {
      console.error("Error during database App Termination:", error);
      process.exit(1);
    }
  }

  // get current connection status
  getConnectionStatus (){
    return {
      isConnected: this.isConnected,
      readyState: mongoose.connection.readyState,
      host: mongoose.connections.host,
      name: mongoose.connection.name
    }
  }
}
