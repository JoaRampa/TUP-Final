<template>
  <div class="load" v-if="isLoading"><img src="../assets/ball-triangle.svg" alt="Cargando..."></div>
  <div class="load" id="msg" v-if="showMessage">
    {{ msg }}
  </div>
</template>
<script>
export default {
  props: {
    msg: {
      type: String,
      default: "¡Acción realizada con éxito!"
    }
  },
  data() {
    return {
      isLoading: true, 
      showMessage: false, 
    };
  },
  mounted() {
    // Después de 2 segundos, oculta el loader y muestra el msj
    setTimeout(() => {
      this.isLoading = false; 
      this.showMessage = true; 

      // Oculta el msj
      setTimeout(() => {
        this.showMessage = false;
      }, 1000); 
    }, 1000); 
  },
};
</script>
<style scoped>
 .load {
  display: flex;
  height: 6rem;
  border-radius: 2rem;
  justify-content: center;
  align-items: center;
 }
</style>