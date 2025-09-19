<template>
  <div class="card" role="region" aria-label="Top 5 productos más vendidos">
    <div class="chart-title">
      <h3>Productos más vendidos (Top 5)</h3>
      <small>Últimos 30 días</small>
    </div>
    <div class="chart-wrapper">
      <canvas ref="canvas" aria-label="Gráfico de barras horizontales: productos más vendidos" role="img"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const canvas = ref(null);
let chartInstance = null;

// Datos de ejemplo (reemplazar o alimentar desde props/fetch)
const labels = ['Producto A','Producto B','Producto C','Producto D','Producto E'];
const values = [1200, 950, 875, 640, 520];
const accent = '#2F5597';

onMounted(() => {
  const ctx = canvas.value.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 400, 0);
  gradient.addColorStop(0, 'rgba(47,85,151,0.95)');
  gradient.addColorStop(1, 'rgba(47,85,151,0.75)');

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Cantidad vendida',
        data: values,
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
            label: function(context) {
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
});

onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy();
});

/* Exporta una función para actualizar desde fuera (o usa props/events)
export function updateChart(newLabels, newValues) {
  if (!chartInstance) return;
  chartInstance.data.labels = newLabels;
  chartInstance.data.datasets[0].data = newValues;
  chartInstance.update();
}*/
</script>

<style scoped>
.card {
  padding: 18px;
}
.chart-wrapper { height: 220px; }
.chart-title { display:flex; justify-content:space-between; align-items:center }
</style>