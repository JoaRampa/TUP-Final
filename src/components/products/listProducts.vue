<template>
  <div>
    <Button label="Add product" @click="newModal" />
    <Modal v-if="newProductModal" @close="closeModal">
      <productForm mode="new" @save="fetchProducts" @close="closeModal"/>
    </Modal>
    <Modal v-if="editProductModal" @close="closeModal">
      <productForm mode="edit" :product="selectedProduct" @close="closeModal" @save="fetchProducts"/>
    </Modal>
    <Table title="Stock" :headers="['Name','Stock','Sale price','Cost price', ' ']"
      :fields="['name', 'stock', 'sale_price', 'cost_price', 'actions' ]"
      :rows="products"
    >
    <template #cell-actions="{ row }">
      <Button label="Edit" @click="editModal(row)" />
    </template>
    </Table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Button } from '../custom/button';
import Modal from '../custom/cModal.vue';
import Table from '../custom/table.vue'
import productForm from './productForm.vue';
import { fetchProducts, products } from '@/server';

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
  padding: 0.5rem
}

th, td {
  text-align: left;
}
</style>