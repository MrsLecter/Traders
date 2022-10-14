import { DataTypes, Sequelize } from "sequelize";
require("dotenv").config();
import { CustomersInterface } from "../../interfaces/interfaces";

module.exports = (sequelize: Sequelize) =>
  sequelize.define<CustomersInterface>(
    "customers",
    {
      customerid: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      companyname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactname: {
        type: DataTypes.STRING,
      },
      contacttitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      Region: {
        type: DataTypes.STRING,
      },
      postalcode: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      fax: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
      tableName: "customers",
    },
  );
