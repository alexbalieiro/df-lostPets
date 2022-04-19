import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import {
  allAuth,
  authMiddleware,
  createUser,
  getToken,
  updateUser,
} from "./controllers/auth-controller";
import { searchUser, findUser, allUser } from "./controllers/users-controller";
import {
  createPet,
  searchPets,
  updatePet,
  nearbyPets,
  deletePet,
} from "./controllers/pets-controller";
import { createReport } from "./controllers/reports-controller";
const staticDirPath = path.resolve(__dirname, "../client");

(function () {
  const port = process.env.PORT || 3000;
  const app = express();
  app.use(cors());

  app.use(
    express.json({
      limit: "50mb",
    })
  );

  app.get("/users/all", async (req, res) => {
    const user = await allUser();
    res.json(user);
  });
  app.get("/auth/all", async (req, res) => {
    const auth = await allAuth();
    res.json(auth);
  });
  app.get("/users/search", async (req, res) => {
    const user = await searchUser(req.query.email);
    res.json(user);
  });

  app.patch("/users/update", async (req, res) => {
    const respuesta = await updateUser(req.body);
    res.json(respuesta);
  });

  app.post("/auth", async (req, res) => {
    const user = await createUser(req.body);
    res.json(user);
  });

  app.post("/auth/token", async (req, res) => {
    const token = await getToken(req.body);
    if (token) {
      res.json({ token });
    } else {
      res.status(400).json({ error: "email or password incorrect" });
    }
  });

  app.get("/me", authMiddleware, async (req, res) => {
    const user = await findUser(req);
    res.json(user);
  });

  app.post("/pets", authMiddleware, async (req: any, res) => {
    const pet = await createPet(req._user.id, req.body);
    res.json(pet);
  });

  app.get("/me/pets/", authMiddleware, async (req: any, res) => {
    const pets = await searchPets(req._user.id);
    res.json(pets);
  });

  app.get("/pets", async (req, res) => {
    const mascotasCercanas = await nearbyPets(req.query.lng, req.query.lat);
    res.json(mascotasCercanas);
  });
  app.put("/pets/:petId", authMiddleware, async (req, res) => {
    const { petId } = req.params;
    const respuesta = await updatePet(petId, req.body);
    res.json(respuesta);
  });

  app.delete("/pets/:petId", authMiddleware, async (req, res) => {
    const { petId } = req.params;
    const respuesta = await deletePet(petId);
    res.json(respuesta);
  });

  app.post("/reports", async (req, res) => {
    try {
      const respuesta = await createReport(req.body);
      res.json(respuesta);
    } catch (err) {
      console.log("Este es el error: ", err.response.body);
    }
  });

  app.use(express.static(staticDirPath));

  app.get("*", function (req, res) {
    res.sendFile(staticDirPath);
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
