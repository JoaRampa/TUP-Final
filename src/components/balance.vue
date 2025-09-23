<template>
  <Table title="Balance" 
    :headers="['Sales profits', 'Total expenses', 'Balance','Stock value']"
    :fields="['benefits', 'expenses', 'profit','stock_value']"
    :rows="[{}]"
  >
    <template #cell-benefits>${{ formatNumber(totalBenefit) }}</template>
    <template #cell-expenses>${{ formatNumber(totalExpense) }}</template>
    <template #cell-profit>${{ formatNumber(balance) }}</template>
    <template #cell-stock_value>${{ formatNumber(stockValue) }}</template> 
  </Table>
  <totalSales />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { expenses, fetchExpenses, sales, fetchSales, fetchProducts, products } from '@/server'
import Table from './custom/table.vue'
import { formatNumber } from '@/utils/formatNumber';
import totalSales from './products/totalSales.vue'

const totalBenefit = ref(0);
const totalExpense = ref(0);
const stockValue = ref(0);

const balance = computed(() => totalBenefit.value - totalExpense.value);

onMounted(async () => {
  await Promise.all([fetchExpenses(), fetchSales(), fetchProducts()]);

  totalBenefit.value = sales.value.reduce((total, sale) => {
    return total + (sale.benefit)
  }, 0)
  totalExpense.value = expenses.value.reduce((total, expense) => {
    return total + expense.price
  }, 0)
  stockValue.value = products.value.reduce((total, product) => {
    return total + (product.stock * product.cost_price)
  }, 0)
})
</script>