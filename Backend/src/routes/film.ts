import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { Film } from "../interface/film.interface";

export const filmRoute = Router();
const prisma = new PrismaClient();

/**
 * * Adding film
 */
filmRoute.post("/add", async (req, res) => {
  const film: Film = req.body;

  const dataCreate = await prisma.film.create({
    data: {
      title: film.title,
      genre: film.genre,
      description: film.description,
      image_link: film.image_link,
      release_date: new Date(film.release_date),
    },
  });

  return res.status(201).send({
    message: "Successfull created!",
    data: dataCreate,
  });
});

/**
 * * Get all film
 */
filmRoute.get("/available", async (req, res) => {
  const now = new Date();

  const data = await prisma.film.findMany({
    where: { isAvailable: true },
  });

  return res.status(200).send(data);
});
