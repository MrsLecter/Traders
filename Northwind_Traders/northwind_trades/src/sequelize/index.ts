import { Sequelize, ModelStatic } from "sequelize";
import { applyExtraSetup } from "./relations";
import { modelDefinersInterface } from "../interfaces/interfaces";
require("dotenv").config();
const sequelize = new Sequelize(process.env.DB_URL, {
  logging: (...msg) => console.log(msg),
});

const modelDefiners: modelDefinersInterface = {
  categories: require("./models/categories.models")(sequelize),
  customers: require("./models/customers.models")(sequelize),
  employees: require("./models/employees.models")(sequelize),
  employeesterritories: require("./models/employeesTerritories.models")(
    sequelize,
  ),
  orderdetails: require("./models/orderDetails.models")(sequelize),
  orders: require("./models/orders.models")(sequelize),
  products: require("./models/products.models")(sequelize),
  regions: require("./models/regions.models")(sequelize),
  shippers: require("./models/shippers.models")(sequelize),
  suppliers: require("./models/suppliers.models")(sequelize),
  territiries: require("./models/territories.models")(sequelize),
};

applyExtraSetup(sequelize);

export { sequelize, modelDefiners };
