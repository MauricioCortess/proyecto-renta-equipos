<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth' 

const authStore = useAuthStore()
const router = useRouter() 

function handleLogout() {
  authStore.logout() 
  router.push('/')   
}
</script>

<template>
  <nav class="bg-brand-blue text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      
      <RouterLink to="/" class="flex items-center space-x-2">
        <img src="/logo.png" alt="RentxTech Logo" class="h-12 rounded-lg"> 
      </RouterLink>
      <div class="flex space-x-4 items-center">
        
        <RouterLink to="/" class="text-white hover:text-brand-orange">Inicio</RouterLink> 
        <RouterLink to="/catalogo" class="text-white hover:text-brand-orange">Catálogo</RouterLink> 
        <RouterLink to="/nosotros" class="text-white hover:text-brand-orange">Nosotros</RouterLink> 

        <RouterLink v-if="!authStore.isLoggedIn"
           to="/login"
           class="bg-brand-orange hover:bg-opacity-80 px-3 py-1 rounded text-black font-medium"> 
          Iniciar Sesión
        </RouterLink>

        <div v-else class="flex space-x-4 items-center">
          <span class="font-medium text-white">Hola, {{ authStore.usuario?.nombre }}</span> 

          <RouterLink v-if="authStore.isAdmin"
             to="/admin" 
             class="hover:text-brand-orange font-bold text-white">
            Panel de Administrador
          </RouterLink>
          
          <button 
            @click="handleLogout"
            class="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white font-medium">
            Cerrar Sesión
          </button>
        </div>

      </div>
    </div>
  </nav>
</template>