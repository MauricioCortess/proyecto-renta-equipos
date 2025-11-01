// src/stores/auth.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Definimos el tipo de dato para el usuario (usando TypeScript)
interface User {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

// 'defineStore' crea nuestro "cerebro" o "almacén"
// Lo llamamos 'useAuthStore'
export const useAuthStore = defineStore('auth', () => {
  
  // --- STATE (El Estado) ---
  // Guardamos la información del usuario. 'null' significa que no hay nadie logueado.
  const usuario = ref<User | null>(null);
  const token = ref<string | null>(null);

  // --- GETTERS (Computadas) ---
  // Una forma fácil de saber si el usuario está logueado
  const isLoggedIn = computed(() => usuario.value !== null);

  // --- NUEVO GETTER ---
  // Comprueba si el usuario logueado es un admin
  const isAdmin = computed(() => {
    return usuario.value !== null && usuario.value.rol === 'admin';
  });

  // --- ACTIONS (Acciones) ---
  // Acción para simular el login
  function simularLogin(email: string, pass: string) {
    
    // --- NUEVA LÓGICA DE ADMIN ---
    let rolSimulado = 'cliente';
    let nombreSimulado = 'Usuario de Prueba';

    if (email.toLowerCase() === 'admin@renta.com') {
      rolSimulado = 'admin';
      nombreSimulado = 'Administrador';
    }
    // --- FIN DE LA LÓGICA ---
    
    // Aquí es donde en el futuro llamarías a tu API (POST /api/login)
    // Por ahora, solo simulamos la respuesta (el JSON de tu README)
    
    const respuestaSimulada = {
      "usuario": {
        "id": (rolSimulado === 'admin' ? 99 : 1), // ID diferente para el admin
        "nombre": nombreSimulado,
        "email": email,
        "rol": rolSimulado // Usamos el rol simulado
      },
      "token": "eyJh...TokenSimulado...YjM0In0"
    };

    // Guardamos los datos en el estado
    usuario.value = respuestaSimulada.usuario;
    token.value = respuestaSimulada.token;
  }

  // Acción para hacer logout
  function logout() {
    usuario.value = null;
    token.value = null;
  }

  // Exponemos todo para que los componentes lo puedan usar
  return { usuario, token, isLoggedIn, isAdmin, simularLogin, logout } // <-- Añade isAdmin aquí
})