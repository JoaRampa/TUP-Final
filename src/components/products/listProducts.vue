<template>
  <div>
    <div class="center headerProd">
      <cInput v-model="filter" @filter="searchProduct" placeholder="Search..." style="margin: 0;"/>
      <h2>Stock</h2>
      <Button label="+New product" @click="newModal" class="btnAdd"/>
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
      :rowClass="getRowClass"
    >
    <template #cell-actions="{ row }">
      <Button class="btnConfirmAction" label="Edit" @click="editModal(row)" />
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

const getRowClass = (row) => { return row.stock === 0 ? 'no-stock' : ''; }
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
.headerProd {
  width: 90%;
  margin: 0 2rem;
}
table {
  width: 90%;
  margin: .5rem 2rem;
  border-radius: .5rem;
  border: 1px solid var(--border-color);
  padding: 0 0.5rem;
}

th {
  padding: 1rem 0;
}

td, th {
  text-align: center;
  border-bottom: 1px solid var(--border-color);
}

.btnAdd {
  width: 8rem;
  margin: 0;
  background-color: var(--white-color);
  color: var(--green-color);
  border: 1px solid var(--green-color);
  font-weight: 600;
}
.btnAdd:hover {
  background-color: var(--green-color);
  color: var(--white-color);
}
.no-stock {
  color: var(--red-color);
  font-weight: 800;
}
</style>