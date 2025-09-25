<template>
  <div class="center headerProd">
    <label style="margin: 0;"><i class="fa-solid fa-angle-double-down"></i></label>
    <h2>Expenses</h2>
    <Button label="+New expense" @click="newModal" class="btnAddExp"/>
  </div>
  <cTable
    :headers="['Description','Price','Date', ' ']"
    :fields="['description','price','date', 'actions']"
    :rows="expenses"
  >
    <template #cell-actions="{ row }">
      <Button class="btnConfirmAction" label="Edit" @click="editModal(row)" />
    </template>
  </cTable>
  <cModal v-if="editExpenseModal" @close="closeModal">
    <eForm mode="edit" :expense="selectedExp" @close="closeModal" @save="fetchExpenses"/>
  </cModal>
  <cModal v-if="newExpModal" @close="closeModal">
    <eForm mode="new" @save="fetchExpenses" @close="closeModal"/>
  </cModal>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { cTable, Button, cModal } from '../custom';
  import { expenses, fetchExpenses } from '@/server';
  import eForm from './eForm.vue';

  const editExpenseModal = ref(false);
  const newExpModal = ref(false);
  const selectedExp = ref(null);
  onMounted(async() => fetchExpenses());
  
  const newModal = () => newExpModal.value = true;
  const editModal = (exp) => {
    selectedExp.value = exp;
    editExpenseModal.value = true;
  }
  const closeModal = () => {
    newExpModal.value = false;
    editExpenseModal.value = false;
    selectedExp.value = null;
  };
</script>

<style>
.btnAddExp {
  width: 8rem;
  margin: 0;
  background-color: var(--white-color);
  color: var(--red-color);
  border: 1px solid var(--red-color);
  font-weight: 600;
}
.btnAddExp:hover {
  background-color: var(--red-color);
  color: var(--white-color);
}
</style>