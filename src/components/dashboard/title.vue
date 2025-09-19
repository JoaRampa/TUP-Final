<template>
  <h2>Dashboard</h2>
  <div class="dashboard-style">
    <div class="box-center">
      <i class="fa-solid fa-calendar-day" aria-hidden="true" style="margin-right: .75rem;"></i>
      <label type="text" class="date-input"> Hoy, {{ formatDate(today) }}</label>
    </div>
  </div>
</template>

<script setup>
  import { formatDate } from '@/utils/formatDate';
  const today = Date.now();
</script>