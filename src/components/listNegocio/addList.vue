<template>
  <div class="module">
    <div class="container">
      <h3 class="title">Agregar Lista Negocio</h3>
        <input ref="nombreInput" v-model="currentProduct.nombre" type="text"
          placeholder="Nombre del Producto" @input="removeErrorBorder('nombreInput')" list="list"/>
          <datalist id="list" v-if="currentProduct.nombre.length >= 3">
            <option v-for="product in products" :key="product.id" :value="product.nombreProducto" :data-id="product.id">
              {{ product.nombreProducto }}
            </option>
          </datalist>
        <input v-model="currentProduct.descripcion" type="text" id="descripcion" 
          placeholder="Descripcion"/>
        <input v-model="currentProduct.precio" type="text" id="precio" placeholder="Precio"/>
        <button type="button" @click="addProduct"><strong>Agregar a la Lista</strong></button>
    </div>
    <div class="container">
      <form @submit.prevent="handleList" class="id-input" id="form-product">
        <h3 class="title">Cargar a Lista Negocios</h3>
        <ul>
          <li class="li" v-for="(product, index) in selectedProducts" :key="index">
            {{ product.nombre }} - Descripcion/Cantidad: {{ product.descripcion }} - 
            Precio a Negocio: {{ product.precio }}
            <span class="close" @click="removeProduct(index)">&times;</span>
          </li>
        </ul>
      <button type="submit" id="submit-id"><strong>Cargar a Lista Negocios</strong></button>
     </form>
    </div>
  </div>
  <cmLoader v-if="isLoading"></cmLoader>
</template>

<script>
import sList from "@/services/sList";
import { mapState} from "vuex";
import cmLoader from "@/components/cmLoader.vue";

  export default {
    components: {cmLoader},
      data() {
      return {
        currentProduct: { nombre: "", descripcion: "", precio: "" },
        list: [],
        selectedProducts: [],
        isLoading: false,
        msg: null,
      };
    },
    computed:{...mapState(["products"])},
    methods: {
      addProduct() {
        if(this.currentProduct.nombre !== "" ){
          const product = {
            nombre: this.currentProduct.nombre,
            descripcion: this.currentProduct.descripcion,
            precio: this.currentProduct.precio,
          };
          this.selectedProducts.push(product);
          console.log(this.selectedProducts)
          this.currentProduct = { nombre: "", descripcion: "", precio: "", prodCod: ""  }; 
        } else { if (this.currentProduct.nombre === "") {
          this.$refs.nombreInput.classList.add('error-border');
          this.$refs.nombreInput.focus();
        }}
      },
      removeProduct(index) {
        this.selectedProducts.splice(index, 1);
      },
      removeErrorBorder(refName) {
        this.$refs[refName].classList.remove('error-border');
      },
      async handleList() {
        try {
          if (this.selectedProducts.length === 0) {
            this.$refs.nombreInput.focus();
            return;
          }

          for (const product of this.selectedProducts) {
            const response = await sList.add({
              nombre: product.nombre.toUpperCase(),
              descripcion: product.descripcion,
              precio: product.precio,
            });
            console.log("Respuesta del servidor:", response.data);
          }
        } catch (error) {
          this.msg = "Error al Agregar el Producto";
          console.error("Error al agregar producto:", error);
        } finally {
          this.selectedProducts = [];     
        }
      }, 
    }
  }
</script>