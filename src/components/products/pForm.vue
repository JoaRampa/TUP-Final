<template>
  <form @submit.prevent="handleSubmit">
    <h3>{{ mode === 'edit' ? 'Edit Product' : 'New Product' }}</h3>
    <div class="modalFormDiv">
      <cInput v-model="form.name" type="text" label="Name" :error="errors.name" required />
      <cInput v-model="form.stock" type="number" label="Stock" :error="errors.stock" required />
      <cInput v-model="form.sale_price" type="number" label="Sale price" :error="errors.sale_price" required />
      <cInput v-model="form.cost_price" type="number" label="Cost price" :error="errors.cost_price" required />
      <button type="submit" class="btnConfirmAction">{{ mode === 'edit' ? 'Update' : 'Save' }}</button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { supabase } from '@/lib/supabase'
import {cInput} from '../custom'
import { productSchema } from '../../utils/schema'

const props = defineProps({
  product: {
    type: Object,
    default: null
  },
  mode: {
    type: String,
    default: 'new',
  }
})

const emit = defineEmits(['save','close'])
const errors = ref({})
const form = ref({
  name: '',
  stock: 0,
  sale_price: 0,
  cost_price: 0
})

watch(
  () => props.product,
  (newVal) => {if (props.mode === 'edit' && newVal) form.value = { ...newVal }},
  { immediate: true }
)

const handleSubmit = async () => {
  let data, error;
  try {
    await productSchema.validate(form.value, { abortEarly: false });
    if (props.mode === 'edit') {
      ({data, error} = await supabase
        .from('products')
        .update({
          name: form.value.name,
          stock: form.value.stock,
          sale_price: form.value.sale_price,
          cost_price: form.value.cost_price
        })
        .eq('id', props.product.id));
        console.log(data);
        alert(`Edited`);
    } else {
      ({data, error} = await supabase
      .from('products')
      .insert([ form.value ]));
      console.log(data);
      alert(`Added`);
    }
    if(error){
      console.error("Database error:", error.message)
    } else {
      emit('save')
    }
    emit('close')
  } catch (validationError) {
      errors.value = {}
      validationError.inner.forEach(err => {
        errors.value[err.path] = err.message
      })
    }
  }
</script>