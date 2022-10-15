import { DataTypes, Sequelize, ModelStatic } from "sequelize";
require("dotenv").config();
import { ShippersInterface } from "../../interfaces/interfaces";

module.exports = (sequelize: Sequelize): ModelStatic<ShippersInterface> =>
  sequelize.define<ShippersInterface>(
    "shippers",
    {
      shipperid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      companyname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
      tableName: "shippers",
    },
  );
