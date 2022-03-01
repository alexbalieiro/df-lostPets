import * as express from "express";
import * as path from "path";
import { getProfiles } from "./controllers/users-controller";
const staticDirPath = path.resolve(__dirname, "../client");
(function () {
  const port = process.env.PORT || 3000;
  const app = express();
  app.use(
    express.json({
      limit: "50mb",
    })
  );

  app.post("/test", async (req, res) => {
    const profile = await getProfiles(4);
    res.json(profile);
  });

  app.use(express.static(staticDirPath));

  app.get("*", function (req, res) {
    res.sendFile(staticDirPath);
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
