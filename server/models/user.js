"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("./connection");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    username: sequelize_1.DataTypes.STRING,
    bio: sequelize_1.DataTypes.STRING,
    pictureURL: sequelize_1.DataTypes.STRING,
}, { sequelize: connection_1.sequelize, modelName: "user" });
