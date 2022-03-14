import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";
export class Pet extends Model {}
Pet.init(
  {
    name: DataTypes.STRING,
    img: DataTypes.STRING,
    last_lat: DataTypes.FLOAT,
    last_lng: DataTypes.FLOAT,
    state: DataTypes.STRING,
  },
  { sequelize, modelName: "pet" }
);
