<template>
  <Table
    title="Sales"
    :headers="['Name','Benefit','Quantity','Date']"
    :fields="['id_product','benefit','quantity','created_at']"
    :rows="sales"
  >
  <!-- si no hay slot se muestra solo row[field] -->
    <template #cell-id_product="{ row }">
      {{ products.find(p => p.id === row.id_product)?.name || 'Product not found' }}
    </template>
    <template #cell-created_at="{ row }">
      {{ formatDate(row.created_at) }}
    </template>
  </Table>
  <Table
    title="Expenses"
    :headers="['Description','Price','Date']"
    :fields="['description','price','created_at']"
    :rows="expenses"
  >
    <template #cell-created_at="{ row }">
      {{ formatDate(row.created_at) }}
    </template>
  </Table>
</template>

<script setup>
import { onMounted } from 'vue';
import { fetchSales, sales, fetchProducts, products, expenses, fetchExpenses } from '@/server';
import {formatDate} from '../utils/formatDate'
import Table from './custom/table.vue'

onMounted(() => {
  fetchSales();
  fetchProducts();
  fetchExpenses();
});
</script>