import { DataTypes, Sequelize, ModelStatic } from "sequelize";
require("dotenv").config();
import { RegionsInterface } from "../../interfaces/interfaces";

module.exports = (sequelize: Sequelize): ModelStatic<RegionsInterface> =>
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
