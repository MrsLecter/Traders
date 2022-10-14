import { Request, Response, NextFunction } from "express";
import { Supplies } from "../models/mainModels";
import { writeLog } from "../loggers/loggers";
import { sequelize } from "../database/dbInit";

export const suppliersPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await Supplies.sync({ alter: true });
    let sqlReq = "";
    const start = performance.now();
    const suppliers = await Supplies.findAll({
      logging: (sql) => {
        sqlReq += sql;
      },
    });
    const end = performance.now();
    writeLog(sqlReq, end - start);
    res.status(200).render("./pages/suppliers", { data: suppliers });
  } catch (err) {
    sequelize.close();
    const error = new Error((err as Error).message);
    return next(error);
  }
};

export const supplierPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const supplierid = req.params["supplierid"];
  try {
    await Supplies.sync({ alter: true });
    let sqlReq = "";
    const start = performance.now();
    const supplier = await Supplies.findOne({
      logging: (sql) => {
        sqlReq += sql;
      },
      where: { supplierid: supplierid },
    });
    const end = performance.now();
    writeLog(sqlReq, end - start);
    res.status(200).render("./pages/definedSupplier", { data: supplier });
  } catch (err) {
    sequelize.close();
    const error = new Error((err as Error).message);
    return next(error);
  }
};
