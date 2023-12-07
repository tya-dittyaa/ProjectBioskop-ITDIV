import { Router } from "express";
import { SeatController } from "../controllers/seat.controller";
import { authorization } from "../middlewares/auth.middleware";

// * Main config
const routes = Router();

/**
 * * Get purchased seat of a daily schedule
 * * <url>/seat/purchased
 */
routes.post("/purchased", authorization, SeatController.purchased);

// * Export route
export { routes as seatRoute };
