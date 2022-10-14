import { Router } from "express";
import {
  startPage,
  searchPage,
  dashboardPage,
} from "../controllers/mainControllers";
import { employeesPage, employeePage } from "../controllers/employees";
import { customersPage, customerPage } from "../controllers/customers";
import { productsPage, productPage } from "../controllers/products";
import { ordersPage, orderPage } from "../controllers/orders";
import { suppliersPage, supplierPage } from "../controllers/suppliers";

const router = Router();

router.get("/", startPage);

router.get("/employees", employeesPage);
router.get("/employees/:employeeid", employeePage);

router.get("/customers", customersPage);
router.get("/customers/:customerid", customerPage);

router.get("/products", productsPage);
router.get("/products/:productid", productPage);

router.get("/orders", ordersPage);
router.get("/orders/:orderid", orderPage);

router.get("/suppliers", suppliersPage);
router.get("/suppliers/:supplierid", supplierPage);

router.get("/search", searchPage);

router.get("/dashboard", dashboardPage);

export default router;
