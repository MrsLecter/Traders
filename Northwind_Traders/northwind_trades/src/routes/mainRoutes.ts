import { Router } from "express";
import {
  startPage,
  employeesPage,
  employeePage,
  customersPage,
  customerPage,
  productsPage,
  productPage,
  ordersPage,
  orderPage,
  suppliersPage,
  supplierPage,
  searchPage,
  dashboardPage,
} from "../controllers/mainControllers";

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
