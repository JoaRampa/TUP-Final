import { supabase } from '@/lib/supabase';
import { ref } from 'vue';

export const sales = ref([]);
export const errorSales = ref(null);

export const fetchSales = async () => {
  const { data, errorSales: fetchError } = await supabase.from('sales').select('*');
  if (fetchError) {
    return errorSales.value = fetchError.message;
  } else {
    return sales.value = data;
  }
};