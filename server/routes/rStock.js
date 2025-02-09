import cStock from "../controllers/cStock.js";
import { Router } from "express";

const routes = Router();

routes.get("/stock", cStock.getAll);
routes.post("/transaccion", cStock.createSale);
routes.put("/stock/:id", cStock.edit);

export default routes;