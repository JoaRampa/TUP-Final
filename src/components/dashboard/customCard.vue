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