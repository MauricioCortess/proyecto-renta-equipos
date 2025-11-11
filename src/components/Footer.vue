<script setup lang="ts">
// Importamos RouterLink para los links de navegación
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="bg-brand-blue text-gray-300 py-10 mt-16">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        
        <div class="mb-4 md:mb-0">
          <RouterLink to="/" class="flex items-center justify-center md:justify-start space-x-2 mb-2">
            <img src="/logo.png" alt="RentxTech Logo" class="h-8">
            <span class="text-white font-bold text-xl">RentxTech</span>
          </RouterLink>
          <p class="text-sm">&copy; 2025 RentxTech. Todos los derechos reservados.</p>
        </div>

        <div class="flex space-x-6 font-medium">
          <RouterLink to="/" class="hover:text-brand-orange">Inicio</RouterLink>
          <RouterLink to="/catalogo" class="hover:text-brand-orange">Catálogo</RouterLink>
          <RouterLink to="/nosotros" class="hover:text-brand-orange">Nosotros</RouterLink>
        </div>

      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Estilos solo para este componente si fueran necesarios */
</style>