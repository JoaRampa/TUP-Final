import db from "../config/config.js";

const mProducts = {
  getAll: async () => {
    try {
      const results = await db.all("SELECT * FROM products");
      return results;
    } catch (err){
      throw { status: 500, msg: "Error al cargar"}
    }
  },
  getOne: async (id) => {
    try {
      const [results] = await db.get("SELECT * FROM products WHERE id = ?", [id]);
      return results[0];
    } catch (err) {
      throw { status: 500, msg: `Error al cargar producto ${id}`}
    }
  },
  add: async (prod) => {
    try {
      await db.run("BEGIN TRANSACTION");
      await db.run(
        "INSERT INTO products (nombreProducto, precioRef, precioMayorista, prodCod) VALUES (?, ?, ?, ?)",
        [prod.nombreProducto, prod.precioRef, prod.precioMayorista, prod.prodCod]
      );
      await db.run("COMMIT");
    } catch (err) {
      await db.run("ROLLBACK");
      throw { status: 500, msg: "Error al crear" };
    }
  },
  edit: async (prod) => {
    try {
      await db.run("UPDATE products SET nombreProducto = ?, precioRef = ?, precioMayorista = ?, prodCod = ? WHERE id = ?"
        ,[prod.nombreProducto, prod.precioRef, prod.precioMayorista, prod.prodCod, prod.id]);
    } catch (err) {
      throw { status: 500, msg: `Error al Editar ${prod.id}` };
    }
  },  
  delete: async (id) => {try {
    await db.run("DELETE FROM products WHERE id = ?", [id])
  } catch (err){
    throw { status: 500, msg: `Error al Completar ${id}`}
  }},
};

export default mProducts;