<template>
  <div class="dashboard-style">
    <div class="grid-info ">
      <div>
        <monthlyChart/>
      </div>
      <div>
        <topProductsChart/>
      </div>
    </div>
  </div>
</template>

<script setup>
  import monthlyChart from '../monthlyChart.vue';
  import topProductsChart from '../topProductsChart.vue';
</script>

<style scoped>
.dashboard-style{
  padding: 0;
}
.grid-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>