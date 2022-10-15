import { DataTypes, Sequelize, ModelStatic } from "sequelize";
require("dotenv").config();
import { EmployeesTerritoriesInterface } from "../../interfaces/interfaces";

module.exports = (
  sequelize: Sequelize,
): ModelStatic<EmployeesTerritoriesInterface> =>
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
