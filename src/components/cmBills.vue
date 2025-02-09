<template>
  <div class="module">
    <div class="container">
      <h2 class="title">Gastos del Local</h2>
      <form @submit.prevent="addBills" class="id-input" id="form-bills">
        <input v-model="descripcion" type="text" id="descripcion" placeholder="Nombre del gasto del local" required>
        <input v-model="total" type="decimal" id="total" placeholder="Total a pagar" required/>
        <button type="submit" id="submit-id">Agregar Gasto</button>
      </form>
    </div>
    <div class="container">
      <h2 class="title">Gastos del Mes</h2>
      <ul>
        <li v-for="bill in filteredBills" :key="bill.id" class="li">
          {{ bill.descripcion }} --- ${{ bill.total }} --- {{ formatDate(bill.fecha) }}
          <span class="close" @click="removeBill(bill.id)">&times;
          </span>
        </li>
      </ul>
    </div>
  </div>
  <cmLoader v-if="isLoading" :msg="msg || 'Gasto agregado!'"></cmLoader>
</template>

<script>
import sBill from "@/services/sBill";
import cmLoader from '@/components/cmLoader.vue';

export default {
  components: {cmLoader},
  data() {
    return {
      descripcion: null,
      total: null,
      bills: [],
      isLoading: false,
      msg: null
    };
  },
  async created() {
    await this.fetchBills();
  },
  computed: {
    filteredBills() {
      return this.bills.filter(bill => this.isCurrentMonth(bill.fecha)) || "";
    }
  },
  methods: {
    isCurrentMonth(fecha) {
    let date = new Date(fecha); // Convierte la fecha si es string
    let current = new Date();
    return date.getMonth() === current.getMonth() && date.getFullYear() === current.getFullYear();
    },
    formatDate(fecha) {
      return fecha ? new Date(fecha).toISOString().slice(0, 10) : "Fecha no disponible";
    },
    async fetchBills() {
      try {
        const res = await sBill.getAll();
        this.bills = res.data.bills;
        console.log("Respuesta del servidor: ", res.data);
      } catch (error) {
        console.error("Error al agregar:", error);
      }
    },
    async addBills() {
      this.isLoading = true;
      try {
        const res = await sBill.add({
          descripcion: this.descripcion,
          total: this.total,
        });
        console.log("Respuesta del servidor: ", res.data);
        this.fetchBills();
      } catch (error) {
        console.error("Error al agregar:", error);
        this.msg = "Error al agregar ". error;
      } finally {      
        setTimeout(() => {
          this.isLoading = false;
        }, 4000);}
    },
    async removeBill(id) {
      try {
        const res = await sBill.delete(id);
        this.fetchBills();
        console.log("Eliminado: ", res.data);
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    },
  },
};
</script>