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

export const fetchSaleDetails = async (transactionId) => {
  const { data, error } = await supabase.from('sales').select(`
    id,
    id_transaction,
    id_product,
    quantity,
    benefit,
    created_at,
    product:products ( name )
  `).eq('id_transaction', transactionId);
  
  //console.log(data)
  if (error) {
    return [];
  } else {
    return data;
  }
}