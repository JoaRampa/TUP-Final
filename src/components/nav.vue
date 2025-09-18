<template>
  <aside class="panel">
    <h2><i class="fa-solid fa-box"></i>LBStock</h2>
    <nav class="menu">
      <router-link :to="{ name: 'vHome' }"><i class="fa-solid fa-house"></i>Home</router-link>
      <router-link :to="{ name: 'listProducts' }"><i class="fa-solid fa-boxes-stacked"></i>Stock</router-link> 
      <router-link :to="{ name: 'transactions' }"><i class="fa-solid fa-chart-line"></i>Transactions</router-link>
      <router-link :to="{name: 'balance'}"><i class="fa-solid fa-scale-balanced"></i>Balance</router-link>
    </nav>
  </aside>
</template>

<style>
.weight-spacing {
  font-weight: 700;
  letter-spacing: .05em;
}
/* menu */
.panel {
  position: fixed;
  z-index: 9999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 13rem;
  background-color: var(--main-color);
  padding: 1rem 0.3rem;
}

.menu a {
  padding: .8rem;
  margin: 6px 0;
  display: block;
  font-size: 1.1rem;
  border-radius: .5rem;
  text-decoration: none;
  color: var(--white-color);
  transition: all 0.3s ease;
}

.menu a:hover {
  background-color: var(--second-color);
}

i {
  margin-right: .75rem;
}
</style>