"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize({
    dialect: "postgres",
    username: "vslsegafvmmmix",
    password: "3c907096da10c591366f339355188cec752f4b231cd60f76d12420b33a687fcf",
    database: "d5q0pckev020ir",
    port: 5432,
    host: "ec2-3-222-49-168.compute-1.amazonaws.com",
    ssl: true,
    // esto es necesario para que corra correctamente
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});
// try {
//   await sequelize.authenticate();
//   console.log(
//     "Connection has been established successfully. / La conexión se ha establecido con éxito"
//   );
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }
