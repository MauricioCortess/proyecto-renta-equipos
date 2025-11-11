<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue' 
import Footer from './components/Footer.vue' // <-- 1. IMPORTAMOS EL FOOTER
</script>

<template>
  <div class="flex flex-col min-h-screen">
    
    <Navbar />

    <main class="flex-grow">
      <RouterView />
    </main>

    <Footer /> </div>
</template>

<style>
/* Estilos globales (los de Tailwind ya se importan en main.css) */
</style>