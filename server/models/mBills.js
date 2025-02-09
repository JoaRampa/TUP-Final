import db from "../config/config.js";

const mBills = { 
  getAll: async () => {
    try {
      const results = await db.all("SELECT * FROM gastos");
      return results;
    } catch (err){
      throw { status: 500, msg: "Error al cargar"}
    }
  },
  add: async (bill) => {
    try {
      await db.run("INSERT INTO gastos (descripcion, total) VALUES (?,?)", [bill.descripcion, bill.total])
    } catch (err){
      throw { status: 500, msg: "Error al crear"}
    }
  },  
  delete: async (id) => {try {
    await db.run("DELETE FROM gastos WHERE id = ?", [id])
  } catch (err){
    throw { status: 500, msg: `Error al Completar ${id}`}
  }},
};

export default mBills;