import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import InitiateMongoServer from "./db";
import { PORT, WEB_URL } from "./config";
import userRouter from "./routes/user";
import stripeRouter from "./routes/stripe";
import { rateLimit } from "express-rate-limit";
import chatRoutes from "./routes/chat";
import chatroomRoutes from "./routes/chatroom";

const limiter = rateLimit({
  windowMs: 1000,
  limit: 6,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

InitiateMongoServer();

const app: Express = express();
const port = PORT || 5000;

app.use(
  cors({
    origin: [WEB_URL || "http://localhost:5173"],
  })
);

app.set("trust proxy", "loopback, linklocal, uniquelocal");
app.use(limiter);

app.use("/stripe", stripeRouter);

app.use(express.json({ limit: "1mb" }));

app.use("/user", userRouter);
app.use("/chat", chatRoutes);
app.use("/chatroom", chatroomRoutes);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  const error = {
    status: 404,
    message: "Api endpoint does not found",
  };
  next(error);
});

app.listen(port, () => {
  console.log(`${port}`);
});
