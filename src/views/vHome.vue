<template>
  <dTitle/>
  <div class="grid-dashboard">
    <dCard>
      <template #media>
        <button @click="newModal" class="btnExpense btnDashboard"><i class="fa-solid fa-arrow-down"></i></button>
      </template>
      <template #title><h4>Today expenses</h4></template>
      <template #value>{{formatNumber(todayExpense)}}</template> 
    </dCard>
    <dCard>
      <template #media><cmSales/></template>
      <template #title><h4>Sales</h4></template>
      <template #value>{{formatNumber(todayBenefit)}}</template>
    </dCard>
    <dCard>
      <template #media>
        <router-link :to="{ name: 'sales' }" class="btnRegisterCash btnDashboard">
          <i class="fa-solid fa-cash-register" aria-hidden="true"></i>
        </router-link>
      </template>
      <template #title><h4>Register cash</h4></template>
      <template #value>{{formatNumber(todayBenefit - todayExpense)}}</template>
    </dCard>
  </div>
  <dFooter/>
  <cModal v-if="newExpModal" @close="closeModal">
    <eForm mode="new" @save="fetchExpenses" @close="closeModal"/>
  </cModal>
</template>

<script setup>
import cmSales from '@/components/cmSales.vue';
import { dCard, dTitle, dFooter } from '@/components/dashboard';
import { cModal } from '@/components/custom';
import { expenses, fetchExpenses, transactions, fetchTransaction} from '@/server';
import { formatNumber } from '@/utils/formatNumber';
import { onMounted, ref } from 'vue';
import eForm from '@/components/expenses/eForm.vue';

const todayExpense = ref(0);
const todayBenefit = ref(0);
const newExpModal = ref(false);
const closeModal = () => { newExpModal.value = false };

const newModal = () => newExpModal.value = true;
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
  color: var(--black);
}
.btnRegisterCash:hover { color: var(--white-color); }
.btnExpense { background-color: var(--red-color); }
.btnExpense:hover { background-color: var(--red-color); }
</style>