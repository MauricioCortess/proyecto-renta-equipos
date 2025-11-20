<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import EquipmentCard from '@/components/EquipmentCard.vue';
import { useEquiposStore } from '@/stores/equipos'

const equiposStore = useEquiposStore()
const route = useRoute()
const selectedCategory = ref('todos') 

onMounted(() => {
  if (route.query.categoria) {
    selectedCategory.value = route.query.categoria as string
  }
})

const filteredEquipos = computed(() => {
  if (selectedCategory.value === 'todos') {
    return equiposStore.equipos; 
  }
  // Asegúrate que 'categoria' en tus datos sea minúscula para coincidir con 'workstation', 'laptop', 'servidor'
  return equiposStore.equipos.filter(equipo => equipo.categoria.toLowerCase() === selectedCategory.value);
});
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    
    <div class="bg-brand-blue text-white pt-16 pb-20 relative overflow-hidden shadow-lg">
      
      <div class="container mx-auto px-4 text-center relative z-10">
        <p class="text-brand-orange font-bold tracking-[0.2em] uppercase text-sm mb-3 animate-fade-in">
          Catálogo 2025
        </p>
        
        <h1 class="text-4xl md:text-6xl font-extrabold mb-6 leading-tight animate-fade-in delay-100">
          Encuentra tu <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-brand-orange">Equipo Ideal</span>
        </h1>
        
        <p class="text-gray-300 text-lg max-w-2xl mx-auto font-light animate-fade-in delay-200">
          Explora nuestra selección de hardware de alto rendimiento disponible para entrega inmediata. Potencia tu proyecto hoy mismo.
        </p>
      </div>
    </div>

    <div class="container mx-auto px-4 pb-20 -mt-10 relative z-20">

      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">

        <aside class="md:col-span-1">
          <div class="bg-white p-6 rounded-xl shadow-xl sticky top-24 border border-gray-100"> 
            <h3 class="text-lg font-bold mb-6 text-brand-blue flex items-center">
              <span class="mr-2 text-xl">🔍</span> Filtrar por:
            </h3>
            <ul class="space-y-2">
              <li>
                <button
                  @click="selectedCategory = 'todos'"
                  :class="[
                    'w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium',
                    selectedCategory === 'todos' 
                      ? 'bg-brand-orange text-black shadow-md transform scale-105' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-brand-blue'
                  ]"
                >
                  Todos los Equipos
                </button>
              </li>
              <li>
                <button
                  @click="selectedCategory = 'workstation'"
                  :class="[
                    'w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium',
                    selectedCategory === 'workstation' 
                      ? 'bg-brand-orange text-black shadow-md transform scale-105' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-brand-blue'
                  ]"
                >
                  PC Escritorio
                </button>
              </li>
              <li>
                <button
                  @click="selectedCategory = 'laptop'"
                  :class="[
                    'w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium',
                    selectedCategory === 'laptop' 
                      ? 'bg-brand-orange text-black shadow-md transform scale-105' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-brand-blue'
                  ]"
                >
                  Laptops
                </button>
              </li>
              <li>
                <button
                  @click="selectedCategory = 'servidor'"
                  :class="[
                    'w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium',
                    selectedCategory === 'servidor' 
                      ? 'bg-brand-orange text-black shadow-md transform scale-105' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-brand-blue'
                  ]"
                >
                  Servidores
                </button>
              </li>
            </ul>
          </div>
        </aside>

        <main class="md:col-span-3">
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EquipmentCard 
              v-for="item in filteredEquipos" 
              :key="item.id" 
              :equipo="item" 
            />
          </div>

          <div v-if="filteredEquipos.length === 0" class="flex flex-col items-center justify-center py-20 text-gray-400 bg-white rounded-xl shadow-sm mt-6">
            <div class="text-6xl mb-4">😕</div>
            <p class="text-xl font-medium">No se encontraron equipos en esta categoría.</p>
            <button @click="selectedCategory = 'todos'" class="mt-4 text-brand-orange font-bold hover:underline">Ver todos</button>
          </div>
        </main>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animación de entrada simple */
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
  opacity: 0;
}
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>