import { DataTypes, Sequelize } from "sequelize";
require("dotenv").config();
import { OrdersInterface } from "../../interfaces/interfaces";

module.exports = (sequelize: Sequelize) =>
  sequelize.define<OrdersInterface>(
    "orders",
    {
      orderid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "orderid",
      },
      customerid: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "customers",
          key: "customerid",
        },
      },
      employeeid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "employees",
          key: "employeeid",
        },
      },
      orderdate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      requiredate: {
        type: DataTypes.DATE,
      },
      shippeddate: {
        type: DataTypes.DATE,
      },
      shipvia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "shippers",
          key: "shipperid",
        },
      },
      freight: {
        type: DataTypes.FLOAT,
      },
      shipname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shipaddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shipcity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shipregion: {
        type: DataTypes.STRING,
      },
      shippostalcode: {
        type: DataTypes.STRING,
      },
      shipcountry: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
      tableName: "orders",
    },
  );
