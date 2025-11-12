<script setup lang="ts">
import { ref } from 'vue' 

const equipos = ref([ 
  { id: 1, nombre: "Workstation Pro Z-Series", precio: 120, disponible: true },
  { id: 2, nombre: "Laptop Gamer Alpha-17", precio: 85, disponible: true },
  { id: 3, nombre: "Servidor de Cómputo R750", precio: 250, disponible: false },
]);

const usuarios = ref([ 
  { id: 1, nombre: "Usuario de Prueba", email: "usuario@prueba.com", rol: "cliente" },
  { id: 99, nombre: "Administrador", email: "admin@renta.com", rol: "admin" },
]);

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
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-semibold">Gestión de Equipos</h2>
          <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            + Añadir Equipo
          </button>
        </div>
        
        <table class="w-full min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio/Día</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
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
              <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                <button class="bg-brand-orange text-black py-1 px-3 rounded-md text-sm font-medium transition-colors">Editar</button>
                <button class="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md text-sm font-medium ml-2 transition-colors">Eliminar</button>
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
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="usuario in usuarios" :key="usuario.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ usuario.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ usuario.nombre }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ usuario.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ usuario.rol }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                <button class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-sm font-medium transition-colors">Editar Rol</button>
                <button class="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md text-sm font-medium ml-2 transition-colors">Eliminar</button>
              </td>
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
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fechas</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Costo</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="reserva in reservas" :key="reserva.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ reserva.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ reserva.usuarioId }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ reserva.equipoId }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ reserva.fechaInicio }} al {{ reserva.fechaFin }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${{ reserva.costoTotal }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span v-if="reserva.estado === 'Confirmada'" class="text-green-600 font-semibold">{{ reserva.estado }}</span>
                <span v-else class="text-yellow-600 font-semibold">{{ reserva.estado }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                <button v_if="reserva.estado === 'Pendiente'" class="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md text-sm font-medium transition-colors">
                  Confirmar
                </button>
                <button v-if="reserva.estado === 'Confirmada'" class="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded-md text-sm font-medium transition-colors ml-2">
                  Finalizar
                </button>
                <button class="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md text-sm font-medium ml-2 transition-colors">
                  Cancelar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>