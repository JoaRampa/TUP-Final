import mBills from "../models/mBills.js";
import error from "../middlewares/error.js";

const cBills = {
  getAll: async (req, res) => { 
    try {
      let bills = await mBills.getAll();
      res.json({bills}) 
    }catch (err){
      error.e500(req, res, err);
    }
  },
  add: async (req, res) => {
    try {
      const  descripcion  = req.body.descripcion;
      const  total  = req.body.total;
      await mBills.add({descripcion, total});
      res.json({
        message: `Agregado ${req.body.descripcion, req.body.total}`
     });
    } catch (err){
      error.e500(req, res, err);
    }
  },
  delete: async (req, res) => {
    try {
      let id = parseInt(req.params.id);
      await mBills.delete(id);
      res.send({message: `Eliminado ${id}` });
    } catch(err){
      error.e500(req,res,err);
    }
  },
}

export default cBills;