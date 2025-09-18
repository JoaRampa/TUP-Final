<template>
  <h2>Dashboard</h2>
  <div class="dashboard-style">
    <div class="date-box">
      <i class="fa-solid fa-calendar-day" aria-hidden="true"></i>
      <label type="text" class="date-input"> Hoy, {{ formatDate(today) }}</label>
    </div>
  </div>
  <div class="grid-dashboard">
    <cmExpenses/>
    <cmSales/>
    <cmExpenses/>
  </div>
  <div class="dashboard-style">
    <div class="grid-info ">
      <div>
        <h4>Sales</h4>
      </div>
      <div>
        <h4>Best sellers</h4>
      </div>
    </div>
  </div>
</template>

<script setup>
import cmExpenses from '@/components/cmExpenses.vue';
import cmSales from '@/components/cmSales.vue';
import { formatDate } from '@/utils/formatDate';
const today = Date.now();
</script>

<style>
.dashboard-style {
  padding: 0.5rem 1rem;
  border: 1px solid #00000050;
  border-radius: .3rem;
  margin: 2rem 0;
  background-color: aliceblue;
}
.date-box {
  display: flex;
  align-items: center;
}

.grid-dashboard {
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 grid-gap: 10px;
}

.grid-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

h4 {
  margin: 0;
}
</style>