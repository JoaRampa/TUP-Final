<template>
  <div class="card">
    <h3>Sales</h3>
    <div class="chart-wrapper">
      <canvas ref="canvas" role="img" aria-label="Gráfico de ventas por mes"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const canvas = ref(null);
let chartInstance = null;

// Datos de ejemplo
const labels = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const ventas = [3200, 4800, 5200, 6100, 15000, 9000, 7000, 8000, 9200, 11000, 12600, 14500];

const currencyFormatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });

onMounted(() => {
  const ctx = canvas.value.getContext('2d');

  // gradiente
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(47,85,151,0.16)');
  gradient.addColorStop(1, 'rgba(47,85,151,0.02)');

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Ventas',
        data: ventas,
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
              return currencyFormatter.format(context.parsed.y);
            }
          }
        }
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          beginAtZero: true,
          ticks: {
            callback: v => currencyFormatter.format(v)
          },
          grid: { color: 'rgba(0,0,0,0.06)' }
        }
      }
    }
  });
});

onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy();
});

/* Ejemplo de función que actualiza los datos (puedes llamarla tras fetch)
function updateChartData(newData) {
  if (!chartInstance) return;
  chartInstance.data.datasets[0].data = newData;
  chartInstance.update();
}*/
</script>

<style scoped>
.card {
  padding: 18px;
}
.chart-wrapper { height: 220px; }
</style>