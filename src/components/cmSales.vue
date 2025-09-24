<template>
  <button @click="sell" class="btnSales btnDashboard"><i class="fa-solid fa-cart-shopping"></i><slot/></button>
  <Modal v-if="saleModal" @close="closeModal">
    <h3>New sale</h3>
    <div class="modalFormDiv">
      <div v-for="(item, idx) in saleProds" :key="idx">
      <div class="sale-inputs-div">
        <label class="form-group">
            Product
            <select v-model.number="item.id_product" @change="onProductChange(idx)" class="product-select">
              <option :value="null">-- Select product --</option>
              <option v-for="prod in availableProducts" :key="prod.id" :value="prod.id">
                {{ prod.id }} - {{ prod.name }} (${{ prod.sale_price }}) (Stock {{ prod.stock }})
              </option>
            </select>
        </label>
        <cInput v-model.number="item.quantity" type="number" label="Quantity" min="1" :error="errors[idx].quantity"/>
        <div class="removeBtn">
          <Button v-if=" (item.id_product !== null || item.quantity > 0)" 
            label="X" @click="removeLine(idx)" class="btnClose"/>
        </div>
      </div>
    </div>
    <div class="center">
      <!--<cInput v-model.number="discount" type="number" label="Discount (%)" :error="discountErr"/>-->
      <label>Total: {{ total }}</label>
    </div>
    <button class="btnConfirmAction" @click="registerSale" :disabled="!canConfirm">Confirm</button>
    </div>
  </Modal>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
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
const discountErr = ref(null);

const availableProducts = computed(() => {
  return products.value ? products.value.filter(p => Number(p.stock) > 0) : [];
});
const canConfirm = computed(() => {
  return saleProds.value.some(p => p.id_product && p.quantity > 0);
});
const prodTotal = idx => {
  const item = saleProds.value[idx];
  const prod = products.value.find(p => p.id === item.id_product)
  if (!prod) return 0
  else return prod.sale_price * item.quantity;
}
const onProductChange = (idx) => {
  const item = saleProds.value[idx];
  if (item && item.id_product && (!item.quantity || item.quantity === 0)) {
    item.quantity = 1;
  }
};
const total = computed(() =>
  ((saleProds.value.reduce((sum, _, i) => sum + prodTotal(i),0)) * (1 - discount.value / 100)).toFixed(2)
);

const addEmptyLine = () => {
  saleProds.value.push({ id_product: null, quantity: 0 });
  errors.value.push({ id_product: null, quantity: null });
};
watch(
  () => saleProds.value.map(p => ({ id_product: p.id_product })), // solo observar id changes
  (newVal, oldVal) => {
    const lastIdx = newVal.length - 1;
    const lastNew = newVal[lastIdx];
    const lastOld = oldVal ? oldVal[oldVal.length - 1] : undefined;

    if (lastNew && lastNew.id_product && (!lastOld || !lastOld.id_product)) {
      addEmptyLine();
    }
  },
  { deep: true }
);
const removeLine = idx => {
  saleProds.value.splice(idx, 1);
  errors.value.splice(idx, 1);
}
const sell = () => saleModal.value = true;
const closeModal = () => saleModal.value = false;

onMounted(fetchProducts);

const registerSale = async () => {
  // reiniciar errores
  errors.value = saleProds.value.map(() => ({ id_product: null, quantity: null }));
  discountErr.value = null;
  let hasErrors = false;

  //Valida que haya un prod
  const validLines = saleProds.value.filter(i => i.id_product);
  if (validLines.length === 0) {
    alert('Debe cargar al menos un producto para registrar la venta');
    return;
  }

  try {
    await discountSchema.validate(discount.value, { abortEarly: false });
  } catch (discountError) {
    discountErr.value = discountError.errors[0];
    hasErrors = true;
  }

  for (let i = 0; i < saleProds.value.length; i++) {
    if (!saleProds.value[i].id_product) continue;
    try {
      await saleSchema.validate(saleProds.value[i], { abortEarly: false });
    } catch (productError) {
      productError.inner.forEach(err => {
        errors.value[i][err.path] = err.message;
      });
      hasErrors = true;
    }
  }

  if (hasErrors) return;

  try {
    let totalBenefit = 0;
    const salesEntries = saleProds.value
      .filter(item => item.id_product) 
      .map(item => {
        const product = products.value.find(p => p.id === item.id_product);
        const subtotal = product.sale_price * item.quantity;
        const discounted = subtotal * (1 - discount.value / 100);
        const benefit = discounted - (product.cost_price * item.quantity);
        totalBenefit += benefit;
        return {
          id_product: item.id_product,
          quantity: item.quantity,
          sale_price: product.sale_price,
          cost_price: product.cost_price,
          discount: discount.value
        };
      });

    const { data: transactionData, error: transactionError } = await supabase
      .from('transaction').insert([{ total: totalBenefit.toFixed(2) }]).select().single();

    if (transactionError) throw transactionError;

    const { error: insertError } = await supabase.from('sales').insert(
      salesEntries.map(entry => ({ ...entry, id_transaction: transactionData.id }))
    );
    if (insertError) throw insertError;

    // actualizar stock solo para líneas con producto
    for (let item of saleProds.value.filter(i => i.id_product)) {
      const product = products.value.find(p => p.id === item.id_product);
      const newStock = product.stock - item.quantity;
      const { error: updateError } = await supabase
        .from('products')
        .update({ stock: newStock })
        .eq('id', product.id);
      if (updateError) throw updateError;
    }

    alert('Sales registred');
    closeModal();
    saleProds.value = [{ id_product: null, quantity: 0 }];
    discount.value = 0;
    fetchProducts();
  } catch (dbError) {
    console.error('Error', dbError);
    alert('Ups! error ocurred');
  }
};
</script>

<style scoped>
  .btnSales {
    background-color: var(--green-color);
  }
  .btnClose {
    width: auto;
    font-size: 12px;
  }
  .sale-inputs-div {
    display: flex;
    align-items: center; 
  }
  .removeBtn {
    display: flex;
    align-items: center;   
    justify-content: center;
    margin-top: 1.1rem;
  }
</style>