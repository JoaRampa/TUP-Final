<template>
  <dashboardTitle/>
  <div class="grid-dashboard">
    <customCard>
      <template #media="{hovered}"><formNewExp><h4>{{ hovered ? 'ADD' : '' }}</h4></formNewExp></template>
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
        <router-link :to="{ name: 'sales' }" class="btnRegisterCash btnDashboard">
          <i class="fa-solid fa-cash-register" aria-hidden="true"></i>
          <h4>{{ hovered ? 'DETAILS' : '' }}</h4>
        </router-link>
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
import { expenses, fetchExpenses, transactions, fetchTransaction} from '@/server';
import { formatNumber } from '@/utils/formatNumber';
import { onMounted, ref } from 'vue';
import formNewExp from '@/components/expenses/formNew.vue';

const todayExpense = ref(0);
const todayBenefit = ref(0);
const isSameDay = (date1, date2) =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();

onMounted(async () => {
  await Promise.all([fetchExpenses(), fetchTransaction()]);
  todayExpense.value = expenses.value
    .filter(expense => isSameDay(new Date(expense.created_at), new Date()))
    .reduce((total, expense) => {
    return total + expense.price 
  }, 0)
  todayBenefit.value = transactions.value
    .filter(sale => isSameDay(new Date(sale.created_at), new Date()))
    .reduce((total, sale) => {
    return total + sale.total
  }, 0)
})
</script>

<style>
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
  border-radius: 8px;
}
.btnRegisterCash {
  background-color: #0d9cc4;
  text-decoration: none;
  color: var(--black);
}
</style>