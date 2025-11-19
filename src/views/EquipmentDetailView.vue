<script setup lang="ts">
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { ref, computed } from 'vue' 
import { useAuthStore } from '@/stores/auth'
import { useReservasStore, type Reserva } from '@/stores/reservas'
// --- 1. IMPORTAMOS EL STORE DE EQUIPOS ---
import { useEquiposStore } from '@/stores/equipos'

// --- Stores y Router ---
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const reservasStore = useReservasStore()
const equiposStore = useEquiposStore() // Inicializamos el store

// --- Variables del formulario ---
const fechaInicio = ref('')
const fechaFin = ref('')

// --- 2. OBTENER DATOS REALES DEL STORE ---
const equipoId = Number(route.params.id) // Convertimos ID de URL a número
// Buscamos el equipo en el store usando su ID
const equipoEncontrado = equiposStore.getEquipoById(equipoId)

// Si por alguna razón no existe (ej. ID inválido), usamos uno por defecto
const equipoSimulado = ref(equipoEncontrado || {
    id: 0,
    nombre: "Equipo no encontrado",
    categoria: "error",
    precioPorDia: 0,
    disponible: false,
    imagenUrl: "",
    specs: ["No hay especificaciones disponibles"],
    descripcion: "Lo sentimos, no pudimos encontrar este equipo."
})
// ------------------------------------------

// --- Lógica de Cálculo ---
const costoTotalComputado = computed(() => {
  if (!fechaInicio.value || !fechaFin.value) { return 0 }
  const dateInicio = new Date(fechaInicio.value + 'T00:00:00')
  const dateFin = new Date(fechaFin.value + 'T00:00:00')
  if (dateFin <= dateInicio) { return 0 }
  const timeDiff = dateFin.getTime() - dateInicio.getTime()
  const diffEnDias = Math.ceil(timeDiff / 86400000)
  return diffEnDias * equipoSimulado.value.precioPorDia
})


// --- Función de Reserva ---
function handleReserva() {
  if (!authStore.isLoggedIn) {
    alert("Por favor, inicia sesión para poder rentar un equipo.")
    router.push('/login')
    return
  }
  
  if (costoTotalComputado.value <= 0) {
    alert("Por favor, selecciona un rango de fechas válido.")
    return
  }

  const nuevaReserva: Reserva = {
    id: Date.now(), 
    equipoNombre: equipoSimulado.value.nombre,
    equipoImagen: equipoSimulado.value.imagenUrl,
    fechaInicio: fechaInicio.value,
    fechaFin: fechaFin.value,
    costoTotal: costoTotalComputado.value
  }

  reservasStore.addReserva(nuevaReserva)

  alert(`¡Reserva confirmada exitosamente!\nTotal: $${costoTotalComputado.value}`)
  
  router.push('/catalogo')
}
</script>

<template>
  <div class="bg-gray-100 min-h-screen py-12">
    <div class="container mx-auto max-w-4xl bg-white rounded-lg shadow-lg p-8">

      <div class="flex flex-col md:flex-row gap-8">
        
        <div class="md:w-1/2">
          <img :src="equipoSimulado.imagenUrl" :alt="equipoSimulado.nombre" class="w-full rounded-lg shadow-md h-64 object-cover">
        </div>

        <div class="md:w-1/2">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ equipoSimulado.nombre }}</h1>
          
          <p class="text-gray-700 text-3xl font-light mb-4">
            ${{ equipoSimulado.precioPorDia }} <span class="text-lg text-gray-500">/ día</span>
          </p>
          
          <p class="text-gray-600 mb-4">{{ equipoSimulado.descripcion }}</p>

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

                <div v-if="costoTotalComputado > 0" class="my-4 text-center">
                  <p class="text-gray-600">Total estimado:</p>
                  <p class="text-3xl font-bold text-brand-blue">
                    ${{ costoTotalComputado }}
                  </p>
                </div>

                <button 
                  type="button"
                  @click="handleReserva"
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
                  Ir a Login
                </RouterLink>
              </div>
            </div>

          </div>

        </div>
      </div>
      
    </div>
  </div>
</template>