import { createStore } from "vuex";
import VuexPersist from "vuex-persist";
import sProduct from "@/services/sProduct";

// Configuración de vuex-persist
const vuexPersist = new VuexPersist({
  key: "my-app",
  storage: window.localStorage,
});

const store = createStore({
  state: {
    products: [],
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const res = await sProduct.getAll();
        commit("setProducts", res.data.products);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        commit("setProducts", []);
      }
    },
  },
  getters: {
    allProducts: (state) => state.products,
  },
  plugins: [vuexPersist.plugin], // Agrega persistencia con vuex-persist
});

export default store;