import { Sequelize } from "sequelize";
import "dotenv/config";
export const sequelize = new Sequelize(process.env.ELEPHANT_CONNECTION);
