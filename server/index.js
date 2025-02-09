//configuracion de servidor con express
import express from "express"; 
import morgan from "morgan";
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
import helmet from "helmet";
import rProducts from "./routes/rProducts.js";
import rStock from "./routes/rStock.js";
import error from "./middlewares/error.js";
import rBills from "./routes/rBills.js"

const app = express();
const port = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: "http://localhost:8080", 
  credentials: true // Permite el envío de cookies
}));
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(rProducts);
app.use(rStock);
app.use(rBills);

app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.use(error.e404);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});