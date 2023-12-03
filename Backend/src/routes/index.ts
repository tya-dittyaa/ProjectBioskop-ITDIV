import express from "express";
import { filmRoute } from "./film";
import { userRoute } from "./user";

export const routes = express.Router();

routes.use(filmRoute);
routes.use(userRoute);
