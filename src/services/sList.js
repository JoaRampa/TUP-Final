import Api from "@/services/Api.js"

export default {
  add (info) {
    return Api().post('list', info)
  },
  getAll(){
    return Api().get('list')
  },
  delete(id){
    return Api().delete(`list/${id}`)
  },
  edit(info){
    return Api().put(`list/${info.id}`, info)
  },
}