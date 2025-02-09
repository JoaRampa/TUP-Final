import Api from "@/services/Api.js"

export default {
  createSale (info) {
    return Api().post('transaccion', info)
  },
  getAll(){
    return Api().get('stock')
  },
  edit(info){
    return Api().put(`stock/${info.idTransaccion}`, info)
  },
}