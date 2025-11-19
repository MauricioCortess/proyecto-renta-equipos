<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import EquipmentCard from '@/components/EquipmentCard.vue';
// Importamos el store de equipos
import { useEquiposStore } from '@/stores/equipos'

const equiposStore = useEquiposStore() // Iniciamos el store
const route = useRoute()
const selectedCategory = ref('todos') 

// Lógica para leer el filtro desde la URL
onMounted(() => {
  if (route.query.categoria) {
    selectedCategory.value = route.query.categoria as string
  }
})

// --- LÓGICA DE FILTRADO ---
// Ahora filtramos directamente desde los datos del store (equiposStore.equipos)
const filteredEquipos = computed(() => {
  if (selectedCategory.value === 'todos') {
    return equiposStore.equipos; 
  }
  return equiposStore.equipos.filter(equipo => equipo.categoria === selectedCategory.value);
});
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto py-12 px-4">

      <h1 class="text-4xl font-bold text-center text-brand-blue mb-10">
        Equipos en Renta
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">

        <aside class="md:col-span-1">
          <div class="bg-white p-6 rounded-lg shadow-lg sticky top-24"> 
            <h3 class="text-xl font-semibold mb-4 text-brand-blue">Categorías</h3>
            <ul class="space-y-3">
              <li>
                <button
                  @click="selectedCategory = 'todos'"
                  :class="[
                    'w-full text-left px-4 py-2 rounded-md transition-colors',
                    selectedCategory === 'todos' 
                      ? 'bg-brand-orange text-black font-bold' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  ]"
                >
                  Todos los Equipos
                </button>
              </li>
              <li>
                <button
                  @click="selectedCategory = 'workstation'"
                  :class="[
                    'w-full text-left px-4 py-2 rounded-md transition-colors',
                    selectedCategory === 'workstation' 
                      ? 'bg-brand-orange text-black font-bold' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  ]"
                >
                  PC Escritorio
                </button>
              </li>
              <li>
                <button
                  @click="selectedCategory = 'laptop'"
                  :class="[
                    'w-full text-left px-4 py-2 rounded-md transition-colors',
                    selectedCategory === 'laptop' 
                      ? 'bg-brand-orange text-black font-bold' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  ]"
                >
                  Laptops
                </button>
              </li>
              <li>
                <button
                  @click="selectedCategory = 'servidor'"
                  :class="[
                    'w-full text-left px-4 py-2 rounded-md transition-colors',
                    selectedCategory === 'servidor' 
                      ? 'bg-brand-orange text-black font-bold' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
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

          <div v-if="filteredEquipos.length === 0" class="text-center text-gray-400 mt-10">
            <p class="text-2xl">No se encontraron equipos en esta categoría.</p>
          </div>
        </main>

      </div>
    </div>
  </div>
</template>