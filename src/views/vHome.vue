<template>
  <div class="center cmp">
    <cmExpenses/>
    <cmSales/>
  </div>
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
  margin: 0.25rem 2rem;
  width: 95%;
}

.cmp *{
  margin: 0 3px;
}
</style>