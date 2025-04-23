import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  name: Yup.string().required('Required').min(3, 'Minimun 3 chars'),
  stock: Yup.number().required('Stock is required').positive('Stock > 0'),
  sale_price: Yup.number().required('Required').min(1, 'Must be at least 1'),
  cost_price: Yup.number().required('Required').min(0, 'Must be at least 0'),
});

export const saleSchema = Yup.object().shape({
  quantity: Yup.number().required('Required').min(1, 'At least 1').typeError('Invalid quantity'),
  selectedProductId: Yup.number().required('Required').typeError('Select a product'),
  discount: Yup.number().min(0, 'At least 0').max(100, 'Max 100').typeError('Invalid')
})