<script setup lang="ts">
import { ref, computed, onMounted } from 'vue' // <-- Importamos onMounted
import { useRoute } from 'vue-router' // <-- Importamos useRoute
import EquipmentCard from '@/components/EquipmentCard.vue';

const selectedCategory = ref('todos') 
const route = useRoute() // <-- Obtenemos la información de la ruta actual

// --- ¡ESTA ES LA LÓGICA CLAVE! ---
// onMounted se ejecuta 1 vez cuando la página se carga
onMounted(() => {
  // Comprueba si la URL tiene un parámetro '?categoria=...'
  if (route.query.categoria) {
    // Si existe, establece el filtro con ese valor
    selectedCategory.value = route.query.categoria as string
  }
})
// --- FIN DE LA LÓGICA ---


const equipos = ref([
  {
    "id": 1,
    "nombre": "Workstation Pro Z-Series",
    "categoria": "workstation", 
    "precioPorDia": 120,
    "disponible": true,
    "imagenUrl": "https://i.imgur.com/gA9mEwS.png",
    "specs": [
      "Intel Xeon W-2223",
      "64GB RAM DDR4",
      "NVIDIA Quadro RTX 4000 8GB"
    ]
  },
  {
    "id": 2,
    "nombre": "Laptop Gamer Alpha-17",
    "categoria": "laptop", 
    "precioPorDia": 85,
    "disponible": true,
    "imagenUrl": "https://i.imgur.com/gA9mEwS.png",
    "specs": [
      "AMD Ryzen 9 7945HX",
      "32GB RAM DDR5",
      "NVIDIA GeForce RTX 4070 8GB"
    ]
  },
  {
    "id": 3,
    "nombre": "Servidor de Cómputo R750",
    "categoria": "servidor", 
    "precioPorDia": 250,
    "disponible": false,
    "imagenUrl": "https://i.imgur.com/gA9mEwS.png",
    "specs": [
      "2x Intel Xeon Gold 6330",
      "256GB RAM ECC",
      "10TB Almacenamiento SAS"
    ]
  },
  {
    "id": 4,
    "nombre": "MacBook Pro 16\" M3 Max",
    "categoria": "laptop", 
    "precioPorDia": 110,
    "disponible": true,
    "imagenUrl": "https://i.imgur.com/gA9mEwS.png",
    "specs": [
      "Apple M3 Max Chip",
      "36GB Unified Memory",
      "1TB SSD"
    ]
  },
  {
    "id": 5,
    "nombre": "PC Escritorio i7",
    "categoria": "workstation", 
    "precioPorDia": 90,
    "disponible": true,
    "imagenUrl": "https://i.imgur.com/gA9mEwS.png",
    "specs": [
      "Intel Core i7-13700K",
      "32GB RAM DDR4",
      "NVIDIA RTX 3060 12GB"
    ]
  }
])

const filteredEquipos = computed(() => {
  if (selectedCategory.value === 'todos') {
    return equipos.value; 
  }
  return equipos.value.filter(equipo => equipo.categoria === selectedCategory.value);
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
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold mb-4 text-brand-blue">Categorías</h3>
            <ul class="space-y-3">
              <li>
                <button
                  @click="selectedCategory = 'todos'"
                  :class="[
                    'w-full text-left px-4 py-2 rounded-md transition-colors',
                    selectedCategory === 'todos' 
                      ? 'bg-brand-orange text-black font-bold' /* Estilo Activo */
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700' /* Estilo Inactivo */
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
                      ? 'bg-brand-orange text-black font-bold' /* Estilo Activo */
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700' /* Estilo Inactivo */
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
                      ? 'bg-brand-orange text-black font-bold' /* Estilo Activo */
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700' /* Estilo Inactivo */
                  ]"
                >
                  Laptop
                </button>
              </li>
              <li>
                <button
                  @click="selectedCategory = 'servidor'"
                  :class="[
                    'w-full text-left px-4 py-2 rounded-md transition-colors',
                    selectedCategory === 'servidor' 
                      ? 'bg-brand-orange text-black font-bold' /* Estilo Activo */
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700' /* Estilo Inactivo */
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