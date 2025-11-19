<script setup lang="ts">
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { ref, computed } from 'vue' 
import { useAuthStore } from '@/stores/auth'
import { useReservasStore, type Reserva } from '@/stores/reservas'
import { useEquiposStore } from '@/stores/equipos' // Importamos el store

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const reservasStore = useReservasStore()
const equiposStore = useEquiposStore()

const fechaInicio = ref('')
const fechaFin = ref('')

// --- OBTENER DATOS ---
const equipoId = Number(route.params.id)
const equipoEncontrado = equiposStore.getEquipoById(equipoId)

// Si no encuentra el equipo (o el ID es inválido), usa datos por defecto para NO CRASHEAR
const equipoSimulado = ref(equipoEncontrado || {
    id: 0,
    nombre: "Equipo no encontrado",
    precioPorDia: 0,
    disponible: false,
    imagenUrl: "",
    specs: ["No especificado"],
    descripcion: "No se encontró información para este equipo."
})

const costoTotalComputado = computed(() => {
  if (!fechaInicio.value || !fechaFin.value) { return 0 }
  const dateInicio = new Date(fechaInicio.value + 'T00:00:00')
  const dateFin = new Date(fechaFin.value + 'T00:00:00')
  if (dateFin <= dateInicio) { return 0 }
  const timeDiff = dateFin.getTime() - dateInicio.getTime()
  const diffEnDias = Math.ceil(timeDiff / 86400000)
  return diffEnDias * equipoSimulado.value.precioPorDia
})

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
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
             <img :src="equipoSimulado.imagenUrl" :alt="equipoSimulado.nombre" class="object-contain w-full h-full">
          </div>
        </div>

        <div class="md:w-1/2">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ equipoSimulado.nombre }}</h1>
          
          <p class="text-gray-700 text-3xl font-light mb-4">
            ${{ equipoSimulado.precioPorDia }} <span class="text-lg text-gray-500">/ día</span>
          </p>
          
          <p class="text-gray-600 mb-4">{{ equipoSimulado.descripcion }}</p>

          <span v-if="equipoSimulado.disponible" 
                class="inline-block bg-green-500 text-white px-3 py-1 rounded-full uppercase font-bold text-xs tracking-wide">
            Disponible
          </span>
          <span v-else 
                class="inline-block bg-red-500 text-white px-3 py-1 rounded-full uppercase font-bold text-xs tracking-wide">
            Agotado
          </span>
        </div>
      </div>

      <div class="mt-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 class="text-xl font-bold text-gray-800 mb-3">Especificaciones</h2>
            <ul class="list-disc list-inside text-gray-700 space-y-1">
              <li v-for="spec in equipoSimulado.specs" :key="spec">{{ spec }}</li>
            </ul>
          </div>

          <div>
            <div v-if="authStore.isLoggedIn">
              <h2 class="text-xl font-bold text-gray-800 mb-3">Reservar Equipo</h2>
              <form class="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4" @submit.prevent="handleReserva">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
                  <input type="date" v-model="fechaInicio" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Fecha de Fin</label>
                  <input type="date" v-model="fechaFin" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
                </div>
                <div v-if="costoTotalComputado > 0" class="text-center">
                  <p class="text-gray-600 text-sm">Total estimado:</p>
                  <p class="text-2xl font-bold text-brand-blue">${{ costoTotalComputado }}</p>
                </div>
                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                  Confirmar Renta
                </button>
              </form>
            </div>
            
            <div v-else>
               <div class="bg-yellow-50 p-6 rounded-lg border border-yellow-200 text-center">
                <p class="text-gray-800 mb-4">Inicia sesión para rentar.</p>
                <RouterLink to="/login" class="bg-brand-orange text-black font-bold py-2 px-4 rounded-lg inline-block">Ir a Login</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>