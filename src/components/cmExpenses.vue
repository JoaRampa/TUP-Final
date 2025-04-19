<template>
  <Button label="New expense" @click="addExpense" />
  <Modal v-if="expenseModal" @close="closeModal">
    <h3>New expense</h3>
    <cInput type="text" v-model="description" label="Description" />
    <cInput type="number" v-model.number="price" label="Price" />
    <Button label="Confirm" @click="registerExpense" />
  </Modal>
</template>

<script setup>
import { Button } from './custom/button';
import cInput from './custom/cInput.vue';
import Modal from './custom/cModal.vue';
import { supabase } from '@/lib/supabase';
import { ref } from 'vue';

const expenseModal = ref(false);
const description = ref('');
const price = ref(0);

const addExpense = () => expenseModal.value = true;
const closeModal = () => expenseModal.value = false;

const registerExpense = async () => {
  let data, error;

  ({data, error} = await supabase
    .from('expenses')
    .insert([{
      price: price.value,
      description: description.value,
    }]));
    console.log(data);

  if(error){
    console.error("Database error:", error.message)
  }
  alert("Expense added")
  closeModal();
}
</script>