import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { User } from "../interface/user.interface";

export const userRoute = Router();
const prisma = new PrismaClient();

/**
 * * User Database Register
 * * <url>/user/register
 */
userRoute.post("/register", async (req: Request, res: Response) => {
  const userInput: User = req.body;

  if (!userInput.name || !userInput.email || !userInput.password) {
    return res.status(400).json({ message: "Invalid input request!" });
  }

  const checkDataExist = await prisma.user.findUnique({
    where: { email: userInput.email },
  });

  if (checkDataExist) {
    return res.status(409).json({ message: "Email is already exist!" });
  }

  const dataCreate = await prisma.user.create({
    data: {
      name: userInput.name,
      email: userInput.email,
      password: userInput.password,
    },
  });

  return res
    .status(201)
    .json({ message: "Successfull created!", data: dataCreate });
});

/**
 * * User Login
 * * <url>/user/login
 */
userRoute.post("/login", async (req: Request, res: Response) => {
  const userInput: User = req.body;

  if (!userInput.email || !userInput.password) {
    return res.status(404).json({ message: "Invalid email/password!" });
  }

  const checkDataExist = await prisma.user.findFirst({
    where: { email: userInput.email, password: userInput.password },
  });

  if (checkDataExist) {
    return res.status(202).json({
      message: "Successfull login!",
      user: {
        id: checkDataExist.id,
        name: checkDataExist.name,
        email: checkDataExist.email,
      },
    });
  }

  return res.status(404).json({ message: "Invalid email/password!" });
});
