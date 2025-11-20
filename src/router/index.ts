import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  
  // --- ¡ESTO ES LO NUEVO! ---
  // Esta función controla el comportamiento del scroll
  scrollBehavior(to, from, savedPosition) {
    // Si el usuario usa el botón "Atrás" del navegador, vuelve a donde estaba
    if (savedPosition) {
      return savedPosition
    }
    // Si es una navegación normal, SIEMPRE sube al inicio (top: 0)
    return { top: 0 }
  },
  // ---------------------------

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/catalogo',
      name: 'catalogo',
      component: () => import('../views/CatalogView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/equipo/:id', 
      name: 'detalle-equipo',
      component: () => import('../views/EquipmentDetailView.vue')
    },
    {
      path: '/nosotros',
      name: 'nosotros',
      component: () => import('../views/NosotrosView.vue')
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('../views/ProfileView.vue'),
      beforeEnter: (to, from, next) => {
        const auth = useAuthStore()
        if (auth.isLoggedIn) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      beforeEnter: (to, from, next) => {
        const auth = useAuthStore()
        if (auth.isAdmin) {
          next() 
        } else {
          next('/') 
        }
      }
    }
  ],
})

export default router