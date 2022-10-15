import { Request, Response, NextFunction } from "express";
import { writeLog } from "../loggers/logger";
import { modelDefiners } from "../sequelize/index";

export const suppliersPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await modelDefiners.suppliers.sync({ alter: true });
    let sqlReq = "";
    const start = performance.now();
    const suppliers = await modelDefiners.suppliers.findAll({
      logging: (sql: string) => {
        sqlReq += sql;
      },
    });
    const end = performance.now();
    writeLog(sqlReq, end - start);
    res.status(200).render("./pages/suppliers", { data: suppliers });
  } catch (err: any) {
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
    await modelDefiners.suppliers.sync({ alter: true });
    let sqlReq = "";
    const start = performance.now();
    const supplier = await modelDefiners.suppliers.findOne({
      logging: (sql: string) => {
        sqlReq += sql;
      },
      where: { supplierid: supplierid },
    });
    const end = performance.now();
    writeLog(sqlReq, end - start);
    res.status(200).render("./pages/definedSupplier", { data: supplier });
  } catch (err: any) {
    const error = new Error((err as Error).message);
    return next(error);
  }
};
