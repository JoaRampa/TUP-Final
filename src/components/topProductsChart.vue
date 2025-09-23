<template>
  <div class="card" role="region" aria-label="Top 5 best sellers">
    <div class="chart-title">
      <h3>Top 5 best sellers</h3>
      <small>Last 30 days</small>
    </div>
    <div class="chart-wrapper">
      <canvas ref="canvas" aria-label="Gráfico de barras horizontales: productos más vendidos" role="img"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import { fetchSales, sales, products } from '@/server';
Chart.register(...registerables);

const canvas = ref(null);
let chartInstance = null;
const accent = '#2F5597';

const groupedSales = computed(() => {
  const map = new Map();
  for (const item of sales.value) {
    const name = item.id_product;
    
    if (!map.has(name)) {
      const product = products.value.find(p => p.id === name);
      map.set(name, {
        id_product: product ? product.name : name,
        benefit: 0,
        q_sold: 0,
        total_sales: 0,
      });
    }
    
    const entry = map.get(name);
    entry.benefit += item.benefit;
    entry.q_sold += item.quantity;
    entry.total_sales += 1;
  }
  return Array.from(map.values())
    .sort((a, b) => b.benefit - a.benefit)
    .slice(0, 5);
});

function renderChart() {
  if (!canvas.value) return;

  const ctx = canvas.value.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 400, 0);
  gradient.addColorStop(0, 'rgba(47,85,151,0.95)');
  gradient.addColorStop(1, 'rgba(47,85,151,0.75)');

  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: groupedSales.value.map(i => i.id_product),
      datasets: [{
        label: 'Benefit',
        data: groupedSales.value.map(i => i.benefit),
        backgroundColor: gradient,
        borderColor: accent,
        borderWidth: 0,
        barThickness: 20,
        borderRadius: 6
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.dataset.label + ': ' + context.parsed.x.toLocaleString();
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            callback: v => v.toLocaleString()
          },
          grid: { color: 'rgba(0,0,0,0.06)' }
        },
        y: { grid: { display: false } }
      }
    }
  });
}

onMounted(() => {
  fetchSales();
  renderChart();
});
watch(groupedSales, () => {
  renderChart();
});
onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy();
});
</script>

<style>
.card { padding: 18px; }
.chart-wrapper { height: 220px; }
.chart-title { display:flex; justify-content:space-between; align-items:center }
</style>