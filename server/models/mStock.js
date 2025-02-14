import db from "../config/config.js";

const mStock = { 
  getAll: async () => {
    try {
      const results = await db.all(`
        SELECT 
          t.id AS idTransaccion, t.fecha, t.total,
          t.tipo, dt.idProduct, dt.cantidad, dt.precio
        FROM transacciones t LEFT JOIN detalle_transacciones dt ON t.id = dt.idTransaccion`);
      return results || [];
    } catch (err){
      throw { status: 500, msg: "Error al cargar"}
    }
  },
  createSale: async (saleData) => {
    try {
      const { total, products, tipo } = saleData;
      
      // Usar transacción para operaciones múltiples
      await db.run('BEGIN TRANSACTION');
      
      // Insertar transacción
      const { lastID: idTransaccion } = await db.run(
        "INSERT INTO transacciones (total, tipo) VALUES (?, ?)",
        [total, tipo]
      );

      // Insertar detalles
      for (const prod of products) {
        await db.run(
          "INSERT INTO detalle_transacciones (idTransaccion, idProduct, cantidad, precio) VALUES (?, ?, ?, ?)",
          [idTransaccion, prod.idProduct, prod.cantidad, prod.precio]
        );
      }

      await db.run('COMMIT');
      return idTransaccion;
      
    } catch (err) {
      await db.run('ROLLBACK');
      throw { status: 500, msg: "Error al crear la venta" };
    }
  },
  edit: async ({ idTransaccion, idProduct, cantidad, precio}) => {
    try {
      await db.run(
        "UPDATE detalle_transacciones SET cantidad = ?, precio = ? WHERE idTransaccion = ? AND idProduct = ?",
        [cantidad, precio, idTransaccion, idProduct]
      );
    } catch (err) {
      throw { status: 500, msg: `Error al actualizar el detalle de la transacción ${idTransaccion}` };
    }
  },
  editTotal: async ({ idTransaccion, total}) => {
    try {       
      await db.run(
        "UPDATE transacciones SET total = ? WHERE id = ?",
        [total, idTransaccion]
      );
    } catch (err) {
      throw { status: 500, msg: `Error al actualizar el detalle de la transacción ${idTransaccion}` };
    }
  }
};

export default mStock;