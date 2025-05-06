import { supabase } from '@/lib/supabase';
import { ref } from 'vue';

export const transactions = ref([]);
export const errorTransactions = ref(null);

export async function fetchTransaction() {
  const { data, errorTransactions: fetchError } = await supabase.from('transaction').select('*');
  if (fetchError) {
    return errorTransactions.value = fetchError.message;
  } else {
    return transactions.value = data;
  }
}