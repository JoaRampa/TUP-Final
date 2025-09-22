<template>
  <dashboardTitle/>
  <div class="grid-dashboard">
    <customCard>
      <template #media="{hovered}"><CmExpenses><h4>{{ hovered ? 'ADD' : '' }}</h4></CmExpenses></template>
      <template #title="{hovered}"><h4>{{ hovered ? '' : 'Today expenses' }}</h4></template>
      <template #value>{{ formatNumber(todayExpense) }}</template>
    </customCard>
    <customCard>
      <template #media="{hovered}"><cmSales><h4>{{ hovered ? 'ADD' : '' }}</h4></cmSales></template>
      <template #title="{hovered}"><h4>{{ hovered ? '' : 'Sales' }}</h4></template>
      <template #value>{{ formatNumber(todayBenefit) }}</template>
    </customCard>
    <customCard>
      <template #media="{hovered}">
        <button class="btnRegisterCash btnDashboard">
          <i class="fa-solid fa-cash-register" aria-hidden="true"></i>
          <h4>{{ hovered ? 'DETAILS' : '' }}</h4>
        </button>
      </template>
      <template #title="{hovered}"><h4>{{ hovered ? '' : 'Register cash' }}</h4></template>
      <template #value>{{ formatNumber(todayBenefit - todayExpense) }}</template>
    </customCard>
  </div>
  <dashboardFooter/>
</template>

<script setup>
import cmSales from '@/components/cmSales.vue';
import dashboardTitle from '@/components/dashboard/title.vue';
import dashboardFooter from '@/components/dashboard/footer.vue';
import customCard from '@/components/dashboard/customCard.vue';
import { expenses, fetchExpenses, sales, fetchSales} from '@/server';
import { formatNumber } from '@/utils/formatNumber';
import { onMounted, ref } from 'vue';
import CmExpenses from '@/components/cmExpenses.vue';

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
.dashboard-style button {
  border-radius: 8px;
}
.grid-dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
}
.btnDashboard{
  width: 5rem;
  height: 2.5rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btnRegisterCash {
  background-color: #0d9cc4;
}
</style>