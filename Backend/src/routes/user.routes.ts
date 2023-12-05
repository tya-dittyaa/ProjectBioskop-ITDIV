import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authorization } from "../middlewares/auth.middleware";

// * Main config
const routes = Router();

/**
 * * User Database Register
 * * <url>/user/register
 */
routes.post("/register", authorization, UserController.register);

/**
 * * User Login
 * * <url>/user/login
 */
routes.post("/login", authorization, UserController.login);

// * Export route
export { routes as userRoute };
