<template>
  <img src="../assets/logo.png" alt="Logo">
  <h3 class="weight-spacing" style="margin: 0">LB Cleaning Products</h3>
  <button class="panel-btn hamburger--emphatic" type="button"
    :class="{ 'is-active': isActive }" @click="toggleMenu">
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
  </button>
  <aside class="panel" :class="{ 'is-active': isActive }" @click="toggleMenu">
    <nav class="menu">
      <router-link :to="{ name: 'vHome' }">Home</router-link>
      <router-link :to="{ name: 'listProducts' }">Stock</router-link> 
      <router-link :to="{ name: 'transactions' }">Transactions</router-link>
      <router-link :to="{name: 'balance'}">Balance</router-link>
    </nav>
  </aside>
</template>

<script>
  export default {
    data() {
      return {
        isActive: false,
      };
    },
    methods: {
      toggleMenu() {
      this.isActive = !this.isActive;
    },
    }
  }
</script>

<style>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  z-index: 997;
  top: 0;
  padding: 0.25rem .5rem;
  margin-bottom: 1.9rem;
}

header img {
  width: 3.3rem;
  border-radius: 100%;
}
.weight-spacing {
  font-weight: 700;
  letter-spacing: .05em;
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
  width: 3.3rem;
  height: 3.3rem;
  border-radius: 100%;
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
  color: var(--text-color);
  transition: all 0.3s ease;
}

.menu a:hover {
  font-weight: bold;
  background-color: var(--second-color);
}
</style>