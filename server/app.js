import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { xss } from "express-xss-sanitizer";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import errorMiddleware from "./middleware/error.middleware.js";

import { configDotenv } from "dotenv";
// configaration
configDotenv();

// database connection
import connectToDb from "./database/db.config.js";
(async () => {
  await connectToDb();
})();

const app = express();

// Global rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: "Too may requests from this IP, please try later.",
});

// security middleware
app.use(helmet());

// Body Parser Middleware
app.use(express.json({ limit: "10kb" })); // Body limit is 10kb
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// security
app.use(mongoSanitize()); // NoSQL injection
app.use(xss()); // protect xss attacks

app.use(hpp()); // parameter pollution

// Logging Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "Access-Control-Allow-Headers",
      "X-Requested-With",
      "Accept",
      "Access-Control-Allow-Origin",
      "device-remember-token",
    ],
  })
);

// Rate Limiting
app.use("/api", limiter);

// API Routes
import userRoutes from "./routes/user.routes.js"; // improt user route
import courseRoute from "./routes/course.routes.js"; // import course route
import contractRoutes from "./routes/contacts.routes.js"; // import contactus route
import paymentRoutes from "./routes/payment.routes.js"; // import payment route

// import admin stats route
import statsRoutes from "./routes/allStatus.js";

// import Health route
import { healthRouter } from "./routes/health.routes.js";

// declaration
app.use("/health", healthRouter);

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/", contractRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/admin", statsRoutes);

app.all("*", (_req, res) => {
  res.status(404).json({ status: 404, message: "Page not found" });
});

app.use(errorMiddleware); // error middleware

export default app;
