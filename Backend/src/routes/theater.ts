import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { Film } from "../interface/film.interface";

export const theaterRoute = Router();
const prisma = new PrismaClient();

theaterRoute.post("/available", async (req, res) => {
  const filmInput: Film = req.body;

  const getSchedule = await prisma.schedule.findMany({
    where: { filmId: filmInput.id },
  });

  return res.status(200).json(getSchedule);
});
