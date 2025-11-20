<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue' 
import type { Equipo } from '@/stores/equipos' 

const props = defineProps<{ 
  equipo: Equipo 
}>()

const stockStatus = computed(() => {
  if (!props.equipo) { 
    return {
      text: 'ERROR',
      badgeClass: 'bg-red-500/90 text-white'
    };
  }
  if (props.equipo.stock > 0) {
    return {
      text: `DISPONIBLE (${props.equipo.stock})`,
      badgeClass: 'bg-green-500/90 text-white' 
    };
  } else {
    return {
      text: 'AGOTADO',
      badgeClass: 'bg-gray-500/90 text-white' 
    };
  }
});

const buttonText = computed(() => {
  if (!props.equipo) return 'Error'; 
  return props.equipo.stock > 0 ? 'Ver Detalles' : 'Agotado';
});

const buttonClass = computed(() => {
  if (!props.equipo) return 'bg-gray-300 text-gray-600 cursor-not-allowed'; 
  return props.equipo.stock > 0 
    ? 'bg-brand-orange text-black hover:bg-orange-500 hover:scale-105 shadow-md' 
    : 'bg-gray-300 text-gray-600 cursor-not-allowed';
});

const displaySpecs = computed(() => {
  if (!props.equipo) return []; 
  return props.equipo.specs.slice(0, 3); 
});

const remainingSpecsCount = computed(() => {
  if (!props.equipo) return 0; 
  return props.equipo.specs.length - displaySpecs.value.length;
});
</script>

<template>
  <RouterLink 
    :to="props.equipo && props.equipo.stock > 0 ? `/equipo/${props.equipo.id}` : '#'"
    :class="{
      'group bg-white rounded-2xl shadow-lg transition-all duration-300 ease-out transform hover:-translate-y-2 overflow-hidden flex flex-col h-full relative border border-gray-100 block': true,
      'hover:shadow-2xl': props.equipo && props.equipo.stock > 0,
      'cursor-not-allowed': !props.equipo || props.equipo.stock === 0
    }"
  >
    
    <div v-if="props.equipo" class="absolute top-3 left-3 z-20"> 
      <span 
        :class="['backdrop-blur-sm text-[10px] font-bold px-3 py-1 rounded-full shadow-sm tracking-wider', stockStatus.badgeClass]">
        {{ stockStatus.text }}
      </span>
    </div>

    <div class="relative w-full h-64 bg-gray-50 flex items-center justify-center overflow-hidden p-6 group-hover:bg-white transition-colors duration-300">
      <img 
        v-if="props.equipo"
        :src="equipo.imagenUrl" 
        :alt="equipo.nombre" 
        class="object-contain w-full h-full drop-shadow-md group-hover:scale-110 transition-transform duration-500" 
        loading="lazy"
      >
      <div v-else class="text-gray-400 text-center">No hay imagen</div>
    </div>

    <div class="p-6 flex flex-col flex-grow">
      
      <p v-if="props.equipo" class="text-xs font-bold text-brand-orange uppercase tracking-widest mb-2">
        {{ equipo.categoria || 'Equipo' }}
      </p>
      <p v-else class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Cargando categoría...</p>

      <h3 v-if="props.equipo" class="text-lg font-bold leading-tight mb-3 text-gray-900 group-hover:text-brand-orange transition-colors">
        {{ equipo.nombre }}
      </h3>
      <h3 v-else class="text-lg font-bold leading-tight mb-3 text-gray-900">Cargando...</h3>
      
      <div v-if="props.equipo" class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="spec in displaySpecs" 
          :key="spec" 
          class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium border border-gray-200"
        >
          {{ spec }}
        </span>
        <span 
          v-if="remainingSpecsCount > 0" 
          class="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-md font-medium border border-gray-200"
        >
          +{{ remainingSpecsCount }} más
        </span>
      </div>
      <div v-else class="flex flex-wrap gap-2 mb-4 text-gray-400 text-sm">Cargando specs...</div>

      <div class="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
        
        <div v-if="props.equipo" class="flex flex-col">
          <span class="text-xs text-gray-400 font-medium">Precio por día</span>
          <span class="text-2xl font-extrabold text-brand-blue">
            ${{ equipo.precioPorDia }}
          </span>
        </div>
        <div v-else class="flex flex-col">
            <span class="text-xs text-gray-400 font-medium">Precio por día</span>
            <span class="text-2xl font-extrabold text-brand-blue"> -- </span>
        </div>

        <button 
          :disabled="!props.equipo || props.equipo.stock === 0"
          :class="[
            'py-2 px-4 rounded-lg text-sm font-bold transition-all duration-300 transform',
            buttonClass
          ]"
        >
          {{ buttonText }} &rarr;
        </button>

      </div>
    </div>
  </RouterLink>
</template>