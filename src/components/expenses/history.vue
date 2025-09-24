<template>
  <Table title="Expenses history"
    :headers="['Description','Price','Date']"
    :fields="['description','price','created_at']"
    :rows="expenses"
  >
    <template #cell-created_at="{ row }">{{ formatDate(row.created_at) }}<button class="btnSupport">-</button></template>
  </Table>
</template>

<script setup>
  import { onMounted } from 'vue';
  import Table from '../custom/table.vue';
  import { expenses, fetchExpenses } from '@/server';
  import { formatDate } from '@/utils/formatDate';

  onMounted(async() => fetchExpenses());
</script>

<style>  
 .btnSupport {
  background-color: var(--white-color);
  cursor: auto;
  color: var(--white-color);
 }
 .btnSupport:hover{
  background-color: var(--white-color);
 }</style>