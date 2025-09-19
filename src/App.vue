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
  --white-color: #ffffff;
  --border-color: #00000050;
  --red-color: #c40d0d;
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
  margin: 1.75rem 4rem 0 9rem;
  overflow-x: hidden;
}

input, select {
  border: none;
  width: 100%;
  background-color: var(--white-color);
  border-radius: .3rem;
  padding: .5rem;
  cursor: pointer;
  margin-bottom: 0.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

button {
  border: none;
  padding: .5rem;
  cursor: pointer;
}

.button:hover {
  background-color: var(--second-color);
}

p {
  margin: 0; 
}
h3 {
  margin-top: 0;
}
.center {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>