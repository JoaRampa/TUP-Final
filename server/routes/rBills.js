import cBills from "../controllers/cBills.js";
import { Router } from "express";

const routes = Router();

routes.get("/bills", cBills.getAll);
routes.post("/bills", cBills.add);
routes.delete("/bills/:id", cBills.delete);

export default routes;