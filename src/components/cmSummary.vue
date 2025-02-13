<template>
  <div>    
    <div class="month">
      <select id="month" v-model="selectedMonth">
        <option v-for="(month, index) in months" :key="index" :value="index + 1">{{ month }}</option>
      </select>
      <select id="year" v-model="selectedYear">
        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
      </select>
      <button @click="fetchDataForSelectedMonth">&#128269;</button>
    </div>
    <div class="module">
      <div class="container">
        <h3 class="title">Análisis Mensual</h3>
        <div class="content">
          <p><strong>Mercaderia Ingresada:</strong> ${{ totalCostPriceSum.toFixed(2) }}</p>
          <p><strong>Costos del Local:</strong> ${{ billsSum.toFixed(2) }}</p>
          <p><strong>Ventas Totales:</strong> ${{ totalSalesSum.toFixed(2) }}</p>
          <p><strong>Ventas Ganancia Neta:</strong> ${{ totalNetEarnings.toFixed(2) }}</p>
          <p><strong>Margen de Ganancia Promedio:</strong> {{ ((totalNetEarnings / totalSalesSum) * 100).toFixed(2) }}%</p>
        </div>
        <h3 class="title" style="margin-top: .5rem;"><strong>Ganancia Total:</strong> ${{ (totalNetEarnings - billsSum).toFixed(2) }}</h3>
      </div>
      <div class="container">
        <h3>Total</h3>
        <h3>Mercadería en Stock: ${{ stockValue.toFixed(2) }} <p style="font-size: 12px;">(precio costo)</p></h3>
        <h3>Proyeccion total Ventas: ${{ stockSales.toFixed(2) }} <p style="font-size: 12px;">(margen de ganancias actual)</p></h3>
        <h3>Proyeccion total Ganancias: ${{ stockEarns.toFixed(2) }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { groupedProducts } from '@/mixins/groupedProducts';
import sBill from "@/services/sBill";
import sStock from '@/services/sStock';

export default {
  mixins: [groupedProducts],
  data() {
    return {
      stockValue: 0,
      stockSales: 0,
      stockEarns: 0,
      filteredBills:[],
      billsSum: 0,
      selectedMonth: new Date().getMonth() + 1,
      selectedYear: new Date().getFullYear(),
      months: [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ],
      years: Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i),
    };
  },
  async created() {
    await this.fetchTransaccionTotal();
    await this.fetchBills();
    await this.fetchTransaccion();
  },
  methods: {
    async fetchDataForSelectedMonth() {
      await this.fetchTransaccion();
      await this.fetchBills();
    },
    filterByMonth(data) {
      return data.filter(item => {
        const date = new Date(item.fecha || item.fecha_ingreso);
        return date.getMonth() + 1 === this.selectedMonth && date.getFullYear() === this.selectedYear;
      });
    },
    calculateTotalBillsSum() {
      this.billsSum = this.filteredBills.reduce((sum, bill) => sum + parseFloat(bill.total), 0);
    },
    async fetchBills() {
      try {
        const res = await sBill.getAll();
        this.filteredBills = this.filterByMonth(res.data.bills);
        this.calculateTotalBillsSum();
      } catch (error) {
        console.error("Error al cargar productos:", error);
        this.bills = [];
      }
    },
    async fetchTransaccion() {
      try {
        const res = await sStock.getAll();
        console.log(res.data)
        const filteredTransaccion = this.filterByMonth(res.data.transacciones);
        this.transaccion = filteredTransaccion;
        this.groupProducts(filteredTransaccion); // Pasa datos filtrados
      } catch (error) {
        console.error("Error al cargar Transacciones:", error);
        this.transacciones = [];
      }
    },
    async fetchTransaccionTotal() {
      try {
        const res = await sStock.getAll();
        this.groupProducts(res.data.transacciones); 
        //$nextTick garantiza la actualizacion del DOM
        this.$nextTick(() => {
          this.stockValue = this.totalCostPriceSum;
          this.stockEarns = this.stockValue * (this.totalNetEarnings / this.totalSalesSum);
          this.stockSales = parseFloat(this.stockValue + this.stockEarns);
        }); //calcula el valor total del stock $
      } catch (error) {
        console.error("Error al cargar Transacciones:", error);
        this.transacciones = [];
      }
    },
  },
}
</script>

<style scoped>
.content p {
  text-align: center;
  padding: 0.25rem;
  font-size: 1.15rem;
}

.month {
  display: flex;
  width: 50%;
}

.module {
  margin: 1rem;
}
</style>