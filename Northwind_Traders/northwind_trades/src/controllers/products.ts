import { Request, Response, NextFunction } from "express";
import { writeLog } from "../loggers/loggers";
import { sequelize } from "../sequelize";
import { modelDefiners } from "../sequelize/index";

export const productsPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await modelDefiners.products.sync({ alter: true });
    let sqlReq = "";
    const start = performance.now();
    const products = await modelDefiners.products.findAll({
      logging: (sql: string) => {
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
    await modelDefiners.products.sync({ alter: true });
    let sqlReq1 = "";
    const start1 = performance.now();
    const product = await modelDefiners.products.findOne({
      logging: (sql: string) => {
        sqlReq1 += sql;
      },
      where: { productid: productid },
    });
    const end1 = performance.now();
    writeLog(sqlReq1, end1 - start1);

    let sqlReq2 = "";
    const start2 = performance.now();
    const supplier = await modelDefiners.suppliers.findOne({
      logging: (sql: string) => {
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
