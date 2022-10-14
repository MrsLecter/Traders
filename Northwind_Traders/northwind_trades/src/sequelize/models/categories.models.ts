import { DataTypes, Sequelize } from "sequelize";
require("dotenv").config();
import { CategoriesInterface } from "../../interfaces/interfaces";

module.exports = (sequelize: Sequelize) =>
  sequelize.define<CategoriesInterface>(
    "categories",
    {
      categoryid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      categoryname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
      tableName: "categories",
    },
  );
