import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";
import { authorization } from "../middlewares/auth.middleware";

// * Main config
const routes = Router();

/**
 * * Add a payment list
 * * <url>/payment/available
 */
routes.post("/add", authorization, PaymentController.add);

/**
 * * Get all available payment list
 * * <url>/payment/available
 */
routes.get("/available", authorization, PaymentController.available);

// * Export route
export { routes as paymentRoute };
