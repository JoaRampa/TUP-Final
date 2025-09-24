<template>
  <Table
    title="Grouped Sales"
    :headers="['Sale nro', 'Total', 'Date', 'Sale information']"
    :fields="['id', 'total', 'created_at', 'info']"
    :rows="sortedTransactions"
  >
    <template #cell-created_at="{ row }">{{ formatDate(row.created_at) }}</template>
    <template #cell-info="{ row }"><Button label="i" class="btnConfirmAction btnInfo" @click="infoModal(row)"/></template>
  </Table>
  <Modal v-if="infoSaleModal" @close="closeModal">
    <template #default>
      <h2>Sale n° {{ selectedSale?.id }}</h2>
      <p>Total benefit: {{ selectedSale?.total }}</p>
      <p>Date: {{ formatDate(selectedSale?.created_at) }}</p>

      <h3>Products Sold:</h3>
      <ul>
        <li v-for="item in saleDetails" :key="item.id">
          {{ item.product.name }} - Quantity: {{ item.quantity }} - Sale benefit: ${{ item.benefit }}
        </li>
      </ul>
    </template>
  </Modal>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { fetchTransaction, transactions, fetchProducts, fetchSaleDetails } from '@/server';
import {formatDate} from '../utils/formatDate'
import Table from './custom/table.vue'
import Modal from './custom/cModal.vue'
import {Button} from './custom/button'

const infoSaleModal = ref(false);
const selectedSale = ref(null);
const saleDetails = ref([]);

const sortedTransactions = computed(() => {
  return [...transactions.value].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
});

const infoModal = async (sale) => {
  selectedSale.value = sale;
  infoSaleModal.value = true;
  saleDetails.value = await fetchSaleDetails(sale.id);
}
const closeModal = () => {
  infoSaleModal.value = false;
  selectedSale.value = null;
  saleDetails.value = [];
}

onMounted(async() => {
  fetchTransaction();
  fetchProducts();
});
</script>

<style>
 .btnInfo { width: 3rem; border-radius: 100px; }
</style>