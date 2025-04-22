<template>
  <div class="home">
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
.home {
  display: flex;
}
</style>