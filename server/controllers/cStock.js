import mStock from "../models/mStock.js";
import error from "../middlewares/error.js";

const cStock = {
  getAll: async (req, res) => { 
    try {
      const transacciones = await mStock.getAll();

      const safeTransacciones = Array.isArray(transacciones) ? transacciones : [];
      // Agrupar transacciones 
       const groupedTransacciones = safeTransacciones.reduce((acc, trans) => {
        const idTransaccion = trans.idTransaccion;

        if (!acc[idTransaccion]) {
          acc[idTransaccion] = {
            idTransaccion: trans.idTransaccion,
            fecha: trans.fecha,
            total: trans.total,
            tipo: trans.tipo,
            detalles: [],
          };
        }

        if (trans.idProduct) {
          acc[idTransaccion].detalles.push({
            idProduct: trans.idProduct,
            cantidad: trans.cantidad,
            precio: trans.precio,
          });
        }
        return acc;
      }, {});

      // Convertir en un array
      const result = Object.values(groupedTransacciones);
      res.json({ transacciones: result });
    }catch (err){
      error.e500(req, res, err);
    }
  },
  createSale: async (req, res) => {
    try {
      const { products, total, tipo } = req.body; 
      // Verifica los productos y el total
      if (!products || !Array.isArray(products) || products.length === 0 || !total || !tipo) 
        return res.status(400).json({ message: "Datos de transaccion inválidos" });
      
      const idTransaccion = await mStock.createSale({ total, products, tipo });
      res.status(201).json({
        message: "Transaccion creada exitosamente",
        idTransaccion,
      });
    } catch (err) {error.e500(req, res, err);}
  },
  edit: async (req, res) => {
    try {
      const { idTransaccion, detalles, total } = req.body;
      // Actualizar cada detalle de la transacción
      for (const detalle of detalles) {
        const { idProduct, cantidad, precio } = detalle;
        if (!idProduct || !cantidad || !precio) {
          return res.status(400).json({ message: "Datos de detalle inválidos" });
        }
        await mStock.edit({ idTransaccion, idProduct, cantidad, precio });
      };

      await mStock.editTotal({idTransaccion, total});

      res.json({ message: "Transacción actualizada exitosamente" });
    } catch (err) {
      error.e500(req, res, err);
    }
  },
}

export default cStock;