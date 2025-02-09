<template>
  <cmLoader v-if="isLoading" :msg="msg || 'Producto editado!'"></cmLoader>
  <input type="text" v-model="searchQuery" @input="filterProducts" placeholder="Buscar producto...&#128269;"
    style="border: 1px solid var(--border-color); width: 9rem; margin-left: 2rem;"/>
  <table>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Lista precios al Publico</th>
            <th>Lista precios Mayoristas</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(prod, id) in filteredProducts" :key="id">
            <td><strong>{{ prod.prodCod ?? ''}}</strong></td>
            <td><strong>{{ prod.nombreProducto }}</strong></td>
            <td><strong>{{ prod.precioRef }}</strong></td>
            <td><strong>{{ prod.precioMayorista || ''}}</strong></td>
            <td><button @click="openEditModal(prod)">Editar</button></td>
          </tr>
        </tbody>
      </table>

      <EditProductModal :isVisible="isModalVisible" :product="selectedProduct"
      @close="closeEditModal" @submit="updateProduct"/>
</template>

<script>
import sProduct from "@/services/sProduct"; 
import EditProductModal from "@/components/products/EditProductModal.vue";
import cmLoader from '@/components/cmLoader.vue';
import { mapGetters, mapActions } from "vuex";

export default {
  components: { EditProductModal, cmLoader },
  data() {
    return {
      isModalVisible: false,
      selectedProduct: null,
      searchQuery: "", 
      filteredProducts: [], 
      isLoading: false,
      msg: null
    };
  },
  computed: {
    ...mapGetters(["allProducts"])
  },
  async mounted() { 
    await this.fetchProducts(); // Ahora debería existir
    this.filteredProducts = this.allProducts;
  },
  watch: {
    allProducts: {
      immediate: true,
      handler(newProducts) {
        this.filteredProducts = newProducts;
      },
    },
  },
  methods: {
    ...mapActions(["fetchProducts"]), // 🔹 Asegura que fetchProducts existe

    openEditModal(prod) {
      this.selectedProduct = { ...prod };
      this.isModalVisible = true;
    },
    closeEditModal() {
      this.isModalVisible = false;
      this.selectedProduct = null;
    },
    async updateProduct(updatedProduct) {
      if (!updatedProduct.id) return;
      try {
        this.isLoading = true;
        await sProduct.edit(updatedProduct); 
        await this.fetchProducts(); // 🔹 Recargar productos después de la edición
        this.closeEditModal();
      } catch (error) {
        this.msg = "Error al editar el producto";
        console.error("Error al actualizar el producto:", error);
      } finally {      
        setTimeout(() => {
          this.isLoading = false;
        }, 3000);
      }
    },
    filterProducts() {
      const query = this.searchQuery.toUpperCase();
      this.filteredProducts = this.allProducts.filter((prod) => {
        const nombre = prod.nombreProducto ? prod.nombreProducto.toUpperCase() : "";
        const cod = prod.prodCod ? prod.prodCod.toUpperCase() : "";
        return nombre.includes(query) || cod.includes(query);
      });
    },
  }
};
</script>

<style scoped>
table {
  margin: 0.25rem 2rem;
  width: 95%;
  border-radius: .5rem;
  border: 1px solid var(--border-color);
  background-color:var(--main-modal-color);
  padding: 0.5rem
}

th, td {
  text-align: left;
}

th {
  padding: 0.25rem;
}
</style>