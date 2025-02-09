import cProducts from "../controllers/cProducts.js";
import { Router } from "express";

const routes = Router();

routes.get("/products", cProducts.getAll);
routes.post("/products", cProducts.add);
routes.put("/products/:id", cProducts.edit);
routes.delete("/products/:id", cProducts.delete);

export default routes;
