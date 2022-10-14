import { Request, Response, NextFunction } from "express";
import { Products, Supplies } from "../models/mainModels";
import { writeLog } from "../loggers/loggers";
import { sequelize } from "../database/dbInit";

export const productsPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await Products.sync({ alter: true });
    let sqlReq = "";
    const start = performance.now();
    const products = await Products.findAll({
      logging: (sql) => {
        sqlReq += sql;
      },
    });
    const end = performance.now();
    writeLog(sqlReq, end - start);
    res.status(200).render("./pages/products", { data: products });
  } catch (err) {
    sequelize.close();
    const error = new Error((err as Error).message);
    return next(error);
  }
};

export const productPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const productid = req.params["productid"];
  try {
    await Products.sync({ alter: true });
    let sqlReq1 = "";
    const start1 = performance.now();
    const product = await Products.findOne({
      logging: (sql) => {
        sqlReq1 += sql;
      },
      where: { productid: productid },
    });
    const end1 = performance.now();
    writeLog(sqlReq1, end1 - start1);

    let sqlReq2 = "";
    const start2 = performance.now();
    const supplier = await Supplies.findOne({
      logging: (sql) => {
        sqlReq2 += sql;
      },
      where: { supplierid: product?.supplierid },
    });
    const end2 = performance.now();
    writeLog(sqlReq2, end2 - start2);
    res.status(200).render("./pages/definedProduct", {
      data: product,
      supplier: supplier,
    });
  } catch (err) {
    sequelize.close();
    const error = new Error((err as Error).message);
    return next(error);
  }
};
