"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./models/connection");
require("./models");
connection_1.sequelize.sync({ force: true }).then((res) => {
    console.log(res);
});
//comando: ts-node ./be-src/sync.ts
