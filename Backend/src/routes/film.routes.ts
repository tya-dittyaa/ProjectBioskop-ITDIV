import { Router } from "express";
import { FilmController } from "../controllers/film.controller";
import { authorization } from "../middlewares/auth.middleware";

// * Main config
const routes = Router();

/**
 * * Adding film
 * * <url>/film/add
 */
routes.post("/add", authorization, FilmController.add);

/**
 * * Get all available film
 * * <url>/film/available
 */
routes.get("/available", authorization, FilmController.available);

/**
 * * Get random 3 film
 * * <url>/film/random
 */
routes.get("/random", authorization, FilmController.randomFilm);

/**
 * * Get coming soon film
 * * <url>/film/comingsoon
 */
routes.get("/comingsoon", authorization, FilmController.comingSoon);

// * Export route
export { routes as filmRoute };
