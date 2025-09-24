import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  name: Yup.string().required('Required').min(3, 'Minimun 3 chars'),
  stock: Yup.number().required('Stock is required').positive('Stock > 0'),
  sale_price: Yup.number().required('Required').min(1, 'Must be at least 1'),
  cost_price: Yup.number().required('Required').min(0, 'Must be at least 0'),
});

export const saleSchema = Yup.object().shape({
  id_product: Yup.number().required('Required'),
  quantity: Yup.number().min(1, 'At least 1').required('Required'),
})
export const discountSchema = Yup.number().min(0, 'Must be between 0 and 100').max(100, 'Must be between 0 and 100');

export const expenseSchema = Yup.object().shape({
  description: Yup.string().required('Required').min(3, 'Minimun 3 chars'),
  price: Yup.number().required('Required').min(0.01, 'At least 0.01'),
  date: Yup.date().required("Required").max(new Date(), "Date cannot be in the future")
})