import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class StudioController {
  // * Add
  static async add(req: Request, res: Response) {
    type Studio = {
      theaterId: string;
      roomNumber: number;
      capacity: number;
    };

    const studio: Studio = req.body;

    // ! Req Body is Missing
    if (Object.keys(studio).length !== 3) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const dataCreate = await prisma.studio.create({
      data: studio,
    });

    return res.status(201).json({
      message: "Studio created successfully",
      data: dataCreate,
    });
  }
}
