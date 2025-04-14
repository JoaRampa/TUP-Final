<template>
  <div>
    <Button label="Add product" @click="openModal" />
    <Modal v-if="showModal" @close="closeModal">
      <NewProduct @product-added="fetchProducts" @close="closeModal"/>
    </Modal>
    <p v-if="error">Error: {{ error }}</p>
    <p v-if="!products.length">No hay productos</p>
    <table v-else>
      <thead>
        <tr>
          <th>Name</th>
          <th>Stock</th>
          <th>Sale price</th>
          <th>Cost price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prod in products" :key="prod.id">
          <td><strong>{{ prod.name }}</strong></td>
          <td><strong>{{ prod.stock }}</strong></td>
          <td><strong>{{ prod.sale_price }}</strong></td>
          <td><strong>{{ prod.cost_price }}</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabase';
import { Button } from '../custom/button';
import Modal from '../custom/cModal.vue';
import NewProduct from './newProduct.vue';

const products = ref([]);
const error = ref(null);
const showModal = ref(false);

const fetchProducts = async () => {
  const { data, error: fetchError } = await supabase.from('products').select('*');
  if (fetchError) {
    error.value = fetchError.message;
  } else {
    products.value = data;
  }
};

onMounted(fetchProducts);
const openModal = () => showModal.value = true
const closeModal = () => showModal.value = false
</script>

<style>
table {
  margin: 0.25rem 2rem;
  width: 95%;
  border-radius: .5rem;
  border: 1px solid var(--border-color);
  background-color:var(--main-modal-color);
  padding: 0.5rem
}

th, td {
  text-align: left;
}
</style>