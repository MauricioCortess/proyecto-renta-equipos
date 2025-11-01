<script setup lang="ts">
// 1. Importamos los componentes que necesitamos
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue' 
</script>

<template>
  <Navbar />

  <main>
    <RouterView />
  </main>

  </template>

<style>
/* Aquí pondremos estilos GLOBALES si los necesitamos,
   pero la mayoría vendrán de Tailwind (main.css) */
</style>