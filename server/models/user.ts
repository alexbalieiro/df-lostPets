import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";
export class User extends Model {}
User.init(
  {
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  { sequelize, modelName: "user" }
);
