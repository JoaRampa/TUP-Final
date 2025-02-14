import db from "../config/config.js";

const mList = {
  getAll: async () => {
    try {
      const results = await db.all("SELECT * FROM list");
      return results;
    } catch (err){
      throw { status: 500, msg: "Error al cargar"}
    }
  },
  add: async (list) => {
    try {
      await db.run("BEGIN TRANSACTION");
      await db.run(
        "INSERT INTO list (nombre, descripcion, precio) VALUES (?, ?, ?)",
        [list.nombre, list.descripcion, list.precio]
      );
      await db.run("COMMIT");
    } catch (err) {
      await db.run("ROLLBACK");
      throw { status: 500, msg: "Error al crear" };
    }
  },
  edit: async (list) => {
    try {
      await db.run("UPDATE list SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?"
        ,[list.nombre, list.descripcion, list.precio, list.id]);
    } catch (err) {
      throw { status: 500, msg: `Error al Editar ${list.id}` };
    }
  },  
  delete: async (id) => {try {
    await db.run("DELETE FROM list WHERE id = ?", [id])
  } catch (err){
    throw { status: 500, msg: `Error al Completar ${id}`}
  }},
};

export default mList;