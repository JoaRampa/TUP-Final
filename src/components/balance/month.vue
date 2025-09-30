<template>
  <div class="card">
    <h3>Balance last month</h3>
    <p>${{ formatNumber(monthlyBalance) }}</p>
  </div>
</template>
<script setup>
  import { ref, onMounted } from "vue";
  import { formatNumber } from "@/utils/formatNumber";
  import { expenses, fetchExpenses, transactions, fetchTransaction } from "@/server";

  const monthlyBalance = ref(0);

  const toNum = v => Number(v) || 0;

  onMounted(async () => {
    await Promise.all([fetchExpenses(), fetchTransaction()]);

    const now = new Date();
    const Y = now.getFullYear();
    const M = now.getMonth(); 

    const inMonth = raw => {
      const d = raw ? new Date(raw) : new Date(NaN);
      if (isNaN(d.getTime())) return false;
      return d.getFullYear() === Y && d.getMonth() === M;
    };

    const sumSales = transactions.value
      .filter(t => inMonth(t.created_at ?? t.date ?? t.createdAt))
      .reduce((s, t) => s + toNum(t.total), 0);

    const sumExpenses = expenses.value
      .filter(e => inMonth(e.date ?? e.created_at ?? e.createdAt))
      .reduce((s, e) => s + toNum(e.price), 0);

    monthlyBalance.value = sumSales - sumExpenses;
  });
</script>