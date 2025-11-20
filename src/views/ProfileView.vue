<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useReservasStore } from '@/stores/reservas'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const reservasStore = useReservasStore()
const router = useRouter()

// Opciones: 'perfil', 'reservas', 'pagos', 'password'
const currentTab = ref('perfil') 

const passActual = ref('')
const passNueva = ref('')
const passConfirmar = ref('')

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

function handleAddCard() {
  alert("Aquí se abriría una pasarela de pago segura (Stripe/PayPal) para agregar una nueva tarjeta.")
}

// Para la demostración, puedes tener un ref para cada campo y hacer un guardado simulado
// Por ahora, solo precargamos y deshabilitamos (o habilitamos para demo)
// Para una demo interactiva, podrías usar v-model en cada campo:
const editableNombre = ref(authStore.usuario?.nombre || '');
const editableEmail = ref(authStore.usuario?.email || '');
const editableTelefono = ref(authStore.usuario?.telefono || '');
const editableCP = ref(authStore.usuario?.cp || '');
const editableRfcCurp = ref(authStore.usuario?.rfc_curp || '');
const editableDireccion = ref(authStore.usuario?.direccion || '');

function handleSimulatedSave() {
  // Aquí iría la lógica para enviar los datos al backend
  // Por ahora, es solo una simulación.
  alert("¡Datos de perfil guardados! (Simulación. Los cambios no son persistentes).");
  // En una app real, actualizarías el store y/o redirigirías
  // authStore.updateProfile({ nombre: editableNombre.value, ... })
}

</script>

