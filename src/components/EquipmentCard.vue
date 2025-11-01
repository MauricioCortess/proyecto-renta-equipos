<script setup lang="ts">
// --- CAMBIO AQUÍ ---
// 'defineProps' es la forma en que Vue dice:
// "Este componente ACEPTA la siguiente información de su padre"
defineProps<{
  equipo: {
    id: number;
    nombre: string;
    precioPorDia: number;
    disponible: boolean;
    imagenUrl: string;
    specs: string[];
  }
}>()
</script>

<template>
  <RouterLink :to="`/equipo/${equipo.id}`">
    
    <div class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
      
      <img :src="equipo.imagenUrl" :alt="equipo.nombre" class="w-full h-48 object-cover">

      <div class="p-4 flex flex-col flex-grow">
        
        <span v-if="equipo.disponible" 
              class="inline-block bg-green-200 text-green-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
          Disponible
        </span>
        <span v-else
              class="inline-block bg-red-200 text-red-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
          Agotado
        </span>

        <h3 class="font-bold text-xl mt-2 mb-2 text-gray-900">{{ equipo.nombre }}</h3>

        <p class="text-gray-700 text-lg">
          ${{ equipo.precioPorDia }} <span class="text-sm text-gray-500">/ día</span>
        </p>

        <ul class="mt-3 text-sm text-gray-600 list-disc list-inside">
          <li v-for="spec in equipo.specs" :key="spec">
            {{ spec }}
          </li>
        </ul>

        <div class="mt-4 text-center flex-grow flex items-end">
          <span 
             class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full inline-block">
            Ver Detalles
          </span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>