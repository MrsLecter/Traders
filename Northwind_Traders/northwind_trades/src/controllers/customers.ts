import { Request, Response, NextFunction } from "express";
import { Customers } from "../models/mainModels";
import { writeLog } from "../loggers/loggers";
import { sequelize } from "../database/dbInit";

export const customersPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await Customers.sync({ alter: true });
    let sqlReq = "";
    const start = performance.now();
    const customers = await Customers.findAll({
      logging: (sql) => {
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
    await Customers.sync({ alter: true });
    let sqlReq = "";
    const start = performance.now();
    const customer = await Customers.findOne({
      logging: (sql) => {
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
