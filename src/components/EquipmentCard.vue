<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  equipo: {
    id: number;
    nombre: string;
    categoria?: string;
    precioPorDia: number;
    disponible: boolean;
    imagenUrl: string;
    specs: string[];
    descripcion?: string;
  }
}>()
</script>

<template>
  <div class="group bg-white rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden">
    
    <div class="absolute top-0 left-0 z-10">
      <span v-if="equipo.disponible" class="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-br-lg">
        En Existencia
      </span>
      <span v-else class="bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-br-lg">
        Agotado
      </span>
    </div>

    <div class="relative w-full h-48 p-4 bg-white flex items-center justify-center border-b border-gray-100">
      <img 
        :src="equipo.imagenUrl" 
        :alt="equipo.nombre" 
        class="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-300" 
        loading="lazy"
      >
    </div>

    <div class="p-4 flex flex-col flex-grow">
      
      <h3 class="text-sm font-bold text-gray-800 leading-tight mb-2 line-clamp-2 h-10">
        <RouterLink :to="`/equipo/${equipo.id}`" class="hover:text-blue-600 transition-colors">
          {{ equipo.nombre }}
        </RouterLink>
      </h3>
      
      <div class="text-xs text-gray-500 mb-3 space-y-1">
        <p class="line-clamp-1" v-for="(spec, index) in equipo.specs.slice(0, 2)" :key="index">
          • {{ spec }}
        </p>
      </div>

      <div class="mt-auto pt-3 border-t border-gray-100">
        
        <div class="flex items-end justify-between mb-3">
          <div>
            <p class="text-xs text-gray-400 font-medium uppercase">Renta por día</p>
            <p class="text-2xl font-black text-blue-700 tracking-tight">
              ${{ equipo.precioPorDia }}
            </p>
          </div>
        </div>

        <RouterLink 
          :to="`/equipo/${equipo.id}`" 
          class="block w-full bg-gray-900 hover:bg-brand-orange hover:text-black text-white text-center text-xs font-bold uppercase tracking-widest py-3 rounded transition-colors duration-200"
        >
          Ver Detalles
        </RouterLink>

      </div>
    </div>
  </div>
</template>