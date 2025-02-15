<template>
  <div class="module">
    <div class="container">
        <h3 class="title">Venta Negocios</h3>
        <input ref="searchQueryInput" v-model="currentProduct.searchQuery" list="productList" id="listP" 
          placeholder="Selecciona o escribe un producto" @input="removeErrorBorder('searchQueryInput')"/>
          <datalist id="productList" v-if="currentProduct.searchQuery.length >= 3">
            <option v-for="product in availableProducts" :key="product.id" :value="product.nombreProducto" :data-id="product.id">
              {{ product.nombreProducto }}
            </option>
          </datalist>
          <div class="module">
            <input v-model="currentProduct.amount" type="decimal" placeholder="Botellas Vendidas" id="saleBottle"/>
            <select v-model="selectedSize">
              <option value="0.5">500ml</option>
              <option value="1">1</option>
              <option value="1.5">1.5L</option>
            </select>
          </div>
        <p>Stock disponible: {{groupedProducts.find((product) => product.idProduct === selectedProductId)
          ?.stock || 0}}
        </p>
        <input v-model="currentProduct.price" type="number" id="bottlePrice"
          placeholder="PRECIO POR BOTELLA / FINAL A NEGOCIO"/>
        <button type="button" @click="addProduct"><strong>Agregar Producto</strong></button>
    </div>
    <div class="container">
      <form @submit.prevent="handleSale" class="id-input" id="form-sale">
      <h3 class="title">Productos Agregados</h3>
      <ul>
        <li class="li" v-for="(product, index) in selectedProducts" :key="index">
          {{ product.nombreProducto }} --- Suma: ${{ product.totalProd }}
          <span class="close" @click="removeProduct(index)">&times;</span>
        </li>
      </ul>
      <button type="submit" id="submit-id"><strong>Cargar Venta</strong></button>
      <h4 style="margin: .75rem 0 .25rem;">TOTAL: ${{ total }}</h4>
    </form>
    </div>
  </div>
  <cmLoader v-if="isLoading" :msg="msg || 'Venta cargada con éxito!'"></cmLoader>
</template>

<script>
import sStock from '@/services/sStock';
import { groupedProducts } from '@/mixins/groupedProducts';
import cmLoader from '@/components/cmLoader.vue';
import { mapState } from "vuex";

export default {
  components: {cmLoader},
  mixins: [groupedProducts],
  data() {
    return {
      currentProduct: { searchQuery: "", amount: 1, price: "" },
      selectedProducts: [], 
      selectedProductId: null, 
      isLoading: false,
      msg: null,
      total: 0,
      selectedSize: 0.5,
    };
  },
  computed: {
    ...mapState(["products"]),
    availableProducts() {
      return this.products.filter(product => {
        const groupedProduct = this.groupedProducts.find(gp => gp.idProduct === product.id);
        return groupedProduct && groupedProduct.stock > 0;
      });
    },
  },
  watch: {
    "currentProduct.searchQuery"(newQuery) {
      const currentProduct = this.products.find(
        (product) => product.nombreProducto === newQuery);
      this.selectedProductId = currentProduct ? currentProduct.id : null;
    },
  },
  methods: {
    addProduct() {
      const selectedGroupedProduct = this.groupedProducts.find((product) => product.idProduct === this.selectedProductId);
      const cantidadEnLitros = parseFloat(this.currentProduct.amount) * parseFloat(this.selectedSize);
      const precioEnLitros = parseFloat(this.currentProduct.price) / parseFloat(this.selectedSize);
      //verifica que haya stock disponible (ingresos)
      if(selectedGroupedProduct && this.currentProduct.searchQuery !== "" && 
        cantidadEnLitros <= selectedGroupedProduct.stock){
        const product = {
          nombreProducto: this.currentProduct.searchQuery,
          amount: cantidadEnLitros,
          price: precioEnLitros,
          idProduct: this.products.find(p => p.nombreProducto === this.currentProduct.searchQuery)?.id,
          totalProd: cantidadEnLitros * precioEnLitros
        };
        this.total += product.totalProd;
        this.selectedProducts.push(product);
        this.currentProduct = { searchQuery: "", amount: 1, price: "" }; 
      } else { if (this.currentProduct.searchQuery === "") {
        this.$refs.searchQueryInput.classList.add('error-border');
        this.$refs.searchQueryInput.focus();
      }}
    },
    removeProduct(index) {
      this.selectedProducts.splice(index, 1);
    },
    removeErrorBorder(refName) {
      this.$refs[refName].classList.remove('error-border');
    },
    async handleSale() {
      this.isLoading = true;
      try {
        const products = this.selectedProducts.map(product => ({
          idProduct: product.idProduct,
          cantidad: product.amount,
          precio: product.price,
        }));
        const total = products.reduce((sum, product) => sum + product.cantidad * product.precio, 0);

        await sStock.createSale({ total, products, tipo: 'venta' });
      } catch (err) {
        this.msg = "Error al procesar la venta";
        console.error("Error al procesar la venta:", err);
      } finally {      
          setTimeout(() => {
            this.isLoading = false;
          }, 3000);
          this.selectedProducts = [];
          this.total= ""
      }
    },
  },
};
</script>