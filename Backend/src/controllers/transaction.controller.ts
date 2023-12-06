import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class TransactionController {
  // * Create a transaction
  static async create(req: Request, res: Response) {
    type SeatInputType = {
      row: string;
      column: number;
    };

    type TransactionInputType = {
      userId: string;
      scheduleId: string;
      paymentMethodId: string;
      seat: SeatInputType[];
    };

    const transaction: TransactionInputType = req.body;

    // ! Req Body is Missing
    if (
      Object.keys(transaction).length !== 4 ||
      !Array.isArray(transaction.seat) ||
      transaction.seat.length <= 0
    ) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    try {
      // * Insert into Transaction table
      const transactionCreate = await prisma.transaction.create({
        data: {
          userId: transaction.userId,
          paymentMethodId: transaction.paymentMethodId,
        },
      });

      for (let index = 0; index < transaction.seat.length; index++) {
        const element = transaction.seat[index];

        // * Insert into Purchased Seat table
        const seatCreate = await prisma.purchasedSeat.create({
          data: {
            scheduleId: transaction.scheduleId,
            rowCharacter: element.row,
            columnNumber: element.column,
          },
        });

        // * Insert into Transaction Detail table
        const transactionDetailCreate = await prisma.transactionDetail.create({
          data: { transactionId: transactionCreate.id, seatId: seatCreate.id },
        });
      }

      return res.status(200).json({
        message: "Transaction and Purchased Seat created successfully",
        data: { transactionId: transactionCreate.id },
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
