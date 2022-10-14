import { DataTypes, Sequelize } from "sequelize";
require("dotenv").config();
import { ProductsInterface } from "../../interfaces/interfaces";

module.exports = (sequelize: Sequelize) =>
  sequelize.define<ProductsInterface>(
    "products",
    {
      productid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      productname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      supplierid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "supplies",
          key: "supplierid",
        },
      },
      categoryid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
          key: "categoryid",
        },
      },
      quantityperunit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      unitprice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      unitinstock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unitsonorder: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reorderlevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discontinued: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
      tableName: "products",
    },
  );
