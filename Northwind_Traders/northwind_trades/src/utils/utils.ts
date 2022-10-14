import fs from "fs";
import path from "path";

export const readSqlLogs = async (): Promise<string> => {
  return fs.readFileSync(
    path.join(__dirname, "../../logs/sqlRequests.log"),
    "utf8",
  );
};
