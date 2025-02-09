import mProducts from "../models/mProducts.js";
import error from "../middlewares/error.js";

const cProducts = {
  getAll: async (req, res) => { 
    try {
      let products = await mProducts.getAll();
      res.json({products}) 
    }catch (err){
      error.e500(req, res, err);
    }
  },
  add: async (req, res) => {
    try {
      const { nombreProducto, precioRef, precioMayorista, prodCod } = req.body;
      await mProducts.add({nombreProducto, precioRef, precioMayorista, prodCod});
      res.send({
        message: `Agregado ${req.body.nombreProducto + req.body.precioRef}`
     });
    } catch (err){
      error.e500(req, res, err);
    }
  },
 edit: async (req, res) => {
  try {
    let id = parseInt(req.body.id);
    const { nombreProducto, precioRef, precioMayorista, prodCod } = req.body;
    await mProducts.edit({nombreProducto, precioRef, precioMayorista, prodCod, id});
    res.send({message: `Editado ${req.body.nombreProducto}`});
    } catch (err) {
      error.e500(req, res, err);
    }
  },
 delete: async (req, res) => {
  try {
      let id = parseInt(req.params.id);
      await mProducts.delete(id);
      res.send({message: `Eliminado ${id}` });
    } catch(err){
      error.e500(req,res,err);
    }
  },
}

export default cProducts;