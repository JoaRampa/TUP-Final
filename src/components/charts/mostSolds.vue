<template>
  <div class="card">
    <h3>Most solds</h3>
    <div class="chart-wrapper">
      <canvas ref="canvas2" role="img" aria-label="Gráfico de ventas por mes"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import { fetchSales, sales, products } from '@/server'
Chart.register(...registerables);

const canvas2 = ref(null);
let chartInstance = null;

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
    .sort((a, b) => b.q_sold - a.q_sold)
    .slice(0, 10);
});

function renderChart2() {
  if (!canvas2.value) return;
  const ctx = canvas2.value.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(47,85,151,0.16)');
  gradient.addColorStop(1, 'rgba(47,85,151,0.02)');

    if (chartInstance) { chartInstance.destroy(); }

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: groupedSales.value.map(i => i.id_product),
      datasets: [{
        label: 'Sales',
        data: groupedSales.value.map(i => i.q_sold),
        fill: true,
        backgroundColor: gradient,
        borderColor: '#2F5597',
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.parsed.y} u`;
            }
          }
        }
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.06)' }
        }
      }
    }
  });
}

onMounted(() => {
  fetchSales();
  renderChart2();
});
watch(groupedSales, () => { renderChart2(); });
onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy();
});
</script>