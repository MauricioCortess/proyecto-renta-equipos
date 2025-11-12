<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useReservasStore } from '@/stores/reservas'
import { useRouter } from 'vue-router'

// --- Stores y Router ---
const authStore = useAuthStore()
const reservasStore = useReservasStore()
const router = useRouter()

const currentTab = ref('perfil') // Opciones: 'perfil', 'reservas', 'password'

const passActual = ref('')
const passNueva = ref('')
const passConfirmar = ref('')

// --- Funciones ---
function handleLogout() {
  authStore.logout()
  router.push('/')
}

function handleChangePassword() {
  if (!passNueva.value || passNueva.value !== passConfirmar.value) {
    alert("Las contraseñas nuevas no coinciden o están vacías.")
    return
  }
  
  alert("¡Contraseña cambiada exitosamente! (Simulación)")
  
  passActual.value = ''
  passNueva.value = ''
  passConfirmar.value = ''
}
</script>

<template>
  <div class="bg-gray-100 min-h-screen py-12">
    <div class="container mx-auto max-w-6xl">
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">

        <aside class="md:col-span-1">
          <div class="bg-white rounded-lg shadow-lg p-4">
            
            <div class="bg-brand-blue text-white p-4 rounded-lg mb-6 flex items-center space-x-3">
              <div class="w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center font-bold text-xl text-black">
                {{ authStore.usuario?.nombre.charAt(0) }}
              </div>
              <div>
                <h2 class="font-bold text-lg">Hola, {{ authStore.usuario?.nombre }}</h2>
                <p class="text-xs text-gray-300">{{ authStore.usuario?.email }}</p>
              </div>
            </div>

            <nav class="space-y-2">
              <button
                @click="currentTab = 'perfil'"
                :class="[
                  'w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors',
                  currentTab === 'perfil' 
                    ? 'bg-orange-100 text-brand-orange font-bold' 
                    : 'text-gray-700 hover:bg-gray-100'
                ]"
              >
                <span>&#128100;</span>
                <span>Datos de perfil</span>
              </button>
              
              <button
                @click="currentTab = 'reservas'"
                :class="[
                  'w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors',
                  currentTab === 'reservas' 
                    ? 'bg-orange-100 text-brand-orange font-bold' 
                    : 'text-gray-700 hover:bg-gray-100'
                ]"
              >
                <span>&#128179;</span>
                <span>Mis Reservas</span>
              </button>
              
              <button
                @click="currentTab = 'password'"
                :class="[
                  'w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors',
                  currentTab === 'password' 
                    ? 'bg-orange-100 text-brand-orange font-bold' 
                    : 'text-gray-700 hover:bg-gray-100'
                ]"
              >
                <span>&#128273;</span>
                <span>Cambio de contraseña</span>
              </button>

              <hr class="my-4">
              
              <button
                @click="handleLogout"
                class="w-full flex items-center space-x-3 p-3 rounded-lg text-left text-gray-700 hover:bg-red-100 transition-colors"
              >
                <span>&#128682;</span>
                <span>Cerrar sesión</span>
              </button>
            </nav>
          </div>
        </aside>

        <main class="md:col-span-3">
          <div class="bg-white rounded-lg shadow-lg p-8">

            <div v-if="currentTab === 'perfil'">
              <h2 class="text-3xl font-bold text-brand-blue mb-1">Datos de Perfil</h2>
              <p class="text-gray-600 mb-6">Completa el perfil con tus datos personales.</p>
              
              <form class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Nombre Completo*</label>
                    <input type="text" :value="authStore.usuario?.nombre" disabled class="mt-1 block w-full bg-gray-100 p-2 border border-gray-300 rounded-md">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Correo electrónico*</label>
                    <input type="email" :value="authStore.usuario?.email" disabled class="mt-1 block w-full bg-gray-100 p-2 border border-gray-300 rounded-md">
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Número de Teléfono</label>
                    <input type="tel" :value="authStore.usuario?.telefono" disabled class="mt-1 block w-full bg-gray-100 p-2 border border-gray-300 rounded-md">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">C.P.</label>
                    <input type="text" :value="authStore.usuario?.cp" disabled class="mt-1 block w-full bg-gray-100 p-2 border border-gray-300 rounded-md">
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Dirección de Entrega</label>
                  <input type="text" :value="authStore.usuario?.direccion" disabled class="mt-1 block w-full bg-gray-100 p-2 border border-gray-300 rounded-md">
                </div>
                <p class="text-gray-500 text-sm">*Por ahora, estos datos no se pueden editar (simulación).</p>
                
                <div class="text-right">
                  <button 
                    type="button"
                    disabled
                    class="bg-red-700 text-white font-bold py-2 px-6 rounded-lg opacity-50 cursor-not-allowed"
                  >
                    GUARDAR
                  </button>
                </div>
              </form>
            </div>

            <div v-if="currentTab === 'reservas'">
              <h2 class="text-3xl font-bold text-brand-blue mb-6">Mis Reservas</h2>
              <div v-if="reservasStore.historialReservas.length === 0" class="text-center text-gray-500 py-10">
                <p class="text-xl">Aún no tienes reservas.</p>
                <RouterLink to="/catalogo" class="text-brand-orange font-bold hover:underline">¡Renta tu primer equipo!</RouterLink>
              </div>
              <div vK-else class="space-y-4">
                <div v-for="reserva in reservasStore.historialReservas" :key="reserva.id" class="flex flex-col md:flex-row bg-gray-50 p-4 rounded-lg shadow-sm border items-center">
                  <img :src="reserva.equipoImagen" class="w-full md:w-32 h-32 object-cover rounded-md mb-4 md:mb-0">
                  <div class="md:ml-6 flex-grow">
                    <h3 class="text-xl font-semibold text-brand-blue">{{ reserva.equipoNombre }}</h3>
                    <p class="text-gray-700">Del: <span class="font-medium">{{ reserva.fechaInicio }}</span></p>
                    <p class="text-gray-700">Al: <span class="font-medium">{{ reserva.fechaFin }}</span></p>
                  </div>
                  <div class="mt-4 md:mt-0 text-right">
                    <p class="text-lg font-bold text-gray-800">Total: ${{ reserva.costoTotal }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="currentTab === 'password'">
              <h2 class="text-3xl font-bold text-brand-blue mb-6">Cambio de Contraseña</h2>
              <form class="space-y-6 max-w-lg" @submit.prevent="handleChangePassword">
                <div>
                  <label for="pass-actual" class="block text-sm font-medium text-gray-700">Contraseña Actual</label>
                  <input type="password" id="pass-actual" v-model="passActual" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required>
                </div>
                <div>
                  <label for="pass-nueva" class="block text-sm font-medium text-gray-700">Contraseña Nueva</label>
                  <input type="password" id="pass-nueva" v-model="passNueva" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required>
                </div>
                <div>
                  <label for="pass-confirmar" class="block text-sm font-medium text-gray-700">Confirmar Contraseña Nueva</label>
                  <input type="password" id="pass-confirmar" v-model="passConfirmar" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required>
                </div>
                <div class="text-right">
                  <button 
                    type="submit"
                    class="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                  >
                    GUARDAR CAMBIOS
                  </button>
                </div>
              </form>
            </div>

          </div>
        </main>

      </div>
    </div>
  </div>
</template>