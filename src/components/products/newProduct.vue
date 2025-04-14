<template>
  <form @submit.prevent="handleSubmit">
    <h3>Nuevo Producto</h3>
    <cInput v-model="form.name" type="text" label="Name" placeholder="Name" required />
    <cInput v-model="form.stock" type="number" label="Stock" placeholder="Stock" required />
    <cInput v-model="form.sale_price" type="number" label="Sale price" placeholder="Sale price" required />
    <cInput v-model="form.cost_price" type="number" label="Cost price" placeholder="Cost price" required />
    <button type="submit">Guardar</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import cInput from '../custom/cInput.vue'

const emit = defineEmits(['product-added','close'])

const form = ref({
  name: '',
  stock: 0,
  sale_price: 0,
  cost_price: 0
})

const handleSubmit = async () => {
  const { error } = await supabase
    .from('products')
    .insert([ form.value ])

  if(error){
    console.error("Error al insertar:", error.message)
  } else {
    emit('product-added') //act la lista
  }
  emit('close')
}
</script>