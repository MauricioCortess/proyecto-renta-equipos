// src/stores/reservas.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'

// Creamos un "molde" (interface) para saber cómo es una reserva
export interface Reserva {
  id: number;
  equipoNombre: string;
  equipoImagen: string;
  fechaInicio: string;
  fechaFin: string;
  costoTotal: number;
}

export const useReservasStore = defineStore('reservas', () => {
  
  // --- STATE ---
  // Una lista (array) que guardará todas nuestras reservas simuladas
  const historialReservas = ref<Reserva[]>([])

  // --- ACTIONS ---
  // Una acción para añadir una nueva reserva a la lista
  function addReserva(nuevaReserva: Reserva) {
    historialReservas.value.push(nuevaReserva)
  }

  // Exponemos la lista y la acción
  return { historialReservas, addReserva }
})