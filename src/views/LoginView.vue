<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth' // 1. Importamos nuestro "cerebro"

// --- Variables ---
const email = ref('') // Variable reactiva para guardar el email del input
const password = ref('') // Variable reactiva para guardar el password del input

const authStore = useAuthStore() // 2. Inicializamos el "cerebro"
const router = useRouter() // 3. Obtenemos el router para redirigir

// --- Función ---
function handleLogin() {
  // 4. Llamamos a la acción de simularLogin
  authStore.simularLogin(email.value, password.value)
  
  // 5. Redirigimos al usuario al Catálogo
  router.push('/catalogo')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
      
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-6">
        Iniciar Sesión
      </h2>
      
      <form class="space-y-6" @submit.prevent="handleLogin">
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input 
            type="email" 
            id="email"
            v-model="email" 
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="tu@correo.com"
          >
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input 
            type="password" 
            id="password"
            v-model="password" 
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="Tu contraseña"
          >
        </div>

        <div>
          <button 
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Entrar
          </button>
        </div>

      </form>
    </div>
  </div>
</template>