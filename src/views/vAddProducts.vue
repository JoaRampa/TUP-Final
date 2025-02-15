<template>
  <div class="view">
    <newProduct></newProduct>
    <addList></addList>
  </div>
</template>

<script>
import newProduct from '@/components/products/newProduct.vue';
import addList from '@/components/listNegocio/addList.vue';
export default {
components: {
  newProduct,
  addList,
},
};
</script>