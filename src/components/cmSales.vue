<template>
  <Button label="SELL" @click="sell" class="btnSales btnHome" />
  <Modal v-if="saleModal" @close="closeModal">
    <h3>New sale</h3>
    <div>
      <label for="product">Product</label>
      <select v-model="selectedProductId" :class="{'is-invalid': errors.selectedProductId}">
        <option v-for="prod in products" :key="prod.id" :value="prod.id">
          {{ prod.name }} (Stock: {{ prod.stock }}) (Price: {{ prod.sale_price }})
        </option>
      </select>
      <p v-if="errors.selectedProductId" class="error">{{ errors.selectedProductId }}</p>
    </div>
    <cInput v-model.number="quantity" type="number" label="Quantity" min="1" :error="errors.quantity" />
    <div class="center">
      <cInput v-model.number="discount" type="number" label="Discount (%)" min="0" max="100" :error="errors.discount"/>
      <label>Total: {{ total }}</label>
    </div>
    <Button label="Confirm" @click="registerSale" />
  </Modal>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { supabase } from '@/lib/supabase';
import { Button } from './custom/button';
import { products, fetchProducts } from '@/server';
import Modal from './custom/cModal.vue';
import cInput from './custom/cInput.vue';
import { saleSchema } from '../utils/schema';

const saleModal = ref(false);
const selectedProductId = ref(null);
const quantity = ref(0);
const discount = ref(0);
const errors = ref({})
const form = ref({
  quantity: 0,
  selectedProductId: null,
  discount: 0
})
const selectedProduct = computed(() =>
  products.value.find(p => p.id === selectedProductId.value)
);
const total = computed(() =>
  ((selectedProduct.value ? selectedProduct.value.sale_price * quantity.value : 0) * (1 - discount.value / 100)).toFixed(2)
);

const sell = () => saleModal.value = true;
const closeModal = () => saleModal.value = false;

onMounted(fetchProducts);

const registerSale = async () => {
  form.value = {
    selectedProductId: selectedProductId.value,
    quantity: quantity.value,
    discount: discount.value,
  };
  try {
    await saleSchema.validate(form.value, { abortEarly: false });
    const product = products.value.find(p => p.id === selectedProductId.value);
    const benefit = total.value - (product.cost_price * quantity.value);
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
  } catch (validationError){
    errors.value = {}
    validationError.inner.forEach(err => {
      errors.value[err.path] = err.message
    })
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