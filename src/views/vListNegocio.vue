<template>
  <div class="view">
    <ventaANegocio></ventaANegocio>
    <cmList></cmList>
  </div>
</template>

<script>
import ventaANegocio from '@/components/listNegocio/ventaANegocio.vue';
import cmList from '@/components/listNegocio/cmList.vue';
export default {
components: {
  ventaANegocio,
  cmList,
},
};
</script>