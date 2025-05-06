<template>
  <Table
    title="Total products sales"
    :headers="['Name','Total benefit','Quantity sold', 'Total sales']"
    :fields="['id_product','benefit','q_sold', 'total_sales']"
    :rows="groupedSales"
  />
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { fetchSales, sales, products } from '@/server';
import Table from '../custom/table.vue'

const groupedSales = computed(() => {
  const map = new Map();
  for (const item of sales.value) {
    const name = item.id_product;
    
    if (!map.has(name)) {
      const product = products.value.find(p => p.id === name);
      map.set(name, {
        id_product: product ? product.name : name,
        benefit: 0,
        q_sold: 0,
        total_sales: 0,
      });
    }
    
    const entry = map.get(name);
    entry.benefit += item.benefit;
    entry.q_sold += item.quantity;
    entry.total_sales += 1;
  }
  return Array.from(map.values());
});

onMounted(() => {fetchSales();});
</script>