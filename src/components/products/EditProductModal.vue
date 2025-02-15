<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h3>Editar Producto</h3>
      <form @submit.prevent="submitEdit">
        <input v-model="localProduct.prodCod" type="text" placeholder="Codigo del Producto" id="cod"/>
        <input id="nombreProd" v-model="localProduct.nombreProducto" type="text" placeholder="Nombre del Producto" required />
        <input id="precioRef" v-model="localProduct.precioRef" type="text" placeholder="Precio Publico" required />
        <input id="precioMay" v-model="localProduct.precioMayorista" type="text" placeholder="Precio Mayorista" />
        <button type="submit" :disabled="isSubmitting">Guardar Cambios</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
    product: Object,
  },
  data() {
    return {
      localProduct: { ...this.product }, // Clonar el producto en el estado local
      isSubmitting: false,
    };
  },
  watch: {
    product: {
      handler(newProduct) {
        this.localProduct = { ...newProduct }; // Actualizar el localProduct si la prop cambia
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
      this.$emit('submit', this.localProduct); // Emitir el producto editado
      this.isSubmitting = false;
      this.closeModal();
    },
  },
};
</script>

<style>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
  background-color: var(--main-modal-color);
  padding: 20px;
  border-radius: 5px;
}
.close {
  cursor: pointer;
  font-size: 1.5rem;
  color: #ff4444;
}

.close:hover {
  color: #cc0000;
}
</style>