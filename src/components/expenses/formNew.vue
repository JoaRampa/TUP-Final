<template>
  <button @click="addExpense" class="btnExpense btnDashboard"><i class="fa-solid fa-arrow-down"></i><slot/></button>
  <Modal v-if="expenseModal" @close="closeModal">
    <h3>New expense</h3>
    <div class="modalFormDiv">
      <cInput type="text" v-model="description" label="Description" :error="errors.description"/>
      <cInput type="number" v-model.number="price" label="Price" :error="errors.price"/>
      <cInput type="date" v-model="date" label="Date" :error="errors.date"/>
      <Button class="btnConfirmAction" label="Confirm" @click="registerExpense" />
    </div>
  </Modal>
</template>

<script setup>
import { Button } from '../custom/button';
import cInput from '../custom/cInput.vue';
import Modal from '../custom/cModal.vue';
import { supabase } from '@/lib/supabase';
import { ref } from 'vue';
import { expenseSchema } from '../../utils/schema';

const expenseModal = ref(false);
const description = ref('');
const price = ref(0);
const date = ref(new Date().toISOString().split("T")[0]);
const errors = ref({});
const form = ref({
  description: null,
  price: 0,
  date: null
})

const addExpense = () => expenseModal.value = true;
const closeModal = () => expenseModal.value = false;

const registerExpense = async () => {
  form.value = {
    description: description.value,
    price: price.value,
    date: date.value
  };
  try {
    await expenseSchema.validate(form.value, {abortEarly: false})

    let data, error;
    ({data, error} = await supabase
      .from('expenses')
      .insert([{
        price: price.value,
        description: description.value,
        date: date.value
      }]));
      console.log(data);

    if(error){
      console.error("Database error:", error.message)
    }
    alert("Expense added")
    closeModal();
  } catch (validationError) {
    errors.value = {}
    validationError.inner.forEach(err => {
      errors.value[err.path] = err.message
    })
  }
}
</script>

<style scoped>
  .btnExpense { background-color: var(--red-color); }
</style>