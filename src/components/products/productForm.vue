<template>
  <form @submit.prevent="handleSubmit">
    <h3>{{ mode === 'edit' ? 'Edit Product' : 'New Product' }}</h3>
    <cInput v-model="form.name" type="text" label="Name" required />
    <cInput v-model="form.stock" type="number" label="Stock" required />
    <cInput v-model="form.sale_price" type="number" label="Sale price" required />
    <cInput v-model="form.cost_price" type="number" label="Cost price" required />
    <button type="submit">{{ mode === 'edit' ? 'Update' : 'Save' }}</button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { supabase } from '@/lib/supabase'
import cInput from '../custom/cInput.vue'

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
  } else {
    ({data, error} = await supabase
    .from('products')
    .insert([ form.value ]));
    console.log(data);
  }
  if(error){
    console.error("Database error:", error.message)
  } else {
    emit('save') //act la lista
  }
  emit('close')
  }
</script>