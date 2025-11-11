import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      // El :id es un parámetro dinámico.
      // Vue Router tomará el número de la URL y nos lo dará.
      path: '/equipo/:id', 
      name: 'detalle-equipo',
      component: () => import('../views/EquipmentDetailView.vue')
    },
    {
  path: '/admin',
  name: 'admin',
  component: () => import('../views/AdminView.vue'),
  // --- AÑADIMOS EL "GUARDIA" DE RUTA ---
  beforeEnter: (to, from, next) => {
    const auth = useAuthStore()
    if (auth.isAdmin) {
      next() // El usuario es admin, déjalo pasar
    } else {
      next('/') // El usuario no es admin, redirígelo al inicio
    }
  }
},
{
      path: '/nosotros',
      name: 'nosotros',
      component: () => import('../views/NosotrosView.vue')
    }
  ],
})

export default router
