import { DataTypes, Sequelize, ModelStatic } from "sequelize";
require("dotenv").config();
import { SuppliesInterface } from "../../interfaces/interfaces";

module.exports = (sequelize: Sequelize): ModelStatic<SuppliesInterface> =>
  sequelize.define<SuppliesInterface>(
    "supplies",
    {
      supplierid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      companyname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contacttitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      region: {
        type: DataTypes.STRING,
      },
      postalcode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fax: {
        type: DataTypes.STRING,
      },
      homepage: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
      tableName: "supplies",
    },
  );
