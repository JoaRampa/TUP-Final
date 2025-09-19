<template>
  <Table
    title="Grouped Sales"
    :headers="['Sale nro', 'Total', 'Date', 'Sale information']"
    :fields="['id', 'total', 'created_at', 'info']"
    :rows="transactions"
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

  <Table
    title="Expenses"
    :headers="['Description','Price','Date']"
    :fields="['description','price','created_at']"
    :rows="expenses"
  >
    <template #cell-created_at="{ row }">{{ formatDate(row.created_at) }}<button class="btnSupport">-</button></template>
  </Table>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { fetchTransaction, transactions, fetchProducts, expenses, fetchExpenses, fetchSaleDetails } from '@/server';
import {formatDate} from '../utils/formatDate'
import Table from './custom/table.vue'
import Modal from './custom/cModal.vue'
import {Button} from './custom/button'

const infoSaleModal = ref(false);
const selectedSale = ref(null);
const saleDetails = ref([]);

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

onMounted(() => {
  fetchTransaction();
  fetchProducts();
  fetchExpenses();
});
</script>

<style>
 .btnInfo {
  width: 3rem;
  border-radius: 100px;
 }
 .btnSupport {
  background-color: var(--white-color);
  cursor: auto;
  color: var(--white-color);
 }
 .btnSupport:hover{
  background-color: var(--white-color);
 }
</style>