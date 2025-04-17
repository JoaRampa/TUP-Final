<template>
  <Button label="SELL" @click="sell" />
</template>

<script setup>
import { Button } from './custom/button';
const sell = () => {console.log("hola")}
</script>