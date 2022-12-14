import fs from "fs";
import path from "path";

export const writeLog = (req: string, time: number): void => {
  const date = new Date().toISOString();
  const obj = `${date};,${req},${time}`;
  fs.appendFile(
    path.join(__dirname, "../../logs/sqlRequests.log"),
    obj + ";\n",
    (error) => {
      if (error) throw error;
    },
  );
};
