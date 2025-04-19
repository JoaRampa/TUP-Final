import { supabase } from '@/lib/supabase';
import { ref } from 'vue';

export const expenses = ref([]);
export const errorExpenses = ref(null);

export const fetchExpenses = async () => {
  const { data, errorExpenses: fetchError } = await supabase.from('expenses').select('*');
  if (fetchError) {
    return errorExpenses.value = fetchError.message;
  } else {
    return expenses.value = data;
  }
};