<template>
  <div class="bg-gray-100 min-h-screen py-12">
    <div class="container mx-auto max-w-6xl px-4">
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">

        <aside class="md:col-span-1">
          <div class="bg-white rounded-lg shadow-lg p-4">
            
            <div class="bg-brand-blue text-white p-4 rounded-lg mb-6 flex items-center space-x-3">
              <div class="w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center font-bold text-xl text-black">
                {{ authStore.usuario?.nombre.charAt(0) }}
              </div>
              <div class="overflow-hidden">
                <h2 class="font-bold text-lg truncate">{{ authStore.usuario?.nombre }}</h2>
                <p class="text-xs text-gray-300 truncate">{{ authStore.usuario?.email }}</p>
              </div>
            </div>

            <nav class="space-y-2">
              <button @click="currentTab = 'perfil'" :class="['w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors', currentTab === 'perfil' ? 'bg-orange-100 text-brand-orange font-bold' : 'text-gray-700 hover:bg-gray-100']">
                <span>&#128100;</span> <span>Datos de perfil</span>
              </button>
              
              <button @click="currentTab = 'reservas'" :class="['w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors', currentTab === 'reservas' ? 'bg-orange-100 text-brand-orange font-bold' : 'text-gray-700 hover:bg-gray-100']">
                <span>&#128179;</span> <span>Mis Reservas</span>
              </button>
              
              <button @click="currentTab = 'pagos'" :class="['w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors', currentTab === 'pagos' ? 'bg-orange-100 text-brand-orange font-bold' : 'text-gray-700 hover:bg-gray-100']">
                <span>&#128179;</span> <span>Métodos de Pago</span>
              </button>

              <button @click="currentTab = 'password'" :class="['w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors', currentTab === 'password' ? 'bg-orange-100 text-brand-orange font-bold' : 'text-gray-700 hover:bg-gray-100']">
                <span>&#128273;</span> <span>Cambio de contraseña</span>
              </button>

              <hr class="my-4">
              
              <button @click="handleLogout" class="w-full flex items-center space-x-3 p-3 rounded-lg text-left text-gray-700 hover:bg-red-100 transition-colors">
                <span>&#128682;</span> <span>Cerrar sesión</span>
              </button>
            </nav>
          </div>
        </aside>

        <main class="md:col-span-3">
          <div class="bg-white rounded-lg shadow-lg p-8">

            <div v-if="currentTab === 'perfil'">
              <h2 class="text-3xl font-bold text-brand-blue mb-1">Datos de Perfil</h2>
              <p class="text-gray-600 mb-6">Información personal y de facturación.</p>
              
              <form class="space-y-6" @submit.prevent="handleSimulatedSave">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Nombre Completo</label>
                    <input type="text" v-model="editableNombre" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Correo electrónico</label>
                    <input type="email" v-model="editableEmail" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                  </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Número de Teléfono</label>
                    <input type="tel" v-model="editableTelefono" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">C.P.</label>
                    <input type="text" v-model="editableCP" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">RFC / CURP (Identificación Oficial)</label>
                  <input type="text" v-model="editableRfcCurp" class="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-500 font-mono">
                  <p class="text-xs text-gray-400 mt-1">Requerido para la validación del contrato de renta.</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Dirección de Entrega</label>
                  <input type="text" v-model="editableDireccion" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                </div>
                
                <div class="text-right">
                  <button 
                    type="submit" 
                    class="bg-brand-orange text-black font-bold py-2 px-6 rounded-lg hover:bg-orange-500 transition-colors transform hover:scale-105"
                  >
                    GUARDAR
                  </button>
                </div>
                <p class="text-gray-500 text-sm">*Los cambios guardados en este formulario son solo para demostración y no son persistentes.</p>
              </form>
            </div>

            <div v-if="currentTab === 'reservas'">
              <h2 class="text-3xl font-bold text-brand-blue mb-6">Mis Reservas</h2>
              <div v-if="reservasStore.historialReservas.length === 0" class="text-center text-gray-500 py-10">
                <p class="text-xl">Aún no tienes reservas.</p>
                <RouterLink to="/catalogo" class="text-brand-orange font-bold hover:underline">¡Renta tu primer equipo!</RouterLink>
              </div>
              <div v-else class="space-y-4">
                <div v-for="reserva in reservasStore.historialReservas" :key="reserva.id" class="flex flex-col md:flex-row bg-gray-50 p-4 rounded-lg shadow-sm border items-center">
                  <img :src="reserva.equipoImagen" class="w-full md:w-32 h-32 object-contain bg-white rounded-md mb-4 md:mb-0 border border-gray-200 p-2">
                  <div class="md:ml-6 flex-grow">
                    <h3 class="text-xl font-semibold text-brand-blue">{{ reserva.equipoNombre }}</h3>
                    <p class="text-gray-700">Del: <span class="font-medium">{{ reserva.fechaInicio }}</span></p>
                    <p class="text-gray-700">Al: <span class="font-medium">{{ reserva.fechaFin }}</span></p>
                  </div>
                  <div class="mt-4 md:mt-0 text-right">
                    <p class="text-xs text-gray-500 uppercase">Total pagado</p>
                    <p class="text-xl font-black text-brand-blue">${{ reserva.costoTotal }}</p>
                    <span class="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded mt-2">CONFIRMADA</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="currentTab === 'pagos'">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-brand-blue">Métodos de Pago</h2>
                <button @click="handleAddCard" class="bg-brand-orange text-black font-bold py-2 px-4 rounded-lg hover:bg-orange-500 text-sm">
                  + Agregar Tarjeta
                </button>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl shadow-lg p-6 text-white relative overflow-hidden h-48 flex flex-col justify-between transform hover:scale-105 transition-transform">
                  <div class="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
                  
                  <div class="flex justify-between items-start">
                    <span class="font-bold italic text-2xl">VISA</span>
                    <span class="bg-green-500 text-xs font-bold px-2 py-1 rounded text-white">PRINCIPAL</span>
                  </div>
                  
                  <div class="text-2xl tracking-widest font-mono mt-4">
                    **** **** **** 4242
                  </div>
                  
                  <div class="flex justify-between items-end text-sm">
                    <div>
                      <p class="text-gray-400 text-xs">TITULAR</p>
                      <p class="font-bold uppercase">{{ authStore.usuario?.nombre }}</p>
                    </div>
                    <div>
                      <p class="text-gray-400 text-xs">EXPIRA</p>
                      <p class="font-bold">12/28</p>
                    </div>
                  </div>
                </div>

                <button @click="handleAddCard" class="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-brand-orange hover:text-brand-orange hover:bg-orange-50 transition-all h-48">
                  <span class="text-4xl mb-2">+</span>
                  <span class="font-bold">Agregar nueva tarjeta</span>
                </button>
              </div>
            </div>

            <div v-if="currentTab === 'password'">
              <h2 class="text-3xl font-bold text-brand-blue mb-6">Cambio de Contraseña</h2>
              <form class="space-y-6 max-w-lg" @submit.prevent="handleChangePassword">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Contraseña Actual</label>
                  <input type="password" v-model="passActual" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Contraseña Nueva</label>
                  <input type="password" v-model="passNueva" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Confirmar Contraseña Nueva</label>
                  <input type="password" v-model="passConfirmar" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required>
                </div>
                <div class="text-right">
                  <button type="submit" class="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-lg transition-colors">
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
```http://googleusercontent.com/image_generation_content/20