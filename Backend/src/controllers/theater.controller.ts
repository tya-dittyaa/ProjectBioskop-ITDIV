import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class TheaterController {
  // * Add
  static async add(req: Request, res: Response) {
    type Theater = {
      name: string;
      location: string;
    };

    const theater: Theater = req.body;

    // ! Req Body is Missing
    if (Object.keys(theater).length !== 2) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const dataCreate = await prisma.theater.create({
      data: theater,
    });

    return res.status(201).json({
      message: "Theater created successfully",
      data: dataCreate,
    });
  }

  // * Available
  static async available(req: Request, res: Response) {
    const { filmId } = req.body;

    // * This Past Midnight Date
    const pastMidnight = new Date("2023-12-06T00:00:00.000Z");
    pastMidnight.setUTCHours(0, 0, 0, 0);

    // * Get next midnight date
    const nextMidnight = new Date("2023-12-06T00:00:00.000Z");
    nextMidnight.setDate(nextMidnight.getDate() + 1);
    nextMidnight.setUTCHours(0, 0, 0, 0);

    // ! Req Body is Missing
    if (!filmId) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const schedule = await prisma.schedule.findMany({
      select: {
        studio: { select: { theater: { select: { id: true, name: true } } } },
      },
      where: { filmId, showTime: { gte: pastMidnight, lte: nextMidnight } },
      orderBy: { studio: { theater: { name: "asc" } } },
    });

    if (schedule.length === 0) {
      return res.status(404).json({ message: "Theater not found" });
    }

    let arrayOfObjects = [];

    for (let index = 0; index < schedule.length; index++) {
      const element = schedule[index];
      const newObj = {
        theaterId: element.studio.theater.id,
        name: element.studio.theater.name,
      };

      const objectSet = new Set(
        arrayOfObjects.map((obj) => JSON.stringify(obj))
      );

      if (!objectSet.has(JSON.stringify(newObj))) {
        arrayOfObjects.push(newObj);
      }
    }

    return res.status(200).json(Array.from(arrayOfObjects));
  }
}
