<template>
  <div class="form-group">
    <label :for="name">{{ label }}</label>
    <input
      :id="name"
      :name="name"
      :type="type"
      v-model="modelValue"
      :class="['form-control', { 'is-invalid': error }]"
    />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'CustomInput',
  props: {
    name: String,
    label: String,
    type: {
      type: String,
      default: 'text'
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    error: String
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
.form-control {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}
.is-invalid {
  border-color: red;
}
.error {
  color: red;
  font-size: 0.875rem;
}
</style>