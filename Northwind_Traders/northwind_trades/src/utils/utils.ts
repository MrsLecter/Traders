import { readFileSync } from "fs";
import path from "path";

export const readSqlLogs = async (): Promise<string> =>
  readFileSync(path.join(__dirname, "../../logs/sqlRequests.log"), "utf8");
