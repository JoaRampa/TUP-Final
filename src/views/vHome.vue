<template>
  <div class="center vhome">
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
  justify-content: space-between;
}
.vhome * {
  margin: 0 .35rem;
}
</style>