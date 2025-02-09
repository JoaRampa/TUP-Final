import sProduct from "@/services/sProduct";

export const dataFetchMixin = {
  data() {
    return {
      products: [],
    };
  },
  async created() {
    await this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const res = await sProduct.getAll();
        this.products = res.data.products;
      } catch (error) {
        console.error("Error al cargar productos:", error);
        this.products = [];
      }
    },
    getProductDescription(id) {
      const product = this.products.find(prod => prod.id === id);
      return product ? product.nombreProducto : '';
    },
  },
};