<template>
  <form @submit.prevent="handleSubmit(onSubmit)">
    <CustomInput name="name" label="Name" type="text" :error="errors.name" v-model="values.name" />
    <CustomInput name="email" label="Email" type="email" :error="errors.email" v-model="values.email" />
    <CustomInput name="password" label="Password" type="password" :error="errors.password" v-model="values.password" />
    <CustomInput name="confirmPassword" label="Confirm Password" type="password" :error="errors.confirmPassword" v-model="values.confirmPassword" />
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import CustomInput from './components/CustomInput.vue'

export default {
  components: { CustomInput },
  setup() {
    const schema = yup.object({
      name: yup.string().required("Name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required("Confirm your password"),
    })

    const { handleSubmit, errors, values } = useForm({
      validationSchema: schema,
      initialValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      }
    })

    const onSubmit = (data) => {
      console.log(data)
    }

    return { handleSubmit, errors, values, onSubmit }
  }
}
</script>