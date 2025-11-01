<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router' // 1. Importamos useRouter
import { useAuthStore } from '@/stores/auth' 

const authStore = useAuthStore()
const router = useRouter() // 2. Obtenemos la instancia del router

// 3. Creamos una nueva función para manejar el logout
function handleLogout() {
  authStore.logout() // Limpia el estado (como antes)
  router.push('/')   // ¡Redirige al inicio!
}
</script>

<template>
  <nav class="bg-gray-900 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      
      <a href="/" class="text-2xl font-bold">
        Renta<span class="text-green-400">Equipos</span>
      </a>

      <div class="flex space-x-4 items-center">
        <a href="/" class="hover:text-green-400">Inicio</a>
        <a href="/catalogo" class="hover:text-green-400">Catálogo</a>

        <a v-if="!authStore.isLoggedIn" 
           href="/login" 
           class="bg-green-500 hover:bg-green-600 px-3 py-1 rounded">
          Login
        </a>

        <div v-else class="flex space-x-4 items-center">
          <span>Hola, {{ authStore.usuario?.nombre }}</span> 

          <RouterLink v-if="authStore.isAdmin"
            to="/admin" 
            class="hover:text-green-400 font-bold">
  Admin Panel
</RouterLink>
          
          <button 
            @click="handleLogout"
            class="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
            Logout
          </button>
        </div>

      </div>
    </div>
  </nav>
</template>