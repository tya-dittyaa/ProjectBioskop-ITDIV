import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class TransactionController {
  // * Create a transaction
  static async create(req: Request, res: Response) {
    return res
      .status(500)
      .json({ message: "Developernya udah mabok API 🔥🔥" });
  }
}
