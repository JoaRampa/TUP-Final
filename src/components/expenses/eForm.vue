<template>
  <form @submit.prevent="handleSubmit">
    <h3>{{ mode === 'edit' ? 'Edit Expense' : 'New Expense' }}</h3>
    <div class="modalFormDiv">
      <cInput v-model="form.description" type="text" label="Description" :error="errors.description" required />
      <cInput v-model="form.price" type="number" label="Price" :error="errors.price" required />
      <cInput v-model="form.date" type="date" label="Date" :error="errors.date" required />
      <button type="submit" class="btnConfirmAction">{{ mode === 'edit' ? 'Update' : 'Save' }}</button>
    </div>
  </form>
</template>

<script setup>
import { cInput} from '../custom';
import { supabase } from '@/lib/supabase';
import { ref, watch } from 'vue';
import { expenseSchema } from '../../utils/schema';

const props = defineProps({
  expense: {
    type: Object,
    default: null
  },
  mode: {
    type: String,
    default: 'new',
  }
})

const emit = defineEmits(['save','close'])
const errors = ref({});
const form = ref({
  description: null,
  price: 0,
  date: null
})
watch(
  () => props.expense,
  (newVal) => {if (props.mode === 'edit' && newVal) form.value = { ...newVal }},
  { immediate: true }
)

const handleSubmit = async () => {
  let data, error;
  try {
    await expenseSchema.validate(form.value, { abortEarly: false });
    if (props.mode === 'edit') {
      ({data, error} = await supabase
        .from('expenses')
        .update({
          description: form.value.description,
          price: form.value.price,
          date: form.value.date
        })
        .eq('id', props.expense.id));
        console.log(data);
    } else {
      ({data, error} = await supabase
      .from('expenses')
      .insert([ form.value ]));
      console.log(data);
    }
    if(error){
      console.error("Database error:", error.message)
    } else {
      emit('save') //act la lista
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