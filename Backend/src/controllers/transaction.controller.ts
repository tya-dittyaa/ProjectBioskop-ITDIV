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
          scheduleId: transaction.scheduleId,
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

  // * User Transaction History
  static async history(req: Request, res: Response) {
    const { userId } = req.body;

    // ! Req Body is Missing
    if (!userId) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    // Check valid user
    const userAcc = await prisma.user.findUnique({ where: { id: userId } });

    // ! Invalid user
    if (!userAcc) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Get transaction data
    const transactionData = await prisma.transaction.findMany({
      where: { userId },
      select: {
        id: true,
        date: true,
        paymentMethod: { select: { name: true } },
        schedule: {
          select: {
            film: { select: { title: true } },
            studio: {
              select: {
                theater: { select: { name: true, location: true } },
                roomNumber: true,
              },
            },
            showTime: true,
          },
        },
        TransactionDetail: {
          select: {
            purchasedSeat: {
              select: { rowCharacter: true, columnNumber: true },
            },
          },
        },
      },
    });

    return res.status(200).json({
      message: "Get user transaction was successfully",
      data: transactionData,
    });
  }
}
