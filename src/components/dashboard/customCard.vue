<template>
   <div class="dashboard-style">
      <div class="box-center">
        <slot name="media" />
        <slot name="title" />
      </div>
    <p class="dashboard-P">
      <slot name="value" />
    </p>
    </div>
</template>

<style>
  .dashboard-style {
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: .3rem;
    margin: 1.5rem 0;
    box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  }
  .box-center {
    display: flex;
    align-items: center;
  }
  .grid-dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  }
  .grid-info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .dashboard-P {
    margin: 0 12px;
    font-size: 28px;
    font-weight: 600;
  }
</style>