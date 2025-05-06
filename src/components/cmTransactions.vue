<template>
  <Table
    title="Grouped Sales"
    :headers="['Sale nro', 'Total', 'Date', 'Info']"
    :fields="['id', 'total', 'created_at', 'info']"
    :rows="transactions"
  >
    <template #cell-created_at="{ row }">{{ formatDate(row.created_at) }}</template>
    <template #cell-info><Button label="Info" /></template>
  </Table>
  <Table
    title="Expenses"
    :headers="['Description','Price','Date']"
    :fields="['description','price','created_at']"
    :rows="expenses"
  >
    <template #cell-created_at="{ row }">{{ formatDate(row.created_at) }}</template>
  </Table>
</template>

<script setup>
import { onMounted } from 'vue';
import { fetchTransaction, transactions, fetchProducts, expenses, fetchExpenses } from '@/server';
import {formatDate} from '../utils/formatDate'
import Table from './custom/table.vue'
import {Button} from './custom/button'

onMounted(() => {
  fetchTransaction();
  fetchProducts();
  fetchExpenses();
});
</script>