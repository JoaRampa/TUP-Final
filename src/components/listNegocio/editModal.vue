<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Editar Lista</h2>
      <form @submit.prevent="submitEdit">
        <input v-model="localList.descripcion" type="text" placeholder="Descripcion" id="editListDesc"/>
        <input v-model="localList.precio" type="decimal" placeholder="Precio" id="editListPrice"/>
        <button type="submit" :disabled="isSubmitting">Guardar Cambios</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    isVisible: Boolean,
    list: Object,
  },
  data() {
    return {
      localList: { ...this.list }, 
      isSubmitting: false,
    };
  },
  watch: {
    list: {
      handler(newIngreso) {
        this.localList = { ...newIngreso }; 
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
      this.$emit('submit', this.localList);
      this.closeModal();
      this.isSubmitting = false;
    },
  },
};
</script>