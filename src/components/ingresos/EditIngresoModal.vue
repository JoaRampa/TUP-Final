<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Editar Ingreso</h2>
      <form @submit.prevent="submitEdit">
        <div v-for="(producto, index) in localIngreso.detalles" :key="index" class="product-item">
          <p><strong>Producto:</strong> {{ getProductDescription(producto.idProduct) }}</p>
          <input v-model="producto.cantidad" type="decimal" placeholder="Cantidad" required />
          <input v-model="producto.precio" type="number" placeholder="Precio" required />
        </div>
        <button type="submit" :disabled="isSubmitting">Guardar Cambios</button>
      </form>
    </div>
  </div>
</template>

<script>
import { dataFetchMixin } from '@/mixins/dataFetchMixin.js';

export default {
  mixins: [dataFetchMixin],
  props: {
    isVisible: Boolean,
    transaccion: Object,
  },
  data() {
    return {
      localIngreso: { ...this.transaccion }, 
      isSubmitting: false,
    };
  },
  watch: {
    transaccion: {
      handler(newIngreso) {
        this.localIngreso = { ...newIngreso }; 
      },
      deep: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    async submitEdit() {
      this.isSubmitting = true;
      this.$emit('submit', this.localIngreso); 
      this.isSubmitting = false;
      this.closeModal();
    },
  },
};
</script>