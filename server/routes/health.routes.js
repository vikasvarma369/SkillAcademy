import express from "express";
import { healthCheck } from "../controllers/health.controller.js";

const healthRouter = express.Router();

healthRouter.get("/", healthCheck);

export {
  healthRouter
} ;