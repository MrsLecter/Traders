import type { Sequelize } from "sequelize";

export function applyExtraSetup(sequelize: Sequelize) {
  const { orderdetails, orders, products, shippers, supplies } =
    sequelize.models;

  orderdetails.hasOne(orders, { foreignKey: "orderid" });
  orders.belongsTo(orderdetails, {
    foreignKey: "orderid",
  });

  orderdetails.hasOne(products, { foreignKey: "productid" });
  orderdetails.belongsTo(products, {
    foreignKey: "productid",
  });

  orders.hasOne(shippers, { foreignKey: "shipvia" });
  orders.belongsTo(shippers, {
    foreignKey: "shipvia",
  });

  orderdetails.hasOne(products, { foreignKey: "productid" });
  orderdetails.belongsTo(products, {
    foreignKey: "productid",
  });

  supplies.hasOne(products, { foreignKey: "supplierid" });
  supplies.belongsTo(products, {
    foreignKey: "supplierid",
  });
}

module.exports = { applyExtraSetup };
