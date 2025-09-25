<template>
  <cTable title="Total products sales"
    :headers="['Name','Sumed benefit', 'Product earn','Quantity sold', 'Total sales']"
    :fields="['id_product','totalBenefit', 'singleBenefit', 'q_sold', 'total_sales']"
    :rows="groupedSales"
  />
</template>

<script setup>
import { onMounted } from 'vue';
import { fetchSales} from '@/server';
import {cTable} from '../custom'
import { useGroupedSales } from '@/utils/groupedSales';

const groupedSales = useGroupedSales();
onMounted(() => {fetchSales();});
</script>