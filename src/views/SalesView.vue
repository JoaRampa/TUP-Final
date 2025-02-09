<template>
    <cmSales></cmSales>
    <cmStock></cmStock>
</template>

<script>
  import cmSales from '@/components/cmSales.vue';
  import cmStock from '@/components/cmStock.vue';
  export default {
  components: {
    cmSales,
    cmStock,
  },
};
</script>