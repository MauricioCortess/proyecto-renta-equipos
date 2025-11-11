<script setup lang="ts">
// 1. Importamos RouterLink para usarlo en los botones
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="bg-brand-blue text-white">
    <div class="container mx-auto flex flex-col items-center py-24 px-4 text-center">
      
      <h1 class="text-5xl font-bold leading-tight">
        Renta el Poder que Necesitas,
        <br />
        <span class="text-brand-orange">Cuando lo Necesitas.</span>
      </h1>
      
      <p class="text-xl text-gray-300 mt-6 max-w-2xl">
        Accede a estaciones de trabajo de alto rendimiento, laptops gamer y servidores para tus proyectos más exigentes, sin la necesidad de comprar.
      </p>

      <RouterLink 
         to="/catalogo" 
         class="bg-brand-orange hover:bg-opacity-80 text-black font-bold text-lg px-8 py-3 rounded-full mt-10 transition-colors">
        Ver Catálogo de Equipos
      </RouterLink>

    </div>
  </div>

  <div class="bg-white py-20">
    <div class="container mx-auto px-4">
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div class="text-gray-800">
          <h2 class="text-4xl font-bold text-brand-blue mb-4">
            ¿Qué Ofrecemos?
          </h2>
          <p class="text-lg text-gray-600 leading-relaxed">
            En RentxTech, te damos acceso inmediato al hardware más potente del mercado. Olvídate de la devaluación y los altos costos de compra. 
          </p>
          <ul class="list-disc list-inside text-lg text-gray-600 mt-4 space-y-2">
            <li>Workstations para Modelado 3D y Render.</li>
            <li>Laptops Gamer para desarrollo y pruebas.</li>
            <li>Servidores potentes para análisis de datos.</li>
          </ul>
          <RouterLink to="/nosotros" class="text-brand-orange font-bold mt-6 inline-block hover:underline text-lg">
            Conoce más sobre nosotros &rarr;
          </RouterLink>
        </div>

        <div>
          <img src="https://i.imgur.com/gA9mEwS.png" alt="Equipos de cómputo en renta" class="rounded-lg shadow-2xl">
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* No se necesitan estilos, Tailwind se encarga de todo */
</style>