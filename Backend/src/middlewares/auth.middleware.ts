import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { encrypt } from "../helpers/encrypt";

const { AUTH_SECRET } = process.env;

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decode = await encrypt.comparepassword(AUTH_SECRET!, token);
  if (!decode) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};
