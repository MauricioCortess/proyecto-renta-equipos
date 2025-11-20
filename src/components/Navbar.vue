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
  <nav class="bg-brand-blue text-white p-4 sticky top-0 z-50 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      
      <RouterLink to="/" class="flex items-center space-x-2">
        <img src="/logonuevo.png" alt="RentxTech Logo" class="h-10 object-contain"> 
      </RouterLink>

      <div class="flex space-x-6 items-center">
        
        <RouterLink to="/" class="text-white hover:text-brand-orange font-medium transition-colors">Inicio</RouterLink> 
        <RouterLink to="/catalogo" class="text-white hover:text-brand-orange font-medium transition-colors">Catálogo</RouterLink> 
        <RouterLink to="/nosotros" class="text-white hover:text-brand-orange font-medium transition-colors">Nosotros</RouterLink> 

        <RouterLink v-if="!authStore.isLoggedIn"
           to="/login"
           class="bg-brand-orange hover:bg-opacity-90 text-black font-bold px-5 py-2 rounded-full transition-transform transform hover:scale-105"> 
          Iniciar Sesión
        </RouterLink>

        <div v-else class="relative group">
          
          <button class="bg-brand-orange text-black font-bold px-4 py-2 rounded-full inline-flex items-center transition-transform transform hover:scale-105">
            <span>{{ authStore.usuario?.nombre }}</span>
            <svg class="fill-current h-4 w-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
          </button>

          <div class="absolute right-0 top-full w-48 bg-white rounded-lg shadow-xl z-50 hidden group-hover:block group-focus-within:block"> 
            <div class="py-1">
              <RouterLink 
                to="/perfil" 
                class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-brand-orange"
              >
                Mi Perfil
              </RouterLink>

              <hr class="border-gray-200 my-1">

              <button 
                @click="handleLogout"
                class="block w-full text-left px-4 py-2 text-sm text-red-600 font-medium hover:bg-red-50"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        <RouterLink 
          v-if="authStore.isAdmin"
          to="/admin" 
          class="bg-white text-brand-blue font-bold px-4 py-2 rounded-full hover:bg-gray-100 transition-colors shadow-md"
        >
          Panel de Administrador
        </RouterLink>

      </div>
    </div>
  </nav>
</template>