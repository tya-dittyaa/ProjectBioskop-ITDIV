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
      rating: film.rating,
      release_date: new Date(film.release_date),
    },
  });

  return res.status(201).json({
    message: "Successfull created!",
    data: dataCreate,
  });
});

/**
 * * Get all film
 */
filmRoute.get("/available", async (req, res) => {
  const data = await prisma.film.findMany({
    where: { isAvailable: true },
  });

  return res.status(200).json(data);
});

/**
 * * Get random 3 film
 */
filmRoute.get("/top3", async (req, res) => {
  const data = await prisma.film.findMany({
    take: 3,
    orderBy: { release_date: "desc" },
  });

  return res.status(200).json(data);
});
