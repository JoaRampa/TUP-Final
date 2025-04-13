import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  name: Yup.string().required('Required').min(3, 'Minimun 3 chars'),
  price: Yup.number().required('Price is required').positive('Price > 0'),
  amount: Yup.number().required('Required').integer('Must be a whole number').min(1, 'Must be at least 1'),
});