import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import helmet from "helmet";
import { errorHandler } from "./middlewares/error.middleware";
import { scheduleRefresh } from "./middlewares/scheduleRefresh.middleware";
import { filmRoute } from "./routes/film.routes";
import { paymentRoute } from "./routes/payment.routes";
import { scheduleRoute } from "./routes/schedule.routes";
import { seatRoute } from "./routes/seat.routes";
import { studioRoute } from "./routes/studio.routes";
import { theaterRoute } from "./routes/theater.routes";
import { transactionRoute } from "./routes/transaction.routes";
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
app.use(scheduleRefresh);
app.use(errorHandler);
app.use("/film", filmRoute);
app.use("/payment", paymentRoute);
app.use("/schedule", scheduleRoute);
app.use("/seat", seatRoute);
app.use("/studio", studioRoute);
app.use("/theater", theaterRoute);
app.use("/transaction", transactionRoute);
app.use("/user", userRoute);

// ! Error 404 Handler
app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

// * Listen Port
app.listen(PORT, async () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
