<template>
  <div class="card">
    <h3>Anual balance</h3>
    <p>${{ formatNumber(anualBalance) }}</p>
  </div>
</template>
<script setup>
  import { ref, computed, onMounted } from "vue";
  import { formatNumber } from "@/utils/formatNumber";
  import { expenses, fetchExpenses, transactions, fetchTransaction } from "@/server";

  const totalBenefit = ref(0);
  const totalExpense = ref(0);

  const anualBalance = computed(() => totalBenefit.value - totalExpense.value);

  const toNum = v => Number(v) || 0;

  onMounted(async () => {
    await Promise.all([fetchExpenses(), fetchTransaction()]);
    
    totalBenefit.value = transactions.value.reduce((s, t) => s + toNum(t.total), 0);
    totalExpense.value = expenses.value.reduce((s, e) => s + toNum(e.price), 0);
  });
</script>