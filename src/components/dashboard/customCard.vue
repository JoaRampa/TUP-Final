<template>
   <div class="dashboard-style" :class="{ 'is-hovered': hovered }">

      <div class="media-title" >
        <div  class="media-slot" tabindex="0" @blur="setHover(false)" @mouseenter="setHover(true)" 
          @mouseleave="setHover(false)" @click="onMediaClick">
          <slot name="media" :hovered="hovered"></slot>
        </div>
        <slot name="title" :hovered="hovered"></slot>
      </div>

      <p class="dashboard-P">
        <slot name="value" />
      </p>
    </div>
</template>

<script setup>
  import { ref } from 'vue';
  const hovered = ref(false);
  let leaveTimeout = null;

  function setHover(val) {
    clearTimeout(leaveTimeout);

    if (val) hovered.value = true;
    else leaveTimeout = setTimeout(() => (hovered.value = false), 60);
  }
  function onMediaClick() {
    return hovered.value = false;
  }
</script>

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
  }
  .is-hovered .media-slot > * {
    color: #fff;
    gap: .75rem;
    width: 180px;
    transition: all .4s ease;
  }
  .media-title {
    position: relative;
  }
  .media-title::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 0%;
    background: var(--main-color);
    transition: width 0.4s ease;
  }
  .is-hovered .media-title::after {
    width: 100%;
  }
</style>