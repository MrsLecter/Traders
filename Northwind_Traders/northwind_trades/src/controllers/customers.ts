import { Request, Response, NextFunction } from "express";
import { writeLog } from "../loggers/loggers";
import { sequelize } from "../sequelize";
import { modelDefiners } from "../sequelize/index";

export const customersPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await modelDefiners.customers.sync({ alter: true });
    let sqlReq = "";
    const start = performance.now();
    const customers = await modelDefiners.customers.findAll({
      logging: (sql: string) => {
        sqlReq += sql;
      },
    });
    const end = performance.now();
    writeLog(sqlReq, end - start);
    res.status(200).render("./pages/customers", { data: customers });
  } catch (err) {
    sequelize.close();
    const error = new Error((err as Error).message);
    return next(error);
  }
};

export const customerPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const customerid = req.params["customerid"];
  try {
    await modelDefiners.customers.sync({ alter: true });
    let sqlReq = "";
    const start = performance.now();
    const customer = await modelDefiners.customers.findOne({
      logging: (sql: string) => {
        sqlReq += sql;
      },
      where: { customerid: customerid },
    });
    const end = performance.now();
    writeLog(sqlReq, end - start);
    res.status(200).render("./pages/definedCustomer", { data: customer });
  } catch (err) {
    sequelize.close();
    const error = new Error((err as Error).message);
    return next(error);
  }
};
