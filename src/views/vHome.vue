<template>
  <h2>Dashboard</h2>
  <div class="dashboard-style">
    <div class="box-center">
      <i class="fa-solid fa-calendar-day" aria-hidden="true" style="margin-right: .75rem;"></i>
      <label type="text" class="date-input"> Hoy, {{ formatDate(today) }}</label>
    </div>
  </div>
  <div class="grid-dashboard">
    <div class="dashboard-style">
      <div class="box-center">
        <cmExpenses/>
        <h4>Daily expenses</h4>
      </div>
      <p class="dashboard-P">${{ formatNumber(todayExpense) }}</p>
    </div>
    <div class="dashboard-style">
      <div class="box-center">
        <cmSales/>
        <h4>Sell</h4>
      </div>
      <p class="dashboard-P">${{ formatNumber(todayBenefit) }}</p>
    </div>
    <div class="dashboard-style">
      <div class="box-center">
        <button class="btnRegisterCash btnDashboard">
          <i class="fa-solid fa-cash-register" aria-hidden="true"></i>
        </button>
        <h4>Today balance</h4>
      </div>
      <p class="dashboard-P">${{ formatNumber(todayBenefit - todayExpense) }}</p>
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
import { expenses, fetchExpenses, sales, fetchSales} from '@/server'
import { formatDate } from '@/utils/formatDate';
import { formatNumber } from '@/utils/formatNumber';
import { onMounted, ref } from 'vue';

const todayExpense = ref(0);
const todayBenefit = ref(0);
const currentDay = new Date().getDay();
const today = Date.now();

onMounted(async () => {
  await Promise.all([fetchExpenses(), fetchSales()]);
  todayExpense.value = expenses.value
    .filter(expense => {
      const expenseDate = new Date(expense.created_at);
      return expenseDate.getDay() === currentDay;
    })
    .reduce((total, expense) => {
    return total + expense.price
  }, 0)
  todayBenefit.value = sales.value
    .filter(sale => {
      const saleDate = new Date(sale.created_at);
      return saleDate.getDay() === currentDay;
    })
    .reduce((total, sale) => {
    return total + sale.benefit
  }, 0)
})
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
 grid-gap: 2rem;
}

.grid-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.btnDashboard{
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 1rem;
}
.btnRegisterCash {
  background-color: #0d9cc4;
}
.dashboard-P {
  margin: 0 12px;
  font-size: 28px;
  font-weight: 600;
}
</style>