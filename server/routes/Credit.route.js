import express from "express";
import {
  getPlans,
  purchasePlan,
  verifyStripe,
} from "../controllers/Credit.controller.js";
import { protect } from "../middlewares/auth.js";

const creditRouter = express.Router();

creditRouter.get("/plan", protect, getPlans);
creditRouter.post("/purchase", protect, purchasePlan);
creditRouter.post("/verify", protect, verifyStripe);

export default creditRouter;
