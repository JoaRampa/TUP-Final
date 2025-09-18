<template>
  <div class="overlay" @click.self="close">
    <div class="modal">
      <slot />
      <Button label="Close" @click="close" class="btnClose"/>
    </div>
  </div>
</template>

<script setup>
import {Button} from './button'
const emit = defineEmits(['close'])
const close = () => {emit('close')}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal {
  background-color: var(--white-color);
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
}
.btnClose:hover {
  background-color: var(--back-red);
}
</style>
