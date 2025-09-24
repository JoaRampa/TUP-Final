<template>
  <div class="dashboard-style">
    <div class="media-title">
      <div class="media-slot">
        <slot name="media"></slot>
      </div>
      <slot name="title"></slot>
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
  position: relative;
}
.dashboard-P {
  margin: 0 12px;
  font-size: 28px;
  font-weight: 600;
}
.media-title {
  display: flex;
  align-items: center;
  padding: 0.35rem;
  position: relative;
}
</style>