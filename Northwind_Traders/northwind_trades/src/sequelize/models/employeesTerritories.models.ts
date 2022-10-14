import { DataTypes, Sequelize } from "sequelize";
require("dotenv").config();
import { EmployeesTerritoriesInterface } from "../../interfaces/interfaces";

module.exports = (sequelize: Sequelize) =>
  sequelize.define<EmployeesTerritoriesInterface>(
    "employeeterritories",
    {
      employeeid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      territoryid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "territories",
          key: "territoryid",
        },
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
      tableName: "employeeterritories",
    },
  );
