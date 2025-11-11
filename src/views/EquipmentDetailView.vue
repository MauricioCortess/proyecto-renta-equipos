<script setup lang="ts">
import { useRoute, useRouter, RouterLink } from 'vue-router' // <--- Asegúrate que RouterLink esté aquí
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth' // 1. Importamos el "cerebro" de Auth

// --- Stores y Router ---
const route = useRoute()
const router = useRouter() // 2. Importamos el router para redirigir
const authStore = useAuthStore() // 3. Inicializamos el "cerebro"

// --- Variables del formulario ---
const fechaInicio = ref('') // 4. Variable para guardar la fecha de inicio
const fechaFin = ref('') // 5. Variable para guardar la fecha de fin

// --- Datos Simulados (como antes) ---
const equipoId = route.params.id
const equipoSimulado = ref({
    "id": equipoId,
    "nombre": "Workstation Pro Z-Series (Cargado)",
    "precioPorDia": 120,
    "disponible": true,
    "imagenUrl": "https://i.imgur.com/gA9mEwS.png",
    "specs": [
      "Intel Xeon W-2223",
      "64GB RAM DDR4",
      "NVIDIA Quadro RTX 4000 8GB",
      "1TB SSD NVMe",
      "Fuente 750W Gold",
      "Windows 11 Pro"
    ],
    "descripcionLarga": "Perfecta para modelado 3D, análisis de datos y desarrollo de software exigente. Esta workstation ofrece el máximo rendimiento y fiabilidad para profesionales."
})

// --- Función para manejar la reserva ---
function handleReserva() {
  // 6. Verificamos si el usuario está logueado (leyendo del "cerebro")
  if (!authStore.isLoggedIn) {
    // Si no lo está...
    alert("Por favor, inicia sesión para poder rentar un equipo.")
    router.push('/login') // Lo mandamos al login
  } else {
    // Si SÍ lo está...
    
    // (Aquí es donde en un futuro enviarías los datos al Backend)
    // (POST /api/reservas con el JSON que definimos en el README)
    console.log('--- SIMULANDO RESERVA ---')
    console.log('Usuario ID:', authStore.usuario?.id)
    console.log('Equipo ID:', equipoSimulado.value.id)
    console.log('Fecha Inicio:', fechaInicio.value)
    console.log('Fecha Fin:', fechaFin.value)
    
    // 7. Mostramos el mensaje de confirmación (requisito del profesor)
    alert("¡Reserva confirmada exitosamente! (Simulación)")
    
    // 8. Lo redirigimos al catálogo
    router.push('/catalogo')
  }
}
</script>

<template>
  <div class="bg-gray-100 min-h-screen py-12">
    <div class="container mx-auto max-w-4xl bg-white rounded-lg shadow-lg p-8">

      <div class="flex flex-col md:flex-row gap-8">
        
        <div class="md:w-1/2">
          <img :src="equipoSimulado.imagenUrl" :alt="equipoSimulado.nombre" class="w-full rounded-lg shadow-md">
        </div>

        <div class="md:w-1/2">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ equipoSimulado.nombre }}</h1>
          
          <p class="text-gray-700 text-3xl font-light mb-4">
            ${{ equipoSimulado.precioPorDia }} <span class="text-lg text-gray-500">/ día</span>
          </p>
          
          <p class="text-gray-600 mb-4">{{ equipoSimulado.descripcionLarga }}</p>

          <span v-if="equipoSimulado.disponible" 
                class="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full uppercase font-semibold">
            Disponible
          </span>
          <span v-else 
                class="inline-block bg-red-200 text-red-800 px-3 py-1 rounded-full uppercase font-semibold">
            Agotado
          </span>
        </div>
      </div>

      <div class="mt-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div>
            <h2 class="text-2xl font-semibold text-gray-800 mb-3">Especificaciones</h2>
            <ul class="list-disc list-inside text-gray-700 space-y-1">
              <li v-for="spec in equipoSimulado.specs" :key="spec">{{ spec }}</li>
            </ul>
          </div>

          <div>
            
            <div v-if="authStore.isLoggedIn">
              <h2 class="text-2xl font-semibold text-gray-800 mb-3">Reservar Equipo</h2>
              <form class="bg-gray-50 p-4 rounded-lg shadow-inner space-y-4" @submit.prevent="handleReserva">
                <div>
                  <label for="fechaInicio" class="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
                  <input 
                    type="date" 
                    id="fechaInicio" 
                    v-model="fechaInicio"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                </div>
                <div>
                  <label for="fechaFin" class="block text-sm font-medium text-gray-700">Fecha de Fin</label>
                  <input 
                    type="date" 
                    id="fechaFin" 
                    v-model="fechaFin"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                </div>
                <button 
                  type="submit"
                  class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-lg"
                >
                  Confirmar Renta
                </button>
              </form>
            </div>
            
            <div v-else>
              <h2 class="text-2xl font-semibold text-gray-800 mb-3">Reservar Equipo</h2>
              <div class="bg-gray-50 p-6 rounded-lg shadow-inner text-center">
                <p class="text-gray-700 mb-4 text-lg">
                  Necesitas iniciar sesión para poder realizar una reserva.
                </p>
                <RouterLink 
                  to="/login"
                  class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-lg inline-block"
                >
                  Iniciar Sesión
                </RouterLink>
              </div>
            </div>

          </div>

        </div>
      </div>
      
    </div>
  </div>
</template>