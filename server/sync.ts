import { sequelize } from "./models/connection";
import "./models";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

sequelize.sync({ force: true }).then((res) => {
  console.log(res);
});

//comando: ts-node ./server/sync.ts
