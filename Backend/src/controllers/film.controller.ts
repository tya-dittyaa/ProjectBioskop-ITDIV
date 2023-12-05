import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class FilmController {
  // * Add
  static async add(req: Request, res: Response) {
    type Film = {
      title: string;
      genre: string;
      duration: number;
      director: string;
      ageRating: string;
      filmRating: number;
      description: string;
      image_link: string;
      release_date: Date;
    };

    const film: Film = req.body;

    // ! Req Body is Missing
    if (Object.keys(film).length !== 9) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const dataCreate = await prisma.film.create({
      data: film,
    });

    return res.status(201).json({
      message: "Film created successfully",
      data: dataCreate,
    });
  }

  // * Available
  static async available(req: Request, res: Response) {
    const data = await prisma.film.findMany({
      where: { isAvailable: true },
    });

    return res.status(200).json(data);
  }

  // * Random 3 Film
  static async randomFilm(req: Request, res: Response) {
    const getData = await prisma.film.findMany({
      where: { isAvailable: true },
    });

    const randomIndices = new Set();

    while (randomIndices.size < 3) {
      randomIndices.add(getData[Math.floor(Math.random() * getData.length)]);
    }

    return res.status(200).json(Array.from(randomIndices));
  }

  // * Coming Soon
  static async comingSoon(req: Request, res: Response) {
    const getData = await prisma.film.findMany({
      where: { isAvailable: false },
      orderBy: { release_date: "desc" },
    });

    return res.status(200).json(getData);
  }
}
