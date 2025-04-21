<template>
  <div>
    <h1>Balance</h1>
    <div>
      <p><strong>Total benefits:</strong> ${{ totalBenefit }}</p>
      <p><strong>Total expenses:</strong> ${{ totalExpense }}</p>
      <p><strong>Profit:</strong> ${{ balance }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { expenses, fetchExpenses, sales, fetchSales } from '@/server'

const totalBenefit = ref(0)
const totalExpense = ref(0)

const balance = computed(() => totalBenefit.value - totalExpense.value)

onMounted(async () => {
  await Promise.all([fetchExpenses(), fetchSales()]);

  totalBenefit.value = sales.value.reduce((total, sale) => {
    return total + (sale.benefit)
  }, 0)
  totalExpense.value = expenses.value.reduce((total, expense) => {
    return total + expense.price
  }, 0)
})
</script>