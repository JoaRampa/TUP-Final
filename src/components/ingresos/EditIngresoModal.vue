<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Editar Ingreso</h2>
      <form @submit.prevent="submitEdit">
        <div v-for="(producto, index) in localIngreso.detalles" :key="index" class="product-item">
          <p><strong>Producto:</strong> {{ getProductDescription(producto.idProduct) }}</p>
          <input v-model="producto.cantidad" type="decimal" placeholder="Cantidad" required id="editIngreso"/>
          <input v-model="producto.precio" type="decimal" placeholder="Precio" required id="editpriceIngreso" />
        </div>
        <button type="submit" :disabled="isSubmitting">Guardar Cambios</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    isVisible: Boolean,
    transaccion: Object,
    getProductDescription: Function
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
      this.localIngreso.detalles.forEach(detalle => {
        detalle.precio = parseFloat(detalle.precio);
        detalle.cantidad = parseFloat(detalle.cantidad)
      });
      const nuevoTotal = this.localIngreso.detalles.reduce((sum, item) => sum + item.cantidad * item.precio,0);
      this.localIngreso.total = nuevoTotal
      this.$emit('submit', [this.localIngreso]);
      this.isSubmitting = false;
      this.closeModal();
    },
  },
};
</script>