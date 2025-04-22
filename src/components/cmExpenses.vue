<template>
  <Button label="New expense" @click="addExpense" class="btnExpense btnHome"/>
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

<style>
.btnHome {
  height: 150px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: .1em;
}
.btnExpense {
  background-color: #911919;
  color: rgb(216, 124, 124);
 }
 .btnExpense:hover {
  background-color: rgb(176, 19, 19)
 }
</style>