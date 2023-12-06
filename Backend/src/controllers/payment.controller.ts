import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class PaymentController {
  // * Add
  static async add(req: Request, res: Response) {
    const { name } = req.body;

    // ! Req Body is Missing
    if (!name) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const dataCreate = await prisma.paymentMethod.create({
      data: { name },
    });

    return res.status(201).json({
      message: "Payment List created successfully",
      data: dataCreate,
    });
  }

  // * Available
  static async available(req: Request, res: Response) {
    const data = await prisma.paymentMethod.findMany();
    return res.status(200).json(data);
  }
}
