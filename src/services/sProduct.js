import Api from "@/services/Api.js"

export default {
  add (info) {
    return Api().post('products', info)
  },
  getAll(){
    return Api().get('products')
  },
  getOne(id){
    return Api().get(`products/${id}`)
  },
  delete(id){
    return Api().delete(`products/${id}`)
  },
  edit(info){
    return Api().put(`products/${info.id}`, info)
  },
}