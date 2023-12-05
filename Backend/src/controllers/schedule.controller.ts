import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class ScheduleController {
  // * Add
  static async add(req: Request, res: Response) {
    type Schedule = {
      filmId: string;
      studioId: string;
      showTime: string;
    };

    const schedule: Schedule = req.body;

    // ! Req Body is Missing
    if (Object.keys(schedule).length !== 3) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const dataCreate = await prisma.schedule.create({
      data: schedule,
    });

    return res.status(201).json({
      message: "Schedule created successfully",
      data: dataCreate,
    });
  }

  // Available
  static async available(req: Request, res: Response) {
    const { filmId, theaterId } = req.body;

    // * Get midnight date
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);

    // ! Req Body is Missing
    if (!filmId || !theaterId) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    // * Get data
    const scheduleData = await prisma.schedule.findMany({
      where: {
        filmId,
        studio: { theaterId },
        showTime: { gte: new Date() },
      },
      orderBy: { showTime: "asc" },
    });

    // * No data
    if (scheduleData.length <= 0) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    let arrayOfObjects = [];

    for (let index = 0; index < scheduleData.length; index++) {
      const element = scheduleData[index];

      const date = element.showTime;
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const time = `${hours}:${formattedMinutes}`;

      const newObj = {
        scheduleId: element.id,
        showTime: time,
      };

      arrayOfObjects.push(newObj);
    }

    return res.status(200).json(arrayOfObjects);
  }
}
