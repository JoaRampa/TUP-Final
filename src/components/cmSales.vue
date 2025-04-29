<template>
  <Button label="SELL" @click="sell" class="btnSales btnHome" />
  <Modal v-if="saleModal" @close="closeModal">
    <h3 style="color: var(--text-green);">New sale</h3>
    <div v-for="(item, idx) in saleProds" :key="idx">
      <div class="center">
        <cInput v-model.number="item.id_product" list="product-list" label="Product" :error="errors[idx].id_product"/>
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
      <cInput v-model.number="discount" type="number" label="Discount (%)" :error="discountErr"/>
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
import { saleSchema, discountSchema } from '../utils/schema';

const saleModal = ref(false);
const saleProds = ref([{id_product:null, quantity:0}]);
const discount = ref(0);
const errors = ref([{id_product:null, quantity: null}]);
const discountErr = ref(null) 

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
  const lastIdx = saleProds.value.length - 1;
  const lastItem = saleProds.value[lastIdx];

  if (!lastItem.id_product) {
    errors.value[lastIdx].id_product = 'Select a product';
    return;
  }
  saleProds.value.push({ id_product: null, quantity: 1 });
  errors.value.push({});
}
const removeLine = idx => {
  saleProds.value.splice(idx, 1);
  errors.value.splice(idx, 1);
}
const sell = () => saleModal.value = true;
const closeModal = () => saleModal.value = false;

onMounted(fetchProducts);

const registerSale = async () => {
  errors.value = saleProds.value.map(() => ({id_product: null, quantity: null}));
  discountErr.value = null;
  try {
    await discountSchema.validate(discount.value, {abortEarly: false})
    for(let i = 0; i < saleProds.value.length; i++){
      await saleSchema.validate(saleProds.value[i], { abortEarly: false });
    }
    const { error: insertError } = await supabase.from('sales').insert(
      saleProds.value.map(item => {
        const product = products.value.find(p => p.id === item.id_product);
        const subtotal = product.sale_price * item.quantity;
        const discounted = subtotal * (1 - discount.value / 100);
        const benefit = discounted - (product.cost_price * item.quantity);

        return {
          id_product: item.id_product,
          quantity: item.quantity,
          benefit: benefit.toFixed(2),
        };
      })
    );

    if (insertError) throw insertError;

    for (let item of saleProds.value) {
      const product = products.value.find(p => p.id === item.id_product);
      const newStock = product.stock - item.quantity;

      const { error: updateError } = await supabase
        .from('products')
        .update({ stock: newStock })
        .eq('id', product.id);

      if (updateError) throw updateError;
    }
    alert('Ventas registradas correctamente');
    closeModal();
    saleProds.value = [{ id_product: null, quantity: 1 }];
    discount.value = 0;
    fetchProducts(); 
  } catch (ValidationError) {
    if (err.name === '') {
      if(err.path === 'discount') {
        discountErr.value = err.message;
      } else {
        err.inner.forEach(e => {
          const idx = saleProds.value.findIndex(item => item[e.path] === e.value);
          if (idx >= 0) {
            errors.value[idx][e.path] = e.message;
          }
        });
      }
    } else {
      alert('Error loading sale')
    }
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