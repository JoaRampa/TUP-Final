<template>
  <div class="overlay" @click.self="close">
    <div class="modal">
      <Button label="X" @click="close" class="btnClose"/>
      <slot />
    </div>
  </div>
</template>

<script setup>
import {Button} from './button'
const emit = defineEmits(['close'])
const close = () => {emit('close')}
</script>

<style>
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
  position: relative;
  background-color: var(--white-color);
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
}

.btnClose {
  position: absolute;     
  right: 0.5rem;      
  width: 3rem;
  background-color: var(--white-color);
  color: var(--red-color);
  font-weight: 700;
  font-size: 16px;
  margin: 0;
}
.btnClose:hover {
  background-color: var(--red-color);
  color: var(--white-color);
}
</style>
