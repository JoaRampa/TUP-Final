<template>
  <h1>sales</h1>
  <div v-for="sale in sales" :key="sale.id" :value="sale.id">
    <p>Prod:{{ products.find(p => p.id === sale.id_product).name || 'Product not found' }} - 
      Benefit:{{ sale.benefit }} - Quantity:{{ sale.quantity }} - Date:{{ sale.created_at }}
    </p>
  </div>
  <h1>expenses</h1>
  <div v-for="expense in expenses" :key="expense.id" :value="expense.id">
    <p>{{ expense.price }} - {{ expense.description }} - {{ expense.created_at }}</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { fetchSales, sales, fetchProducts, products, expenses, fetchExpenses } from '@/server';

onMounted(() => {
  fetchSales();
  fetchProducts();
  fetchExpenses();
});
</script>