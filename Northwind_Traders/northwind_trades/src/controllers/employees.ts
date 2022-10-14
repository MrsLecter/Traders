import { Request, Response, NextFunction } from "express";
import { Employees } from "../models/mainModels";
import { writeLog } from "../loggers/loggers";
import { sequelize } from "../database/dbInit";

export const employeesPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await Employees.sync({ alter: true });
    let sqlReq = "";
    const start = performance.now();
    const employees = await Employees.findAll({
      logging: (sql) => {
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
    await Employees.sync({ alter: true });
    const employee = await Employees.findOne({
      logging: (sql) => {
        sqlReq += sql;
      },
      where: { employeeid: employeeid },
    });

    const reportsTo = await Employees.findOne({
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
