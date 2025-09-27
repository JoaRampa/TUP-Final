<template>
  <div class="pagination">
    <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)"><i class="fas fa-caret-left"></i></button>
    <button v-for="page in pages" :key="page"
      :class="{ active: page === currentPage }" @click="changePage(page)"
    >
      {{ page }}
    </button>
    <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)"><i class="fas fa-caret-right"></i></button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  totalItems: { type: Number, required: true },
  itemsPerPage: { type: Number, default: 10 },
  modelValue: { type: Number, default: 1 }, 
});

const emits = defineEmits(["update:modelValue"]);

const currentPage = computed(() => props.modelValue);
const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));

const pages = computed(() => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages.value; i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    emits("update:modelValue", page);
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  gap: 5px;
  justify-content: center;
  margin: 1rem 0 0 2rem;
}

button { 
  padding: 5px 10px; 
  font-weight: 600;
  background-color: var(--white-color);
  border: 1px solid var(--border-color);
}
button.active, button:hover {
  background: var(--main-color);
  color: var(--white-color);
}
</style>