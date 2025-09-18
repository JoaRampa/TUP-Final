<template>
  <body>
    <Nav />
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
  --second-color: #2F559770;
  --main-color:#173761;
  --transparent-color: rgba(34,34,34,0.85);
  --white-color: #ffffff;
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
  font-family: 'Montserrat', sans-serif;
  scroll-behavior: smooth;
  background-color: #ffffff;
  color: #000000;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin-left: 8rem;
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

.button:hover {
  background-color: var(--second-color);
}

p {
  margin: 0; 
}
</style>