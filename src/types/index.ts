// src/types/index.ts
export interface Equipo {
  id: number;
  nombre: string;
  precio: number; // Precio por día
  disponible: boolean;
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: 'cliente' | 'admin' | 'editor'; // Asumiendo roles específicos
}

export interface Reserva {
  id: number;
  usuarioId: number;
  equipoId: number;
  fechaInicio: string; // Formato YYYY-MM-DD
  fechaFin: string;   // Formato YYYY-MM-DD
  costoTotal: number;
  estado: 'Pendiente' | 'Confirmada' | 'Finalizada' | 'Cancelada';
}