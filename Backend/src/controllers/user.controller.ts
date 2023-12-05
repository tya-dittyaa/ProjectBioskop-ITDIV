import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import { encrypt } from "../helpers/encrypt";

const prisma = new PrismaClient();

export class UserController {
  // * Register / Signup
  static async register(req: Request, res: Response) {
    const userInput: User = req.body;

    // ! Req Body is Missing
    if (!userInput.name || !userInput.email || !userInput.password) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    // * Find Unique Email
    const getData = await prisma.user.findUnique({
      where: { email: userInput.email },
    });

    // * If email exist
    if (getData) {
      return res.status(409).json({ message: "Email is already exist" });
    }

    // * Create database
    const dataCreate = await prisma.user.create({
      data: {
        name: userInput.name,
        email: userInput.email,
        password: await encrypt.encryptpass(userInput.password),
      },
      select: { id: true, name: true, email: true, role: true },
    });

    // * Return response success
    return res
      .status(201)
      .json({ message: "User created successfully", data: dataCreate });
  }

  // * Login / Signin
  static async login(req: Request, res: Response) {
    const userInput: User = req.body;

    // ! Req Body is Missing
    if (!userInput.email || !userInput.password) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    // * Find unique email
    const getData = await prisma.user.findUnique({
      where: { email: userInput.email },
    });

    // * If email not exist
    if (!getData) {
      return res.status(404).json({ message: "User not found" });
    }

    // * Check the hashing password
    const checking = await encrypt.comparepassword(
      getData.password,
      userInput.password
    );

    // ! invalid password
    if (!checking) {
      return res.status(409).json({ message: "Invalid credential" });
    }

    return res.status(202).json({
      message: "Login successful",
      user: {
        id: getData.id,
        name: getData.name,
        email: getData.email,
        role: getData.role,
      },
    });
  }
}
