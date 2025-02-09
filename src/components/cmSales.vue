<template>
  <div class="module">
    <div class="container">
        <h2 class="title">Venta</h2>
        <input ref="searchQueryInput" v-model="currentProduct.searchQuery" list="productList" 
          placeholder="Selecciona o escribe un producto" @input="removeErrorBorder('searchQueryInput')"/>
          <datalist id="productList">
            <option v-for="product in availableProducts" :key="product.id" :value="product.nombreProducto" :data-id="product.id">
              {{ product.nombreProducto }}
            </option>
          </datalist>
        <input ref="amountInput" v-model="currentProduct.amount" type="decimal" 
          placeholder="Cantidad Vendida" @input="removeErrorBorder('amountInput')"/>
        <p>Stock disponible: {{groupedProducts.find((product) => product.idProduct === selectedProductId)
          ?.stock || 0}}
        </p>
        <input ref="priceInput" v-model="currentProduct.price" type="number" 
          placeholder="Precio de venta" @input="removeErrorBorder('priceInput')"/>
        <p v-if="selectedProductId">
          Precio Clientes: {{ products.find(p => p.id === selectedProductId)?.precioRef || 'Sin registrar' }}
          Precio Mayorista: {{ products.find(p => p.id === selectedProductId)?.precioMayorista || 'Sin registrar' }}
        </p>
        <button type="button" @click="addProduct"><strong>Agregar Producto</strong></button>
    </div>
    <div class="container">
      <form @submit.prevent="handleSale" class="id-input" id="form-sale">
      <h2 class="title">Productos Agregados</h2>
      <ul>
        <li class="li" v-for="(product, index) in selectedProducts" :key="index">
          {{ product.nombreProducto }} - Cantidad: {{ product.amount }} - Precio: {{ product.price }}
          <span class="close" @click="removeProduct(index)">&times;</span>
        </li>
      </ul>
      <button type="submit" id="submit-id"><strong>Cargar Venta</strong></button>
    </form>
    </div>
  </div>
  <cmLoader v-if="isLoading" :msg="msg || 'Venta cargada con éxito!'"></cmLoader>
</template>

<script>
import sStock from '@/services/sStock';
import { dataFetchMixin } from '@/mixins/dataFetchMixin';
import { groupedProducts } from '@/mixins/groupedProducts';
import cmLoader from '@/components/cmLoader.vue';

export default {
  components: {cmLoader},
  mixins: [dataFetchMixin, groupedProducts],
  data() {
    return {
      currentProduct: { searchQuery: "", amount: "", price: "" }, // Producto actual en el formulario
      selectedProducts: [], 
      selectedProductId: null, 
      isLoading: false,
      msg: null
    };
  },
  computed: {
    availableProducts() {
      return this.products.filter(product => {
        const groupedProduct = this.groupedProducts.find(gp => gp.idProduct === product.id);
        return groupedProduct && groupedProduct.stock > 0;
      });
    }
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
      //verifica que haya stock disponible (ingresos)
      if(selectedGroupedProduct && this.currentProduct.searchQuery !== "" && 
        this.currentProduct.amount <= selectedGroupedProduct.stock && this.currentProduct.price !== ""){
        const product = {
          nombreProducto: this.currentProduct.searchQuery,
          amount: parseFloat(this.currentProduct.amount),
          price: parseFloat(this.currentProduct.price),
          idProduct: this.products.find(p => p.nombreProducto === this.currentProduct.searchQuery)?.id,
        };
        this.selectedProducts.push(product);
        this.currentProduct = { searchQuery: "", amount: "", price: "" }; 
      } else { if (this.currentProduct.searchQuery === "") {
        this.$refs.searchQueryInput.classList.add('error-border');
        this.$refs.searchQueryInput.focus();
      } else if (this.currentProduct.amount === "" || this.currentProduct.amount > selectedGroupedProduct.stock) {
        this.$refs.amountInput.classList.add('error-border');
        this.$refs.amountInput.focus();
      } else if (this.currentProduct.price === "") {
        this.$refs.priceInput.classList.add('error-border');
        this.$refs.priceInput.focus();
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
      }
    },
  },
};
</script>

<style scoped>
p {
  margin: 0.1rem;
  font-size: 12.5px;
}
</style>