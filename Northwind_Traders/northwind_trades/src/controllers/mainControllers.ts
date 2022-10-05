import { Request, Response, NextFunction } from "express";
import {
  Orders,
  Products,
  Employees,
  Customers,
  Supplies,
} from "../models/mainModels";
import { writeLog, readSqlLogs } from "../utils/utils";
import { sequelize } from "../utils/dbConnect";
const { Op } = require("sequelize");

export const startPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(200).render("./pages/homePage");
};

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
    console.log("Error", err);
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

    if (employee === null) {
      console.log("Not found!");
    } else {
      const reportsTo = await Employees.findOne({
        where: { employeeid: employee.reportsto },
      });
      const end = performance.now();
      writeLog(sqlReq, end - start);
      res
        .status(200)
        .render("./pages/definedEmployee", { data: employee, link: reportsTo });
    }
  } catch (err) {
    sequelize.close();
    console.log("Error", err);
  }
};

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
    console.log("Error", err);
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
    console.log("Error", err);
  }
};

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
    console.log("Error", err);
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
      where: { supplierid: product.supplierid },
    });
    const end2 = performance.now();
    writeLog(sqlReq2, end2 - start2);
    res.status(200).render("./pages/definedProduct", {
      data: product,
      supplier: supplier,
    });
  } catch (err) {
    sequelize.close();
    console.log("Error", err);
  }
};

export const ordersPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await Orders.sync({ alter: true });
    let sqlReq = "";
    const start = performance.now();
    const [orders, meta] = await sequelize.query(
      "select orders.orderid ,count(orders.orderid) as products, SUM(orderdetails.quantity * orderdetails.unitprice) as totalprice, SUM(orderdetails.quantity) as quantity, orders.shippeddate, orders.shipname, orders.shipcity, orders.shipcountry  from orders left join orderdetails  on orders.orderid = orderdetails.orderid left join shippers on orders.shipvia=shippers.shipperid group by (orders.orderid) ORDER BY orders.orderid ASC;",
      {
        logging: (sql) => {
          sqlReq += sql;
        },
        raw: true,
      },
    );
    const end = performance.now();
    writeLog(sqlReq, end - start);
    res.status(200).render("./pages/orders", { data: orders });
  } catch (err) {
    sequelize.close();
    console.log("Error", err);
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
    const [orders, meta] = await sequelize.query(
      `select orders.customerid ,orders.shipname, count(orders.orderid) as totalproducts, SUM(orderdetails.quantity) as totalquantity, SUM(orderdetails.quantity * orderdetails.unitprice) as totalprice, SUM(orderdetails.quantity * orderdetails.discount) as totaldiscount, orders.shipvia, orders.freight, orders.orderdate, orders.shippeddate, orders.shipcity, orders.shipregion, orders.shippostalcode, orders.shipcountry from orders left join orderdetails on orders.orderid = orderdetails.orderid left join shippers on orders.shipvia=shippers.shipperid where orders.orderid = ${orderid} group by (orders.orderid) ORDER BY orders.orderid ASC;`,
      {
        logging: (sql) => {
          sqlReq += sql;
        },
        raw: true,
      },
    );
    const end = performance.now();
    writeLog(sqlReq, end - start);

    let sqlReq2 = "";
    const start2 = performance.now();
    const [products, metaProducts] = await sequelize.query(
      `select orderdetails.productid, products.productname, orderdetails.quantity, orderdetails.unitprice as orderprice, (orderdetails.unitprice * orderdetails.quantity) as totalprice, (orderdetails.discount * orderdetails.quantity) as discount from orderdetails left join products on orderdetails.productid = products.productid where orderdetails.orderid = ${orderid};`,
      {
        logging: (sql) => {
          sqlReq2 += sql;
        },
        raw: true,
      },
    );
    const end2 = performance.now();
    writeLog(sqlReq2, end2 - start2);
    res.status(200).render("./pages/definedOrder", {
      data: orders[0],
      dataProducts: products,
    });
  } catch (err) {
    sequelize.close();
    console.log("Error", err);
  }
};

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
    console.log("Error", err);
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
    console.log("Error", err);
  }
};

export const searchPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const table = req.query.table;
  const searchParam = req.query.parametr;
  console.log(
    "req param",
    req.query,
    "table",
    table,
    "searchparam",
    searchParam,
  );
  if (table === "products") {
    try {
      await Products.sync({ alter: true });
      let sqlReq1 = "";
      const start1 = performance.now();
      const products = await Products.findOne({
        logging: (sql) => {
          sqlReq1 += sql;
        },
        where: { productname: searchParam },
      });
      const end1 = performance.now();
      writeLog(sqlReq1, end1 - start1);
      console.log("products", products);
      res.status(200).render("./pages/search", { data: products, table });
    } catch (err) {
      sequelize.close();
      console.log("Error", err);
    }
  }
  if (table === "customers") {
    try {
      await Customers.sync({ alter: true });
      let sqlReq = "";
      const start = performance.now();
      const customers = await Customers.findOne({
        logging: (sql) => {
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
      console.log("customers", customers);
      res.status(200).render("./pages/search", { data: customers, table });
    } catch (err) {
      sequelize.close();
      console.log("Error", err);
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
      const selectCount = logs.split("SELECT").length - 1;
      const whereCount = logs.split("WHERE").length - 1;
      const joinCount = logs.split("JOIN").length - 1;
      let logsArr = logs.split(";\n");
      logsArr.pop();
      const queryCount = logsArr.length;

      res.status(200).render("./pages/dashboard", {
        data: logsArr,
        count: queryCount,
        selectCount,
        whereCount,
        joinCount,
      });
    })
    .catch((err) => {
      throw Error((err as Error).message);
    });
};
