<template>
  <Button label="SELL" @click="sell" />
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
    <div>
      <label for="quantity">Quantity</label>
      <input type="number" v-model.number="quantity" min="1" />
    </div>
    <Button label="Confirm" @click="registerSale" />
  </Modal>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabase';
import { Button } from './custom/button';
import { products, fetchProducts } from '@/server';
import Modal from './custom/cModal.vue';

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

  const salePrice = product.sale_price;

  const { error: insertError } = await supabase.from('sales').insert([
    {
      price: salePrice,
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