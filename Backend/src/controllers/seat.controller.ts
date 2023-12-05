import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class SeatController {
  // * Get Purchased Seat
  static async purchased(req: Request, res: Response) {
    const { scheduleId } = req.body;

    if (!scheduleId) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const getData = await prisma.purchasedSeat.findMany({
      where: { scheduleId },
    });

    return res.status(200).json(getData);
  }
}
