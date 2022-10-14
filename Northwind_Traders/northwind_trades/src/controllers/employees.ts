import { Request, Response, NextFunction } from "express";
import { writeLog } from "../loggers/logger";
import { sequelize } from "../sequelize";
import { modelDefiners } from "../sequelize/index";

export const employeesPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await modelDefiners.employees.sync({ alter: true });
    let sqlReq = "";
    const start = performance.now();
    const employees = await modelDefiners.employees.findAll({
      logging: (sql: string) => {
        sqlReq += sql;
      },
    });
    const end = performance.now();
    writeLog(sqlReq, end - start);
    res.status(200).render("./pages/employees", { data: employees });
  } catch (err) {
    sequelize.close();
    const error = new Error((err as Error).message);
    return next(error);
  }
};

export const employeePage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const employeeid = req.params["employeeid"];
  let sqlReq = "";
  const start = performance.now();
  try {
    await modelDefiners.employees.sync({ alter: true });
    const employee = await modelDefiners.employees.findOne({
      logging: (sql: string) => {
        sqlReq += sql;
      },
      where: { employeeid: employeeid },
    });

    const reportsTo = await modelDefiners.employees.findOne({
      where: { employeeid: employee?.reportsto },
    });
    const end = performance.now();
    writeLog(sqlReq, end - start);
    res
      .status(200)
      .render("./pages/definedEmployee", { data: employee, link: reportsTo });
  } catch (err) {
    sequelize.close();
    const error = new Error((err as Error).message);
    return next(error);
  }
};
