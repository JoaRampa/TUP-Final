<template>
  <input v-model="searchQuery"  placeholder="Buscar producto...&#128269;" id="search"
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
            <td>
              <div class="module">              
                <button @click="openEditModal(list)">Editar</button>
                <button @click="deleteList(list.id)">borrar</button>
              </div>
            </td>
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
import { mapState} from "vuex";
import EditModal from "./editModal.vue";

export default {
  components: {EditModal},
  data() {
    return {
      list: [],
      selectedProduct: null,
      searchQuery: "", 
      isModalVisible: false, 
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
    async deleteList(id) {
      try {
        const res = await sList.delete(id);
        this.fetchList();
        console.log("Eliminado: ", res.data);
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  },
};
</script>