import { DataTypes, Sequelize } from "sequelize";
require("dotenv").config();
import { RegionsInterface } from "../../interfaces/interfaces";

module.exports = (sequelize: Sequelize) =>
  sequelize.define<RegionsInterface>(
    "regions",
    {
      regionid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      regiondescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
      tableName: "regions",
    },
  );
