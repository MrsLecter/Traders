import { Request, Response, NextFunction } from "express";
import { Orders, Products } from "../models/mainModels";
import { writeLog } from "../loggers/loggers";
import { sequelize } from "../database/dbInit";

import {
  QUERY_ORDERS_PAGE,
  QUERY_DEFINED_ORDER,
  QUERY_DEFINED_PRODUCT,
} from "../constants";

export const ordersPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await Orders.sync({ alter: true });
    let sqlReq = "";
    const start = performance.now();
    const [orders] = await sequelize.query(QUERY_ORDERS_PAGE, {
      logging: (sql) => {
        sqlReq += sql;
      },
      raw: true,
    });
    const end = performance.now();
    writeLog(sqlReq, end - start);
    res.status(200).render("./pages/orders", { data: orders });
  } catch (err) {
    sequelize.close();
    const error = new Error((err as Error).message);
    return next(error);
  }
};

export const orderPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const orderid = req.params["orderid"];
  try {
    await Orders.sync({ alter: true });
    await Products.sync({ alter: true });
    let sqlReq = "";
    const start = performance.now();
    const [orders] = await sequelize.query(QUERY_DEFINED_ORDER(orderid), {
      logging: (sql) => {
        sqlReq += sql;
      },
      raw: true,
    });
    const end = performance.now();
    writeLog(sqlReq, end - start);

    let sqlReq2 = "";
    const start2 = performance.now();
    const [products] = await sequelize.query(QUERY_DEFINED_PRODUCT(orderid), {
      logging: (sql) => {
        sqlReq2 += sql;
      },
      raw: true,
    });
    const end2 = performance.now();
    writeLog(sqlReq2, end2 - start2);
    res.status(200).render("./pages/definedOrder", {
      data: orders[0],
      dataProducts: products,
    });
  } catch (err) {
    sequelize.close();
    const error = new Error((err as Error).message);
    return next(error);
  }
};
