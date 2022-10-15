require("dotenv").config();
import express from "express";
import type { ErrorRequestHandler } from "express";
import { get404 } from "./error/errors";
import helmet from "helmet";
import { json } from "body-parser";
import morgan from "morgan";
import { createWriteStream } from "fs";
import path from "path";
import mainRouts from "./routes/mainRoutes";
import { sequelize } from "./sequelize/index";

const PORT = parseInt(process.env.PORT) || 3000;
const app = express();

app.set("view engine", "ejs");
app.use(json());
app.use(helmet());

const logStream = createWriteStream(
  path.join(__dirname, "../logs/logStream.log"),
  {
    flags: "a",
  },
);
app.use(morgan("combined", { stream: logStream }));

app.use(mainRouts);
app.use(get404);
const errHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).json({ message: "Internal Server Error" });
};

app.use(errHandler);

const assertDatabaseConnectionOk = async (): Promise<void> => {
  console.info(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.info("Database connection OK!");
  } catch (error) {
    console.error("Unable to connect to the database:");
    console.log((error as Error).message);
    process.exit(1);
  }
};

(async (): Promise<void> => {
  await assertDatabaseConnectionOk();
  app.listen(PORT, () => {
    console.info(`Express server started on port ${PORT}`);
  });
})();
