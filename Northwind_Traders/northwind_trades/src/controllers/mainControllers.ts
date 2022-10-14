import { Request, Response, NextFunction } from "express";
import { sequelize } from "../sequelize";
import { writeLog } from "../loggers/loggers";
import { readSqlLogs } from "../utils/utils";
import { Op } from "sequelize";
import { CustomersType } from "../types/types";
import { modelDefiners } from "../sequelize/index";

export const startPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(200).render("./pages/homePage");
};

export const searchPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const table = req.query.table as string;
  const searchParam = req.query.parametr as string;

  if (table === "products") {
    try {
      if (!searchParam) throw new Error("Empty search string");
      await modelDefiners.products.sync({ alter: true });
      let sqlReq1 = "";
      const start1 = performance.now();
      const product = await modelDefiners.products.findOne({
        logging: (sql: string) => {
          sqlReq1 += sql;
        },
        where: { productname: searchParam },
      });
      const end1 = performance.now();
      writeLog(sqlReq1, end1 - start1);
      if (product) {
        res.status(200).render("./pages/search", { data: product, table });
      }
    } catch (err) {
      sequelize.close();
      const error = new Error((err as Error).message);
      return next(error);
    }
  }
  if (table === "customers") {
    try {
      if (!searchParam) throw new Error("Empty search string");
      await modelDefiners.customers.sync({ alter: true });
      let sqlReq = "";
      const start = performance.now();
      const customers: CustomersType[] = await modelDefiners.customers.findAll({
        logging: (sql: string) => {
          sqlReq += sql;
        },
        where: {
          [Op.or]: [
            {
              companyname: searchParam,
            },
            {
              contactname: searchParam,
            },
            {
              contacttitle: searchParam,
            },
          ],
        },
      });
      const end = performance.now();
      writeLog(sqlReq, end - start);
      if (customers) {
        res.status(200).render("./pages/search", {
          data: customers,
          table,
        });
      }
    } catch (err) {
      sequelize.close();
      const error = new Error((err as Error).message);
      return next(error);
    }
  }
  res.status(200).render("./pages/search");
};

export const dashboardPage = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  readSqlLogs()
    .then((logs) => {
      let selectCount = logs.split("SELECT").length - 1;
      const whereCount = logs.split("WHERE").length - 1;
      const joinCount = logs.split("LEFT JOIN").length - 1;
      const logsArr = logs.split(";\n");
      logsArr.pop();
      const queryCount = logsArr.length;
      selectCount = selectCount - joinCount;

      res.status(200).render("./pages/dashboard", {
        data: logsArr,
        count: queryCount,
        selectCount,
        whereCount,
        joinCount,
      });
    })
    .catch((err) => {
      const error = new Error((err as Error).message);
      return next(error);
    });
};
