import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import createError from "http-errors";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// * Routes
app.use("/user", routes);
app.use("/film", routes);

// ! Error 404 Handler
app.use((req: Request, res: Response, next: Function) => {
  next(createError(404));
});

// * Listen Port
app.listen(3431, () =>
  console.log(`⚡️[server]: Server is running at http://localhost:3431`)
);
