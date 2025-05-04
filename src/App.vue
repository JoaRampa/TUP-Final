<template>
  <body>
    <header>
      <Nav />
    </header>
    <main>
      <router-view/>
    </main>
  </body>
</template>

<script>
  import Nav from './components/nav.vue';
  export default {
    components:{Nav},
    mounted() {
      window.addEventListener("keydown", this.handleKeyPress);
    },
    beforeUnmount() {
      window.removeEventListener("keydown", this.handleKeyPress);
    },
    methods: {
    handleKeyPress(event) {
      if (["Enter", "ArrowDown", "ArrowUp"].includes(event.code)) {
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
        }
      }
    },
  },
};
</script>

<style>
#app {
  --second-color: rgb(7, 62, 126);
  --main-color:#0a192f;
  --transparent-color: rgba(34,34,34,0.85);
  --text-color: #dfd3d3;
  --border-color: #c5bfc74e;
  --container-width: 1200px;
  --text-green: rgb(27, 230, 131);
  --back-green: rgb(11, 88, 51);
  --green-hover: rgb(15, 129, 74);
  --text-red: rgb(216, 124, 124);
  --back-red: #911919;
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
}

button, input, select {
  border: none;
  width: 100%;
  background-color: var(--text-color);
  border-radius: .8rem;
  padding: .5rem;
  cursor: pointer;
  margin-bottom: 0.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

p {
  margin: 0; 
}
</style>