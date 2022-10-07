require("dotenv").config();
import express from "express";
import type { ErrorRequestHandler } from "express";
import { get404 } from "./controllers/errors";
import helmet from "helmet";
import { json } from "body-parser";
import morgan from "morgan";
import fs from "fs";
import path from "path";

import mainRouts from "./routes/mainRoutes";

const PORT = process.env.PORT;
const app = express();

app.set("view engine", "ejs");
app.use(json());
app.use(helmet());

const logStream = fs.createWriteStream(path.join(__dirname, "logs.log"), {
  flags: "a",
});
app.use(morgan("combined", { stream: logStream }));

app.use(mainRouts);
app.use(get404);
app.use(express.static(path.join(__dirname, "/dist/utils/searchScript.js")));
const errHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).json({ message: "Internal Server Error" });
};

app.use(errHandler);

try {
  app.listen(PORT || 3000);
  console.log(`Server is running on port ${PORT}`);
} catch (e) {
  console.log(e);
  throw new Error("An error occured");
}
