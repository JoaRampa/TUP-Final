<template>
  <div class="overlay" @click.self="close">
    <div class="modal">
      <slot />
      <button class="close-modal" @click="close">Cerrar</button>
    </div>
  </div>
</template>

<script setup>
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
  z-index: 999;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
}

.close-modal {
  margin-top: 1rem;
}
</style>
