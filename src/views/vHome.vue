<template>
  <h2>Dashboard</h2>
  <div class="dashboard-style">
    <div class="box-center">
      <i class="fa-solid fa-calendar-day" aria-hidden="true" style="margin-right: .75rem;"></i>
      <label type="text" class="date-input"> Hoy, {{ formatDate(today) }}</label>
    </div>
  </div>
  <div class="grid-dashboard">
    <div class="dashboard-style box-center">
      <cmExpenses/>
      <h4>Expenses</h4>
    </div>
    <div class="dashboard-style box-center">
      <cmSales/>
      <h4>Sell</h4>
    </div>
    <div class="dashboard-style box-center">
      <button class="btnRegisterCash">
        <i class="fa-solid fa-cash-register" aria-hidden="true"></i>
      </button>
      <h4>Today balance</h4>
    </div>
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
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: .3rem;
  margin: 1.5rem 0;
  box-shadow: 0 0 1px 2px rgba(0,0,0,0.02);
}
.dashboard-style button {
  border-radius: 1000px;
}
.box-center {
  display: flex;
  align-items: center;
}

.grid-dashboard {
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 grid-gap: 3rem;
}

.grid-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

h4 {
  margin: 0;
}

.btnRegisterCash {
  width: 2.5rem;
  height: 2.5rem;
  background-color: #0d9cc4;
  margin-right: 1rem;
}
</style>