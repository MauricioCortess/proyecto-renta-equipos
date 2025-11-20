import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// --- 1. ACTUALIZAMOS EL "MOLDE" DE USUARIO ---
export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  telefono: string;
  cp: string;
  direccion: string;
  rfc_curp: string; // <-- NUEVO: Identificación Fiscal/Legal
  tarjeta: string;  // <-- NUEVO: Terminación de tarjeta
}

export const useAuthStore = defineStore('auth', () => {
  
  // --- STATE ---
  const usuario = ref<User | null>(null);
  const token = ref<string | null>(null);

  // --- GETTERS ---
  const isLoggedIn = computed(() => usuario.value !== null);
  const isAdmin = computed(() => {
    return usuario.value !== null && usuario.value.rol === 'admin';
  });

  // --- ACTIONS ---
  function simularLogin(email: string, pass: string) {
    
    let rolSimulado = 'cliente';
    let nombreSimulado = 'Usuario de Prueba';

    if (email.toLowerCase() === 'admin@renta.com') {
      rolSimulado = 'admin';
      nombreSimulado = 'Administrador';
    }
    
    // --- 2. ACTUALIZAMOS LA RESPUESTA SIMULADA ---
    const respuestaSimulada = {
      "usuario": {
        "id": (rolSimulado === 'admin' ? 99 : 1),
        "nombre": nombreSimulado,
        "email": email,
        "rol": rolSimulado,
        "telefono": "",
        "cp": "",
        "direccion": "",
        "rfc_curp": "",
        "tarjeta": ""  
      },
      "token": "eyJh...TokenSimulado...YjM0In0"
    };

    usuario.value = respuestaSimulada.usuario as User;
    token.value = respuestaSimulada.token;
  }

  function logout() {
    usuario.value = null;
    token.value = null;
  }

  return { usuario, token, isLoggedIn, isAdmin, simularLogin, logout }
})