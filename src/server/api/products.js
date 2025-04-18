import { supabase } from '@/lib/supabase';
import { ref } from 'vue';

export const products = ref([]);
export const error = ref(null);

export const fetchProducts = async () => {
  const { data, error: fetchError } = await supabase.from('products').select('*');
  if (fetchError) {
    return error.value = fetchError.message;
  } else {
    return products.value = data;
  }
};