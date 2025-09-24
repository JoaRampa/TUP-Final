<template>
  <Table title="Total products sales"
    :headers="['Name','Total benefit','Quantity sold', 'Total sales']"
    :fields="['id_product','benefit','q_sold', 'total_sales']"
    :rows="groupedSales"
  />
</template>

<script setup>
import { onMounted } from 'vue';
import { fetchSales} from '@/server';
import Table from '../custom/table.vue'
import { useGroupedSales } from '@/utils/groupedSales';

const groupedSales = useGroupedSales();
onMounted(() => {fetchSales();});
</script>