import { Router } from "express";
import { StudioController } from "../controllers/studio.controller";
import { authorization } from "../middlewares/auth.middleware";

// * Main config
const routes = Router();

/**
 * * Adding studio in a theater
 * * <url>/studio/add
 */
routes.post("/add", authorization, StudioController.add);

// * Export route
export { routes as studioRoute };
