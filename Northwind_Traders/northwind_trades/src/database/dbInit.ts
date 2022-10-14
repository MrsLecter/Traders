import { Sequelize } from "sequelize";
require("dotenv").config();
export const sequelize = new Sequelize(process.env.DB_URL, {
  logging: (...msg) => console.log(msg),
});

const test = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    sequelize.close();
    console.error("Unable to connect to the database:", error);
  }
};
