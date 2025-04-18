<template>
  <div>
    <Button label="Add product" @click="newModal" />
    <Modal v-if="newProductModal" @close="closeModal">
      <productForm mode="new" @save="fetchProducts" @close="closeModal"/>
    </Modal>
    <Modal v-if="editProductModal" @close="closeModal">
      <productForm mode="edit" :product="selectedProduct" @close="closeModal" @save="fetchProducts"/>
    </Modal>
    <p v-if="error">Error: {{ error }}</p>
    <p v-if="!products.length">No hay productos</p>
    <table v-else>
      <thead>
        <tr>
          <th>Name</th>
          <th>Stock</th>
          <th>Sale price</th>
          <th>Cost price</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prod in products" :key="prod.id">
          <td>{{ prod.name }}</td>
          <td>{{ prod.stock }}</td>
          <td>{{ prod.sale_price }}</td>
          <td>{{ prod.cost_price }}</td>
          <td><Button label="Edit" @click="editModal(prod)"/></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Button } from '../custom/button';
import Modal from '../custom/cModal.vue';
import productForm from './productForm.vue';
import { fetchProducts, products, error } from '@/server';

const newProductModal = ref(false);
const editProductModal = ref(false);
const selectedProduct = ref(null);

onMounted(fetchProducts);

const editModal = (prod) => {
  selectedProduct.value = prod;
  editProductModal.value = true;
}
const newModal = () => newProductModal.value = true;
const closeModal = () => {
  newProductModal.value = false;
  editProductModal.value = false;
  selectedProduct.value = null;
};
</script>

<style>
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
</style>