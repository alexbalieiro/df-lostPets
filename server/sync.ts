import { sequelize } from "./models/connection";
import "./models";

sequelize.sync({ force: true }).then((res) => {
  console.log(res);
});

//comando: ts-node ./server/sync.ts
