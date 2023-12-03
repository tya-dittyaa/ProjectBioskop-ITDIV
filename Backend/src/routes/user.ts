import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { User } from "../interface/user.interface";

export const userRoute = Router();
const prisma = new PrismaClient();

/**
 * * User Database Create
 * * <url>/user/create
 */
userRoute.post("/create", async (req: Request, res: Response) => {
  const userInput: User = req.body;

  const checkDataExist = await prisma.user.findUnique({
    where: { email: userInput.email },
  });

  if (checkDataExist) {
    return res.status(409).send("Email is already exist!");
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
    .send({ message: "Successfull created!", data: dataCreate });
});

/**
 * * User Login
 * * <url>/user/login
 */
userRoute.post("/login", async (req: Request, res: Response) => {
  const userInput: User = req.body;

  const checkDataExist = await prisma.user.findFirst({
    where: { email: userInput.email, password: userInput.password },
  });

  if (checkDataExist) {
    return res.status(202).send({
      message: "Successfull created!",
      user: {
        id: checkDataExist.id,
        name: checkDataExist.name,
        email: checkDataExist.email,
      },
    });
  }

  return res.status(404).send({ message: "Invalid email/password!" });
});
