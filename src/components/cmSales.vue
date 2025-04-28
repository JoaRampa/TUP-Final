<template>
  <Button label="SELL" @click="sell" class="btnSales btnHome" />
  <Modal v-if="saleModal" @close="closeModal">
    <h3 style="color: var(--text-green);">New sale</h3>
    <div v-for="(item, idx) in saleProds" :key="idx">
      <div class="center">
        <cInput v-model.number="item.id_product" list="product-list" label="Product" :errors="errors[idx].id_product" />
          <datalist id="product-list">
            <option v-for="prod in products" :key="prod.id" :value="prod.id">
              {{ prod.name }} (Stock: {{ prod.stock }}) (Price: {{ prod.sale_price }})
            </option>
          </datalist>
        <cInput v-model.number="item.quantity" type="number" label="Quantity" min="1" :error="errors[idx].quantity" />
        <Button label="X" @click="removeLine(idx)" />
      </div>
    </div>
    <Button label="Add" @click="addLine" />
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
const saleProds = ref([{id_product:null, quantity:1}]);
const discount = ref(0);
const errors = ref([{id_product:null, quantity: null}])

const prodTotal = idx => {
  const item = saleProds.value[idx];
  const prod = products.value.find(p => p.id === item.id_product)
  if (!prod) return 0
  else return prod.sale_price * item.quantity;
}
const total = computed(() =>
  ((saleProds.value.reduce((sum, _, i) => sum + prodTotal(i),0)) * (1 - discount.value / 100)).toFixed(2)
);

const addLine = () => {
  saleProds.value.push({ id_product: null, quantity: 1 });
  errors.value.push({});
}
const removeLine = idx => saleProds.value.splice(idx, 1);
const sell = () => saleModal.value = true;
const closeModal = () => saleModal.value = false;

onMounted(fetchProducts);

const registerSale = async () => {
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
  background-color: var(--back-green);
  color: var(--text-green);
 }
 .btnSales:hover {
  background-color: rgb(15, 129, 74)
 }
</style>