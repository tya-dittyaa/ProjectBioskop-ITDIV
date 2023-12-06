import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const scheduleRefresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /*
  // * This Past Midnight Date
  const pastMidnight = new Date();
  pastMidnight.setUTCHours(0, 0, 0, 0);

  // * This Next Midnight Date
  const nextMidnight = new Date();
  nextMidnight.setDate(nextMidnight.getDate() + 1);
  nextMidnight.setUTCHours(0, 0, 0, 0);

  const getDataNext = await prisma.schedule.findMany({
    where: { showTime: { gte: nextMidnight } },
  });

  if (getDataNext.length !== 0) {
    return next();
  }

  const getDataPast = await prisma.schedule.findMany({
    where: { showTime: { gte: pastMidnight, lte: nextMidnight } },
  });

  for (let index = 0; index < getDataPast.length; index++) {
    const element = getDataPast[index];

    const nextShowTime = new Date(element.showTime);
    nextShowTime.setDate(nextShowTime.getDate() + 1);

    await prisma.schedule.create({
      data: {
        filmId: element.filmId,
        studioId: element.studioId,
        showTime: nextShowTime,
      },
    });
  }
  */

  return next();
};
