<template>
  <Table title="Expenses history"
    :headers="['Description','Price','Date']"
    :fields="['description','price','date']"
    :rows="expenses"
  >
  </Table>
</template>

<script setup>
  import { onMounted } from 'vue';
  import Table from '../custom/table.vue';
  import { expenses, fetchExpenses } from '@/server';

  onMounted(async() => fetchExpenses());
</script>