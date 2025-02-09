<template>
  <div class="table">
  <input style="border: 1px solid var(--border-color); width: 9rem;" type="text" v-model="searchQuery" 
    @input="filterProducts" placeholder="Buscar producto...&#128269;"/>
  <table>
    <thead>
      <tr>
        <th><strong>Descripción</strong></th>
        <th><strong>Costo Promedio por unidad</strong></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(trans, index) in filteredProducts" :key="index">
        <td><strong>{{ trans.description }}</strong></td>
        <td><strong>$ {{ trans.averagePrice ? trans.averagePrice.toFixed(2) : 'N/A' }}</strong></td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
import { groupedProducts } from "@/mixins/groupedProducts";

export default {
  mixins: [groupedProducts],
  data() {
    return {
      transacciones: [],
      searchQuery: "",
      filteredProducts: [], 
    }
  },
  async created() {
    await this.fetchTransacciones();
    this.groupProducts();
    this.filteredProducts = this.groupedProducts;     
  },
  methods: {
    filterProducts() {
      const query = this.searchQuery.toUpperCase();
      this.filteredProducts = this.groupedProducts.filter((trans) =>
        trans.description.toUpperCase().includes(query)
      );
    },
  },
  watch: {
    groupedProducts: {
      immediate: true,
      handler(newGroupedProducts) {
        this.filteredProducts = newGroupedProducts; // Actualizar la lista filtrada
      },
    },
  },
}
</script>

<style scoped>
.table {
  margin-left: .5rem;
  transform: translateY(-10px);
  animation: fadeIn 0.5s ease-in-out forwards;
}
table {
  width: 49%;
  border-radius: 1rem;
  margin: 0.25rem 0;
  padding: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.306);
  border: 1px solid var(--border-color);
}

th, td {
  text-align: left;
}

th {
  padding: 0.25rem;
}

</style>