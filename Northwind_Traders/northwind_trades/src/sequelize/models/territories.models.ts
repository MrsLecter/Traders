import { DataTypes, Sequelize } from "sequelize";
require("dotenv").config();
import { TerritoriesInterface } from "../../interfaces/interfaces";

module.exports = (sequelize: Sequelize) =>
  sequelize.define<TerritoriesInterface>(
    "territories",
    {
      territoryid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      territorydescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      regionid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "regions",
          key: "regionid",
        },
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
      tableName: "territories",
    },
  );
