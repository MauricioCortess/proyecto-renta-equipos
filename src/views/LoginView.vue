<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// --- Variables para Iniciar Sesión ---
const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

// --- Variables para Registrarse ---
const regNombre = ref('')
const regEmail = ref('')
const regPassword = ref('')
const regConfirmPassword = ref('')


// --- Función para Iniciar Sesión (la que ya tenías) ---
function handleLogin() {
  // (Aquí es donde llamarías a POST /api/login)
  authStore.simularLogin(email.value, password.value)
  router.push('/catalogo')
}

// --- Nueva Función para Registrarse ---
function handleRegister() {
  // 1. Verificamos que las contraseñas coincidan
  if (regPassword.value !== regConfirmPassword.value) {
    alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.")
    return // Detenemos la función
  }

  // 2. (Aquí es donde llamarías a POST /api/register)
  console.log('--- SIMULANDO REGISTRO ---')
  console.log('Nombre:', regNombre.value)
  console.log('Email:', regEmail.value)
  
  // 3. Simulamos un login automático después de registrarse
  alert("¡Registro exitoso! Has iniciado sesión.")
  authStore.simularLogin(regEmail.value, regPassword.value)
  
  // 4. Redirigimos al catálogo
  router.push('/catalogo')
}

// Clases de CSS para los inputs (para no repetir)
const inputClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-orange focus:border-brand-orange"
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4">
    <div class="container mx-auto max-w-5xl bg-white rounded-lg shadow-2xl p-8 md:p-12">

      <div class="flex justify-center mb-8">
        <img src="/logo.png" alt="RentxTech Logo" class="h-16 md:h-20">
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">

        <div class="border-r-0 md:border-r md:pr-12 border-gray-200">
          <h2 class="text-3xl font-bold text-center text-brand-blue mb-6">
            Iniciar Sesión
          </h2>
          
          <form class="space-y-6" @submit.prevent="handleLogin">
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" v-model="email" :class="inputClass" placeholder="tu@correo.com" required>
            </div>
            
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
              <input type="password" id="password" v-model="password" :class="inputClass" placeholder="Tu contraseña" required>
            </div>
            
            <div>
              <button 
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-brand-orange hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>

        <div>
          <h2 class="text-3xl font-bold text-center text-brand-blue mb-6">
            Crear Cuenta Nueva
          </h2>
          
          <form class="space-y-6" @submit.prevent="handleRegister">
            
            <div>
              <label for="reg-nombre" class="block text-sm font-medium text-gray-700">Nombre Completo</label>
              <input type="text" id="reg-nombre" v-model="regNombre" :class="inputClass" placeholder="Tu nombre" required>
            </div>
            
            <div>
              <label for="reg-email" class="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="reg-email" v-model="regEmail" :class="inputClass" placeholder="tu@correo.com" required>
            </div>
            
            <div>
              <label for="reg-password" class="block text-sm font-medium text-gray-700">Contraseña</label>
              <input type="password" id="reg-password" v-model="regPassword" :class="inputClass" placeholder="Crea una contraseña" required>
            </div>
            
            <div>
              <label for="reg-confirm" class="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
              <input type="password" id="reg-confirm" v-model="regConfirmPassword" :class="inputClass" placeholder="Repite la contraseña" required>
            </div>
            
            <div>
              <button 
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-brand-blue hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>

      </div> </div>
  </div>
</template>