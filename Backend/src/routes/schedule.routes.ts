import { Router } from "express";
import { ScheduleController } from "../controllers/schedule.controller";
import { authorization } from "../middlewares/auth.middleware";

// * Main config
const routes = Router();

/**
 * * Adding schedule in a studio of a theater
 * * <url>/schedule/add
 */
routes.post("/add", authorization, ScheduleController.add);

/**
 * * Get available show time based on a film and a theater
 * * <url>/schedule/available
 */
routes.post("/available", authorization, ScheduleController.available);

// * Export route
export { routes as scheduleRoute };
