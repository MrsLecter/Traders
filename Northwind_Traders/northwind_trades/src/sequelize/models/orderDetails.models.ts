import { DataTypes, Sequelize, ModelStatic } from "sequelize";
require("dotenv").config();
import { OrderDetailsInterface } from "../../interfaces/interfaces";

module.exports = (sequelize: Sequelize): ModelStatic<OrderDetailsInterface> =>
  sequelize.define<OrderDetailsInterface>(
    "orderdetails",
    {
      orderid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        references: {
          model: "orders",
          key: "orderid",
        },
      },
      productid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "products",
          key: "productid",
        },
      },
      unitprice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
      tableName: "orderdetails",
    },
  );
