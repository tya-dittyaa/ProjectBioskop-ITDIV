import { Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";
import { authorization } from "../middlewares/auth.middleware";

// * Main config
const routes = Router();

/**
 * * Create a user transaction
 * * <url>/transaction/create
 */
routes.post("/create", authorization, TransactionController.create);

// * Export route
export { routes as transactionRoute };
