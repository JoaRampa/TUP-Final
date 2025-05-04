<template>
  <div class="form-group">
    <label :for="name">{{ label }}</label>
    <input
      :id="name"
      :name="name"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="updateValue"
      @keyup.enter="emitFilter"
      :class="['form-control', { 'is-invalid': error }]"
      :list="list"
    />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  label: String,
  type: { type: String, default: 'text' },
  modelValue: [String, Number],
  error: String,
  list: String,
  placeholder: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'filter']);
const updateValue = (e) => emit('update:modelValue', e.target.value);
const emitFilter = () => emit('filter', props.modelValue);
</script>

<style>
.form-group {
  margin-bottom: .5rem;
}
.form-control {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}
.is-invalid {
  border: 1px solid var(--border-color);
  border-color: red;
}
.error {
  color: red;
  font-size: 0.85rem;
}
</style>