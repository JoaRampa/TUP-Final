<template>
  <body>
    <header>
      <img src="./assets/logo.png" alt="Logo">
      <h3>LB Articulos de Limpieza</h3>
      <button class="panel-btn hamburger--emphatic" type="button"
      :class="{ 'is-active': isActive }" @click="toggleMenu">
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
      <aside class="panel" :class="{ 'is-active': isActive }" @click="toggleMenu">
        <nav class="menu">
          <router-link :to="{ name: 'sales' }">Ventas</router-link> 
          <router-link :to="{ name: 'ingreso' }">Ingresar Mercaderia</router-link>
          <router-link :to="{ name: 'listProducts' }">Lista de Productos</router-link> 
          <router-link :to="{ name: 'vListNegocio' }">Venta Negocios</router-link>
          <router-link :to="{ name: 'vAddProducts' }">Agregar Producto</router-link> 
          <router-link :to="{ name: 'summary' }">Analisis</router-link>
          <router-link :to="{ name: 'bills' }">Gastos Local</router-link> 
          <router-link :to="{ name: 'items' }">Historial Transacciones</router-link> 
          <router-link :to="{ name: 'stock' }">Stock</router-link>
        </nav>
      </aside>
    </header>
    <main>
      <router-view/>
      <button class="scroll-top-btn hidden">&#11014;</button>
    </main>
  </body>
</template>

<script>
import { mapActions } from "vuex";

  export default {
    data() {
      return {
        isActive: false,
      };
    },
    created() {
      this.fetchProducts();
    },
    mounted() {
      this.initScrollTopButton(".scroll-top-btn"); 
      window.addEventListener("keydown", this.handleKeyPress);
    },
    beforeUnmount() {
      window.removeEventListener("keydown", this.handleKeyPress);
    },
    methods: {
    ...mapActions(["fetchProducts"]),
    toggleMenu() {
      this.isActive = !this.isActive;
    },
    initScrollTopButton(selector) {
      const scrollBtn = document.querySelector(selector);
      window.addEventListener("scroll", () => {
        const scrollTop = document.documentElement.scrollTop;
        if (scrollTop > 400) {
          scrollBtn.classList.remove("hidden");
        } else {
          scrollBtn.classList.add("hidden");
        }
      });

      document.addEventListener("click", (e) => {
        if (e.target.matches(selector)) {
          window.scrollTo({
            behavior: "smooth",
            top: 0,
          });
        }
      });
    },
    handleKeyPress(event) {
      if (["Enter", "ArrowDown", "ArrowUp", "Space"].includes(event.code)) {
        event.preventDefault(); 

        const focusableElements = Array.from(
          document.querySelectorAll("input, select, textarea, button")
        );
        const currentIndex = focusableElements.indexOf(document.activeElement);
        //atajos de teclas para los formularios
        if (event.code === "Enter") {
          const activeElement = document.activeElement;
          if (activeElement.tagName === "BUTTON") {
            activeElement.click(); // Ejecuta la acción del botón
          } else {
            const nextElement = focusableElements[currentIndex + 1];
            if (nextElement) nextElement.focus();
          }
        } else if (event.code === "ArrowDown") {
          const nextElement = focusableElements[currentIndex + 1];
          if (nextElement) nextElement.focus();
        } else if (event.code === "ArrowUp") {
          const prevElement = focusableElements[currentIndex - 1];
          if (prevElement) prevElement.focus();
        } else if (event.code === "Space") {
          this.toggleMenu();
        }
      }
    },
  },
};
</script>

<style>
#app {
  --main-font: sans-serif;
  --font-size: 14px;
  --main-color:  #0f5c9b ;
  --second-color: rgb(7, 62, 126);
  --main-modal-color:#0a192f;
  --transparent-color: rgba(34,34,34,0.85);
  --button-color: rgba(19, 78, 133, 0.5);
  --second-modal-color: #dfd3d3;
  --border-color: #c5bfc74e;
  --second-border-color: #000;
  --container-width: 1200px;
}
html {
  box-sizing: border-box;
  font-family: var(--main-font);
  font-size: var(--font-size);
  scroll-behavior: smooth;
  background-color: #0a192f;
  color: #dfd9d9;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  overflow-x: hidden;
  font-family: "Calibre", "San Francisco", "SF Pro Text", sans-serif;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  z-index: 997;
  top: 0;
  padding: .25rem;
  margin-bottom: 0.9rem;
}

header img {
  width: 3.3rem;
  border-radius: 100%;
}

button, input, select {
  border: none;
  width: 100%;
  background-color: var(--second-modal-color);
  border-radius: .8rem;
  padding: .5rem;
  cursor: pointer;
  margin: 0.15rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: var(--main-color);
}

/* menu */
.panel {
  position: fixed;
  z-index: 998;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  width: 100%;
  background-color: var(--transparent-color);
  transition: transform 0.15s ease;
  transform: translate(0,-100%);
}

.panel.is-active {
  transform: translate(0,0);
}

.panel-btn {
  z-index: 999;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: hidden;
  background-color: var(--second-color);
}

.menu {
  width: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
}

.menu a {
  padding: 2rem;
  width: inherit;
  display: block;
  font-size: 1.5rem;
  text-decoration: none;
  color: var(--second-modal-color);
  transition: all 0.3s ease;
}

.menu a:hover {
  font-weight: bold;
  background-color: var(--main-color);
}
/* ---------- */

p {
  margin: 0; 
}

.hidden {
  visibility: hidden;
  opacity: 0;
}

.scroll-top-btn {
  position: fixed;
  z-index: 999;
  bottom: 1vh;
  right: 1vw;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  font-size: 2rem;
  font-weight: bold;
  background-color: var(--main-color);
  color: var(--second-modal-color);
  outline: 0;
  border: 0;
  transition: all 0.25s ease-out;
}

/* cards formularios  */ 
.module {
  display: flex;
}

.title {
  text-align: center;
  padding: 0 1rem .5rem 1rem;
  margin: 0;
}
.container {
  text-align: center;
  width: 99%;
  padding: 1.5rem;
  margin: 0 0.5rem 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.306);
  border-radius: 1rem;
  transform: translateY(-10px);
  animation: fadeIn 0.5s ease-in-out forwards;
  border: 1px solid var(--border-color);
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.li {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.error-border {
  background-color: red;
}
</style>
