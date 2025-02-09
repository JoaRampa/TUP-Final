<template>
  <cmLoader v-if="isLoading" :msg="msg || 'Transaccion eliminada!'"></cmLoader>
  <div class="container">    
    <h2 class="title">Últimos 50 movimientos</h2>
    <div class="container-items">
      <div v-for="(transaccion) in transacciones" :key="transaccion.idTransaccion" class="nrotransaccion">
        <div :class="{'transaccion-header': transaccion.tipo === 'ingreso' , 'venta': transaccion.tipo === 'venta'}">
          <p><strong>{{transaccion.tipo}} #{{ transaccion.idTransaccion }} - {{ transaccion.fecha.toString().slice(0, 10) }}</strong></p>
        </div>
        <div class="transaccion-body">
          <details>
            <summary>Ver detalles</summary>
            <div class="detalles-grid">
            <div v-for="(detalle, index) in transaccion.detalles" :key="index">
              <p><strong>Producto {{ index + 1 }}:</strong> {{ getProductDescription(detalle.idProduct) }}</p>
              <p>Cantidad: {{ detalle.cantidad }}</p>
              <p>Precio: ${{ detalle.precio }}</p>
            </div>
          </div>
          </details>
        </div>
        <div class="buttons">
          <button @click="openEditModal(transaccion)">Editar</button>
        </div>
      </div>
    </div>
  </div>

  <EditIngresoModal
    :isVisible="isModalVisible"
    :transaccion="selectedTransaccion"
    @close="closeEditModal"
    @submit="updateTransaccion"
  />
</template>

<script>
import { dataFetchMixin } from '@/mixins/dataFetchMixin.js';
import sStock from '@/services/sStock.js';
import EditIngresoModal from './EditIngresoModal.vue';
import cmLoader from '@/components/cmLoader.vue';

export default {
  mixins: [dataFetchMixin],
  components: { EditIngresoModal, cmLoader },
  data() {
    return {
      isModalVisible: false,
      selectedTransaccion: null,
      transacciones: [],
      isLoading: false,
      msg: null
    };
  },
  async created() {
    await this.fetchTransacciones();
  },
  methods: {
    async fetchTransacciones() {
      try {
        const res = await sStock.getAll();
        console.log("transacciones cargados:", res.data.transacciones);
        this.transacciones = res.data.transacciones
          .map(transaccion => ({
            ...transaccion,
          }))
          .reverse() // Revertir el orden de los transacciones
          .slice(0, 50);
      } catch (error) {
        console.error("Error al cargar transacciones:", error);
        this.transacciones = [];
      }
    },
    openEditModal(transaccion) {
      this.selectedTransaccion = { ...transaccion }; 
      this.isModalVisible = true;
    },
    closeEditModal() {
      this.isModalVisible = false;
      this.selectedTransaccion = null;
    },
    async updateTransaccion(updatedTransaccion) {
      if (this.isSubmitting) return; // Evitar que se ejecute si ya está enviando la solicitud
      this.isSubmitting = true;
      this.isLoading = true;
      try {
        const res = await sStock.edit({
          idTransaccion: updatedTransaccion.idTransaccion,
          detalles: updatedTransaccion.detalles,
        });
        this.msg = "Transaccion actualizada!";
        // Actualizar la lista de transacciones en el frontend
        const index = this.transacciones.findIndex(
          (t) => t.idTransaccion === updatedTransaccion.idTransaccion
        );
        if (index !== -1) this.transacciones[index] = updatedTransaccion;
        
        console.log("respuesta" , res.data);
        this.closeEditModal();
      } catch (error) {
        this.msg = "Error al actualizar la transaccion", error;
        console.error("Error al actualizar la transacción:", error);
      } finally {      
        setTimeout(() => {
          this.isLoading = false;
        }, 3000);}
    },
  },
};
</script>

<style>
.container-items {
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  text-align: left;
}

.nrotransaccion {
  border: 0.5px solid var(--border-color);
  border-radius: 0.5rem;
  max-width: 17rem;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Empuja .buttons al final */
  height: 100%;
}

.transaccion-header {
  background-color: var(--main-color);
  padding: .5rem;
}

.venta {
  background-color: rgb(13, 93, 44);
  padding: .5rem;
}

.transaccion-body p {
  padding: .25rem;
  font-size: 12px;
}

details {
  margin: 0.2rem;
}

.detalles-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Dos columnas */
  gap: 0.2rem; /* Espacio entre los elementos */
}

.buttons {
  display: flex;
}
</style>