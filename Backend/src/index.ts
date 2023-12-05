import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import helmet from "helmet";
import { errorHandler } from "./middlewares/error.middleware";
import { filmRoute } from "./routes/film.routes";
import { scheduleRoute } from "./routes/schedule.routes";
import { studioRoute } from "./routes/studio.routes";
import { theaterRoute } from "./routes/theater.routes";
import { userRoute } from "./routes/user.routes";

const app = express();
const { PORT } = process.env;

// * Main Config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(helmet());
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// * Routes
app.use(errorHandler);
app.use("/film", filmRoute);
app.use("/schedule", scheduleRoute);
app.use("/studio", studioRoute);
app.use("/theater", theaterRoute);
app.use("/user", userRoute);

// ! Error 404 Handler
app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

// * Listen Port
app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
);
