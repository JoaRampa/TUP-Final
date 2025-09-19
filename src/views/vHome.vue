<template>
  <dashboardTitle/>
  <div class="grid-dashboard">
    <customCard>
      <template #media><cmExpenses/></template>
      <template #title><h4>Daily expenses</h4></template>
      <template #value>{{ formatNumber(todayExpense) }}</template>
    </customCard>
    <customCard>
      <template #media><cmSales/></template>
      <template #title><h4>Sell</h4></template>
      <template #value>{{ formatNumber(todayBenefit) }}</template>
    </customCard>
    <customCard>
      <template #media>
        <button class="btnRegisterCash btnDashboard">
          <i class="fa-solid fa-cash-register" aria-hidden="true"></i>
        </button></template>
      <template #title><h4>Today balance</h4></template>
      <template #value>{{ formatNumber(todayBenefit - todayExpense) }}</template>
    </customCard>
  </div>
  <dashboardFooter/>
</template>

<script setup>
import cmExpenses from '@/components/cmExpenses.vue';
import cmSales from '@/components/cmSales.vue';
import dashboardTitle from '@/components/dashboard/title.vue';
import dashboardFooter from '@/components/dashboard/footer.vue';
import customCard from '@/components/dashboard/customCard.vue';
import { expenses, fetchExpenses, sales, fetchSales} from '@/server';
import { formatNumber } from '@/utils/formatNumber';
import { onMounted, ref } from 'vue';

const todayExpense = ref(0);
const todayBenefit = ref(0);
const currentDay = new Date().getDay();

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
.btnDashboard{
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 1rem;
}
.btnRegisterCash {
  background-color: #0d9cc4;
}
</style>