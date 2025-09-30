<template>
  <div class="dashboard">
    <div class="top-row">
      <div class="card highlight green">
        <h3>Balance last month</h3>
        <p class="value">${{ formatNumber(monthlyBalance) }}</p>
      </div>
      <div class="card highlight blue">
        <h3>Anual balance</h3>
        <p class="value">${{ formatNumber(balance) }}</p>
      </div>
    </div>

    <div class="bottom-row">
      <div class="card metrics">
        <h3>General resume</h3>
        <div class="metrics-grid">
          <div>
            <p class="label">Sales Profits</p>
            <p class="number green">${{ formatNumber(totalBenefit) }}</p>
          </div>
          <div>
            <p class="label">Total Expenses</p>
            <p class="number red">${{ formatNumber(totalExpense) }}</p>
          </div>
          <div>
            <p class="label">Balance</p>
            <p class="number">${{ formatNumber(balance) }}</p>
          </div>
          <div>
            <p class="label">Stock Value</p>
            <p class="number blue">${{ formatNumber(stockValue) }}</p>
          </div>
        </div>
      </div>

      <div class="card chart">
        <h3>Profits vs Expenses</h3>
        <DoughnutChart :chart-data="chartData" :chart-options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { DoughnutChart } from "vue-chart-3";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, DoughnutController } from "chart.js";
import { expenses, fetchExpenses, transactions, fetchTransaction, fetchProducts, products } from "@/server";
import { formatNumber } from "@/utils/formatNumber";

ChartJS.register(Title, Tooltip, Legend, ArcElement, DoughnutController);

const totalBenefit = ref(0);
const totalExpense = ref(0);
const stockValue = ref(0);
const monthlyBalance = ref(0);

const balance = computed(() => totalBenefit.value - totalExpense.value);

const chartData = ref({
  labels: ["Profits", "Expenses"],
  datasets: [{ data: [0, 0], backgroundColor: ["#4CAF50", "#F44336"] }],
});
const chartOptions = ref({ responsive: true, plugins: { legend: { position: "bottom" } } });

const toNum = v => Number(v) || 0;

onMounted(async () => {
  await Promise.all([fetchExpenses(), fetchTransaction(), fetchProducts()]);

  totalBenefit.value = transactions.value.reduce((s, t) => s + toNum(t.total), 0);
  totalExpense.value = expenses.value.reduce((s, e) => s + toNum(e.price), 0);
  stockValue.value = products.value.reduce((s, p) => s + toNum(p.stock) * toNum(p.cost_price), 0);

  const now = new Date();
  const Y = now.getFullYear();
  const M = now.getMonth(); // mes actual 0..11

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

  chartData.value.datasets[0].data = [totalBenefit.value, totalExpense.value];
});
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  font-family: Arial, sans-serif;
}
.top-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}
.card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
.card h3 {
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.5rem;
}
.value {
  font-size: 2rem;
  font-weight: bold;
}
.highlight.green .value { color: #2e7d32; }
.highlight.blue .value { color: #1565c0; }
.bottom-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}
.label {
  font-size: 0.9rem;
  color: #666;
}
.number {
  font-size: 1.2rem;
  font-weight: bold;
}
.number.green { color: #2e7d32; }
.number.red { color: #c62828; }
.number.blue { color: #1565c0; }
</style>