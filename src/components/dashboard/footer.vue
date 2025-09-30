<template>
  <div class="dashboard-style">
    <div class="grid-info ">
      <mostSolds/>
      <betterBenefits/>
    </div>
  </div>
</template>

<script setup>
  import mostSolds from '../charts/mostSolds.vue';
  import betterBenefits from '../charts/betterBenefits.vue';
</script>

<style scoped>
.dashboard-style{ padding: 0; }
.grid-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>