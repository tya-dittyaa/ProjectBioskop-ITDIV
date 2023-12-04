import express from "express";
import { filmRoute } from "./film";
import { theaterRoute } from "./theater";
import { userRoute } from "./user";

export const routes = express.Router();

routes.use(filmRoute);
routes.use(theaterRoute);
routes.use(userRoute);
