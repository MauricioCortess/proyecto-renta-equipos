<script setup lang="ts">
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { ref, computed } from 'vue' 
import { useAuthStore } from '@/stores/auth'
import { useReservasStore, type Reserva } from '@/stores/reservas'
import { useEquiposStore } from '@/stores/equipos' // Importamos la interfaz Equipo si no lo hicimos en el store

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
    categoria: "error",
    precioPorDia: 0,
    // CAMBIO AQUÍ: 'disponible: false' se convierte en 'stock: 0'
    stock: 0, 
    imagenUrl: "",
    specs: ["No especificado"],
    descripcion: "No se encontró información para este equipo."
})

// Propiedad computada para determinar si el equipo está disponible (stock > 0)
const isAvailable = computed(() => equipoSimulado.value.stock > 0)

const costoTotalComputado = computed(() => {
  if (!fechaInicio.value || !fechaFin.value) { return 0 }
  const dateInicio = new Date(fechaInicio.value + 'T00:00:00')
  const dateFin = new Date(fechaFin.value + 'T00:00:00')
  if (dateFin <= dateInicio) { return 0 }
  const timeDiff = dateFin.getTime() - dateInicio.getTime()
  const diffEnDias = Math.ceil(timeDiff / 86400000)
  return diffEnDias * equipoSimulado.value.precioPorDia
})

async function handleReserva() { // Usamos async/await por si hacemos algo asíncrono en el futuro
  if (!authStore.isLoggedIn) {
    alert("Por favor, inicia sesión para poder rentar un equipo.")
    router.push('/login')
    return
  }
  if (costoTotalComputado.value <= 0) {
    alert("Por favor, selecciona un rango de fechas válido.")
    return
  }
  // CAMBIO AQUÍ: Verificamos el stock antes de proceder
  if (!isAvailable.value) {
      alert("Este equipo no tiene unidades disponibles para reservar.")
      return;
  }
  
  // Opcional: Reducir el stock del equipo en el store
  // Es importante hacer esto ANTES de la confirmación visual, o incluso integrar con un backend
  const stockReduced = equiposStore.reducirStock(equipoSimulado.value.id);
  if (!stockReduced) {
      alert("No se pudo reducir el stock. El equipo podría haberse agotado.")
      return;
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
    <div class="container mx-auto max-w-4xl bg-white rounded-lg shadow-lg p-8 border border-gray-200">
      
      <div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/2">
          <div class="h-80 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden border border-gray-100 p-4">
             <img :src="equipoSimulado.imagenUrl" :alt="equipoSimulado.nombre" class="object-contain w-full h-full drop-shadow-md">
          </div>
        </div>

        <div class="md:w-1/2 flex flex-col justify-center">
          <p class="text-xs font-bold text-brand-orange uppercase tracking-widest mb-2">
             {{ equipoSimulado.categoria || 'Equipo' }}
          </p>
          
          <h1 class="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">{{ equipoSimulado.nombre }}</h1>
          
          <div class="mb-6">
             <p class="text-gray-500 text-sm font-medium uppercase mb-1">Precio por día</p>
             <p class="text-4xl font-black text-brand-blue">
               ${{ equipoSimulado.precioPorDia }}
             </p>
          </div>
          
          <p class="text-gray-600 mb-6 text-lg leading-relaxed">{{ equipoSimulado.descripcion }}</p>

          <div>
             <span v-if="isAvailable" 
                   class="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold tracking-wide border border-green-200">
               <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
               DISPONIBLE ({{ equipoSimulado.stock }})
             </span>
             <span v-else 
                   class="inline-flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold tracking-wide border border-red-200">
               <span class="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
               AGOTADO
             </span>
          </div>
        </div>
      </div>

      <hr class="my-10 border-gray-200">

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
               <span class="bg-gray-100 p-2 rounded-md mr-3">⚙️</span> Especificaciones
            </h2>
            <ul class="space-y-3">
              <li v-for="spec in equipoSimulado.specs" :key="spec" class="flex items-start text-gray-700">
                 <span class="text-brand-orange mr-2 text-base">•</span> {{ spec }}
              </li>
            </ul>
          </div>

          <div>
            <div v-if="authStore.isLoggedIn">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                 <span class="bg-gray-100 p-2 rounded-md mr-3">📅</span> Reservar Equipo
              </h2>
              <form class="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-5 shadow-sm" @submit.prevent="handleReserva">
                <div class="grid grid-cols-2 gap-4">
                   <div>
                     <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Inicio</label>
                     <input type="date" v-model="fechaInicio" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring focus:ring-brand-orange focus:ring-opacity-50 p-2 text-sm">
                   </div>
                   <div>
                     <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Fin</label>
                     <input type="date" v-model="fechaFin" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring focus:ring-brand-orange focus:ring-opacity-50 p-2 text-sm">
                   </div>
                </div>
                
                <div v-if="costoTotalComputado > 0" class="bg-white p-4 rounded-lg border border-brand-orange/30 text-center">
                  <p class="text-gray-500 text-xs uppercase font-bold mb-1">Total Estimado</p>
                  <p class="text-3xl font-black text-brand-orange">${{ costoTotalComputado }}</p>
                </div>

                <button 
                  type="submit" 
                  :disabled="!isAvailable" 
                  :class="[
                      'w-full py-3 px-4 rounded-lg transition-colors shadow-lg transform active:scale-95 duration-200 font-bold',
                      isAvailable ? 'bg-brand-blue hover:bg-gray-800 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  ]"
                >
                  {{ isAvailable ? 'CONFIRMAR RENTA' : 'EQUIPO AGOTADO' }}
                </button>
              </form>
            </div>
            
            <div v-else>
               <div class="bg-orange-50 p-8 rounded-xl border border-orange-100 text-center">
                <h3 class="text-lg font-bold text-gray-900 mb-2">¿Te interesa este equipo?</h3>
                <p class="text-gray-600 mb-6">Inicia sesión o regístrate para poder realizar una reserva.</p>
                <RouterLink to="/login" class="bg-brand-orange text-black font-bold py-3 px-8 rounded-full inline-block hover:bg-white hover:text-brand-orange border-2 border-brand-orange transition-all">
                   Iniciar Sesión
                </RouterLink>
              </div>
            </div>
          </div>
      </div>
      
    </div>
  </div>
</template>