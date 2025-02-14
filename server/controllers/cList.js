import mList from "../models/mList.js";
import error from "../middlewares/error.js";

const cList = {
  getAll: async (req, res) => { 
    try {
      let list = await mList.getAll();
      res.json({list}) 
    }catch (err){
      error.e500(req, res, err);
    }
  },
  add: async (req, res) => {
    try {
      const { nombre, descripcion, precio} = req.body;
      await mList.add({nombre, descripcion, precio, });
      res.send({
        message: `Agregado ${req.body.nombre + req.body.descripcion}`
     });
    } catch (err){
      error.e500(req, res, err);
    }
  },
 edit: async (req, res) => {
  try {
    let id = parseInt(req.body.id);
    const { nombre, descripcion, precio} = req.body;
    await mList.edit({nombre, descripcion, precio, id});
    res.send({message: `Editado ${req.body.nombre}`});
    } catch (err) {
      error.e500(req, res, err);
    }
  },
 delete: async (req, res) => {
  try {
      let id = parseInt(req.params.id);
      await mList.delete(id);
      res.send({message: `Eliminado ${id}` });
    } catch(err){
      error.e500(req,res,err);
    }
  },
}

export default cList;