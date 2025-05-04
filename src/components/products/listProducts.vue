<template>
  <div>
    <div class="center headerProd">
      <cInput v-model="filter" @filter="searchProduct" placeholder="Search..." style="margin: 0;"/>
      <h2>Stock</h2>
      <Button label="+Add product" @click="newModal" class="btnAdd"/>
    </div>
    <Modal v-if="newProductModal" @close="closeModal">
      <productForm mode="new" @save="fetchProducts" @close="closeModal"/>
    </Modal>
    <Modal v-if="editProductModal" @close="closeModal">
      <productForm mode="edit" :product="selectedProduct" @close="closeModal" @save="fetchProducts"/>
    </Modal>
    <Table :headers="['Name','Stock','Sale price','Cost price', ' ']"
      :fields="['name', 'stock', 'sale_price', 'cost_price', 'actions' ]"
      :rows="searchProduct"
    >
    <template #cell-actions="{ row }">
      <Button label="Edit" @click="editModal(row)" />
    </template>
    </Table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { Button } from '../custom/button';
import cInput from '../custom/cInput.vue'
import Modal from '../custom/cModal.vue';
import Table from '../custom/table.vue'
import productForm from './productForm.vue';
import { fetchProducts, products } from '@/server';

const newProductModal = ref(false);
const editProductModal = ref(false);
const selectedProduct = ref(null);
const filter = ref('');

onMounted(fetchProducts);

const searchProduct = computed(() => {
  if (!filter.value) return products.value;
  return products.value.filter(p =>
    p.name.toLowerCase().includes(filter.value.toLowerCase())
  );
});
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
.headerProd * {
  margin: auto;
}
table {
  margin: 0 2rem;
  width: 95%;
  border-radius: .5rem;
  border: 1px solid var(--border-color);
  padding: 0 0.5rem;
}

th, td {
  text-align: left;
}

.btnAdd {
  width: 8rem;
  margin: 0;
  background-color: var(--back-green);
  color: var(--text-green);
  font-weight: 700;
}
.btnAdd:hover {
  background-color: var(--green-hover);
}
</style>