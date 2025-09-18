<template>
  <cmExpenses/>
  <cmSales/>
</template>

<script>
import cmExpenses from '@/components/cmExpenses.vue';
import cmSales from '@/components/cmSales.vue';
export default {
components: {
  cmExpenses,
  cmSales,
},
};
</script>

<style>
.center {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>