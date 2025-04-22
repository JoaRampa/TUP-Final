<template>
  <Button label="SELL" @click="sell" class="btnSales btnHome" />
  <Modal v-if="saleModal" @close="closeModal">
    <h3>New sale</h3>
    <div>
      <label for="product">Product</label>
      <select v-model="selectedProductId">
        <option v-for="prod in products" :key="prod.id" :value="prod.id">
          {{ prod.name }} (Stock: {{ prod.stock }})
        </option>
      </select>
    </div>
    <cInput v-model.number="quantity" type="number" label="Quantity" min="1" />
    <Button label="Confirm" @click="registerSale" />
  </Modal>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabase';
import { Button } from './custom/button';
import { products, fetchProducts } from '@/server';
import Modal from './custom/cModal.vue';
import cInput from './custom/cInput.vue';

const saleModal = ref(false);
const selectedProductId = ref(null);
const quantity = ref(1);

const sell = () => saleModal.value = true;
const closeModal = () => saleModal.value = false;

onMounted(fetchProducts);

const registerSale = async () => {
  const product = products.value.find(p => p.id === selectedProductId.value);
  if (!product) return alert('Seleccioná un producto');

  if (quantity.value > product.stock) {
    return alert('No hay stock suficiente');
  }

  const benefit = (product.sale_price - product.cost_price) * quantity.value;

  const { error: insertError } = await supabase.from('sales').insert([
    {
      benefit,
      quantity: quantity.value,
      id_product: selectedProductId.value,
    }
  ]);

  const newStock = product.stock - quantity.value;
  const { error: updateError } = await supabase
    .from('products')
    .update({ stock: newStock })
    .eq('id', selectedProductId.value);

  if (insertError || updateError) {
    console.error(insertError || updateError);
    alert('Error al registrar la venta');
  } else {
    alert('Venta registrada correctamente');
    closeModal();
    fetchProducts(); 
  }
};
</script>

<style>
 .btnSales {
  background-color: rgb(11, 88, 51);
  color: rgb(27, 230, 131);
 }
 .btnSales:hover {
  background-color: rgb(15, 129, 74)
 }
</style>