import { Router } from "express";
import { TheaterController } from "../controllers/theater.controller";
import { authorization } from "../middlewares/auth.middleware";

// * Main config
const routes = Router();

/**
 * * Adding theater
 * * <url>/theater/add
 */
routes.post("/add", authorization, TheaterController.add);

/**
 * * Get available theater based on a film
 * * <url>/theater/available
 */
routes.post("/available", authorization, TheaterController.available);

// * Export route
export { routes as theaterRoute };
