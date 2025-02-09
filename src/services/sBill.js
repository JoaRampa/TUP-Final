import Api from "@/services/Api.js"

export default {
  add (info) {
    return Api().post('bills', info)
  },
  getAll(){
    return Api().get('bills')
  },
  delete(id){
    return Api().delete(`bills/${id}`)
  },
}