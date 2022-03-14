import { Sequelize } from "sequelize";
import "dotenv/config";
export const sequelize = new Sequelize({
  dialect: "postgres",
  username: process.env.SEQUELIZE_USERNAME,
  password: process.env.SEQUELIZE_PASSWORD,
  database: process.env.SEQUELIZE_DATABASE,
  port: 5432,
  host: process.env.SEQUELIZE_HOST,
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
