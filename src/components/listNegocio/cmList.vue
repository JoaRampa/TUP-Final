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
            {{ product.nombre }} - Precio clientes: {{ product.descripcion }} - 
            Precio mayorista: {{ product.precio }} - Codigo: {{ product.prodCod }}
            <span class="close" @click="removeProduct(index)">&times;</span>
          </li>
        </ul>
      <button type="submit" id="submit-id"><strong>Cargar a Lista Negocios</strong></button>
     </form>
    </div>
  </div>
  <cmLoader v-if="isLoading"></cmLoader>
  <input v-model="searchQuery"  placeholder="Buscar producto...&#128269;"
    style="border: 1px solid var(--border-color); width: 9rem; margin-left: 2rem;"/>
  <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, id) in filteredProducts" :key="id">
            <td><strong>{{ list.nombre }}</strong></td>
            <td><strong>{{ list.descripcion || ''}}</strong></td>
            <td><strong>{{ list.precio || ''}}</strong></td>
            <td><button @click="openEditModal(list)">Editar</button></td>
          </tr>
        </tbody>
      </table>
    <EditModal
    :isVisible="isModalVisible"
    :list="selectedProduct"
    @close="closeEditModal"
    @submit="editList"
    />
</template>

<script>
import sList from "@/services/sList";
import cmLoader from "../cmLoader.vue"
import { mapState} from "vuex";
import EditModal from "./editModal.vue";

export default {
  components: {cmLoader, EditModal},
  data() {
    return {
      currentProduct: { nombre: "", descripcion: "", precio: "" },
      isLoading: false,
      list: [],
      selectedProducts: [],
      selectedProduct: null,
      searchQuery: "", 
      isModalVisible: false, 
      msg: null
    };
  },
  async created() {
    await this.fetchList();
  },
  computed:{...mapState(["products"]),
    filteredProducts() {
      const query = this.searchQuery.trim().toUpperCase();
      return this.list.filter((list) => {
        const nombre = list.nombre ? String(list.nombre).toUpperCase() : "";
        return nombre.includes(query);
      });
    }
  },
  methods: {
    async fetchList() {
      try {
        const res = await sList.getAll();
        this.list = res.data.list;
      } catch (error) {
        console.error("Error al cargar la lista:", error);
        this.list = [];
      }
    },
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

        this.isLoading = true;
        for (const product of this.selectedProducts) {
          const response = await sList.add({
            nombre: product.nombre.toUpperCase(),
            descripcion: product.descripcion,
            precio: product.precio,
          });
          console.log("Respuesta del servidor:", response.data);
          this.fetchList();
        }
      } catch (error) {
        this.msg = "Error al Agregar el Producto";
        console.error("Error al agregar producto:", error);
      } finally {
        this.selectedProducts = [];     
        setTimeout(() => {
          this.isLoading = false;
        }, 5000);
      }
    }, 
    openEditModal(list) {
      this.selectedProduct = { ...list }; 
      this.isModalVisible = true;
    },
    closeEditModal() {
      this.isModalVisible = false;
      this.selectedProduct = null;
    },
    async editList(updatedProduct) {
      if (!updatedProduct.id) return; //evita q se ejecute 2 veces en el servidor
      try {
        await sList.edit(updatedProduct);
        this.fetchList();
      } catch (error) {
        this.msg = "Error al actualizar los productos";
        console.error("Error al actualizar productos:", error);
      } finally {
        this.isModalVisible = false;
      }
    },
  },
};
</script>