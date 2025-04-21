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

p {
  margin: 0; 
}

.hidden {
  visibility: hidden;
  opacity: 0;
}
</style>