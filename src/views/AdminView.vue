<script setup lang="ts">
import { ref } from 'vue' // <-- 1. IMPORTAMOS ref

// Datos simulados para las tablas
const equipos = ref([ 
  { id: 1, nombre: "Workstation Pro Z-Series", precio: 120, disponible: true },
  { id: 2, nombre: "Laptop Gamer Alpha-17", precio: 85, disponible: true },
  { id: 3, nombre: "Servidor de Cómputo R750", precio: 250, disponible: false },
]);

const usuarios = ref([ 
  { id: 1, nombre: "Usuario de Prueba", email: "usuario@prueba.com", rol: "cliente" },
  { id: 99, nombre: "Administrador", email: "admin@renta.com", rol: "admin" },
]);

// --- ¡NUEVOS DATOS AQUÍ! ---
// Datos simulados para las reservas (usando los IDs de arriba)
const reservas = ref([
  { id: 101, usuarioId: 1, equipoId: 2, fechaInicio: "2025-11-10", fechaFin: "2025-11-15", costoTotal: 425, estado: "Confirmada" },
  { id: 102, usuarioId: 1, equipoId: 1, fechaInicio: "2025-11-20", fechaFin: "2025-11-22", costoTotal: 240, estado: "Confirmada" },
  { id: 103, usuarioId: 99, equipoId: 3, fechaInicio: "2025-12-01", fechaFin: "2025-12-05", costoTotal: 1000, estado: "Pendiente" }
]);
</script>

<template>
  <div class="bg-gray-100 min-h-screen p-8">
    <div class="container mx-auto">
      
      <h1 class="text-4xl font-bold text-gray-900 mb-6">Panel de Administración</h1>

      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4">Gestión de Equipos</h2>
        <table class="w-full min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio/Día</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="equipo in equipos" :key="equipo.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ equipo.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ equipo.nombre }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${{ equipo.precio }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span v-if="equipo.disponible" class="text-green-600">Disponible</span>
                <span v-else class="text-red-600">Agotado</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4">Gestión de Usuarios</h2>
        <table class="w-full min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="usuario in usuarios" :key="usuario.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ usuario.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ usuario.nombre }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ usuario.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ usuario.rol }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">Gestión de Reservas</h2>
        <table class="w-full min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Reserva</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Equipo ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha Inicio</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha Fin</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Costo</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="reserva in reservas" :key="reserva.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ reserva.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ reserva.usuarioId }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ reserva.equipoId }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ reserva.fechaInicio }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ reserva.fechaFin }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${{ reserva.costoTotal }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span v-if="reserva.estado === 'Confirmada'" class="text-green-600 font-semibold">{{ reserva.estado }}</span>
                <span v-else class="text-yellow-600 font-semibold">{{ reserva.estado }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>