import cList from "../controllers/cList.js";
import { Router } from "express";

const routes = Router();

routes.get("/list", cList.getAll);
routes.post("/list", cList.add);
routes.put("/list/:id", cList.edit);
routes.delete("/list/:id", cList.delete);

export default routes;