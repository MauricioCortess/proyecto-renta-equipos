<script setup lang="ts">
import { ref, computed } from 'vue';
import Modal from '@/components/Modal.vue'; 

// --- DATOS ---
const equipos = ref([
  { id: 1, nombre: "Workstation Pro Z-Series", precio: 120, disponible: true },
  { id: 2, nombre: "Laptop Gamer Alpha-17", precio: 85, disponible: true },
  { id: 3, nombre: "Servidor de Cómputo R750", precio: 250, disponible: false },
  { id: 4, nombre: "Monitor UltraWide 34'", precio: 60, disponible: true },
  { id: 5, nombre: "Drone DJI Mavic Air 2", precio: 150, disponible: true },
  { id: 6, nombre: "Cámara Mirrorless Sony A7III", precio: 110, disponible: false },
  { id: 7, nombre: "Proyector 4K Optoma", precio: 90, disponible: true },
  { id: 8, nombre: "VR Headset Oculus Quest 2", precio: 75, disponible: true },
  { id: 9, nombre: "Micrófono Rode NT-USB", precio: 25, disponible: true },
  { id: 10, nombre: "Estabilizador Gimbal Ronin-S", precio: 40, disponible: false },
]);

const usuarios = ref([
  { id: 1, nombre: "Usuario de Prueba", email: "usuario@prueba.com", rol: "cliente" },
  { id: 99, nombre: "Administrador", email: "admin@renta.com", rol: "admin" },
  { id: 2, nombre: "Cliente VIP", email: "vip@prueba.com", rol: "cliente" },
  { id: 3, nombre: "Editor de Contenido", email: "editor@renta.com", rol: "editor" },
  { id: 4, nombre: "Soporte Técnico", email: "soporte@renta.com", rol: "cliente" },
  { id: 5, nombre: "Gerente de Ventas", email: "ventas@renta.com", rol: "admin" },
]);

const reservas = ref([
  { id: 101, usuarioId: 1, equipoId: 2, fechaInicio: "2025-11-10", fechaFin: "2025-11-15", costoTotal: 425, estado: "Confirmada" },
  { id: 102, usuarioId: 1, equipoId: 1, fechaInicio: "2025-11-20", fechaFin: "2025-11-22", costoTotal: 240, estado: "Confirmada" },
  { id: 103, usuarioId: 99, equipoId: 3, fechaInicio: "2025-12-01", fechaFin: "2025-12-05", costoTotal: 1000, estado: "Pendiente" },
  { id: 104, usuarioId: 2, equipoId: 5, fechaInicio: "2025-12-10", fechaFin: "2025-12-12", costoTotal: 300, estado: "Confirmada" },
  { id: 105, usuarioId: 3, equipoId: 7, fechaInicio: "2026-01-05", fechaFin: "2026-01-08", costoTotal: 270, estado: "Pendiente" },
  { id: 106, usuarioId: 1, equipoId: 4, fechaInicio: "2026-01-15", fechaFin: "2026-01-16", costoTotal: 60, estado: "Confirmada" },
  { id: 107, usuarioId: 99, equipoId: 8, fechaInicio: "2026-02-01", fechaFin: "2026-02-03", costoTotal: 225, estado: "Confirmada" },
]);

// --- ESTADOS DE MODALES Y VARIABLES TEMPORALES ---
const isAddEquipoModalOpen = ref(false);
const isEditEquipoModalOpen = ref(false);
const isEditUserRolModalOpen = ref(false); 

const nuevoEquipo = ref({ nombre: '', precio: 0, disponible: true });
const equipoEnEdicion = ref({ id: 0, nombre: '', precio: 0, disponible: true });
const usuarioEnEdicionRol = ref({ id: 0, nombre: '', email: '', rol: '' });

const rolesDisponibles = ['cliente', 'admin', 'editor']; 

// --- Estados para Búsqueda ---
const searchTextEquipos = ref('');
const searchTextUsuarios = ref('');
const searchTextReservas = ref('');

// --- Estados para Paginación ---
const itemsPerPage = 5; 

const currentPageEquipos = ref(1);
const currentPageUsuarios = ref(1);
const currentPageReservas = ref(1);

// --- Listas Computadas y Filtradas Y PAGINADAS ---
const filteredEquipos = computed(() => {
  const searchLower = searchTextEquipos.value.toLowerCase();
  return equipos.value.filter(equipo =>
    equipo.nombre.toLowerCase().includes(searchLower) ||
    equipo.id.toString().includes(searchLower) ||
    equipo.precio.toString().includes(searchLower)
  );
});

const paginatedEquipos = computed(() => {
  const start = (currentPageEquipos.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredEquipos.value.slice(start, end);
});

const totalPagesEquipos = computed(() => Math.ceil(filteredEquipos.value.length / itemsPerPage));


const filteredUsuarios = computed(() => {
  const searchLower = searchTextUsuarios.value.toLowerCase();
  return usuarios.value.filter(usuario =>
    usuario.nombre.toLowerCase().includes(searchLower) ||
    usuario.email.toLowerCase().includes(searchLower) ||
    usuario.rol.toLowerCase().includes(searchLower) ||
    usuario.id.toString().includes(searchLower)
  );
});

const paginatedUsuarios = computed(() => {
  const start = (currentPageUsuarios.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredUsuarios.value.slice(start, end);
});

const totalPagesUsuarios = computed(() => Math.ceil(filteredUsuarios.value.length / itemsPerPage));


const filteredReservas = computed(() => {
  const searchLower = searchTextReservas.value.toLowerCase();
  return reservas.value.filter(reserva =>
    reserva.id.toString().includes(searchLower) ||
    reserva.usuarioId.toString().includes(searchLower) ||
    reserva.equipoId.toString().includes(searchLower) ||
    reserva.estado.toLowerCase().includes(searchLower)
  );
});

const paginatedReservas = computed(() => {
  const start = (currentPageReservas.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredReservas.value.slice(start, end);
});

const totalPagesReservas = computed(() => Math.ceil(filteredReservas.value.length / itemsPerPage));


// --- FUNCIONES DE PAGINACIÓN ---
function goToPageEquipos(page: number) {
  if (page >= 1 && page <= totalPagesEquipos.value) {
    currentPageEquipos.value = page;
  }
}
function goToPageUsuarios(page: number) {
  if (page >= 1 && page <= totalPagesUsuarios.value) {
    currentPageUsuarios.value = page;
  }
}
function goToPageReservas(page: number) {
  if (page >= 1 && page <= totalPagesReservas.value) {
    currentPageReservas.value = page;
  }
}


// --- FUNCIONES DE EQUIPOS ---
function handleAddEquipo() {
  nuevoEquipo.value = { nombre: '', precio: 0, disponible: true };
  isAddEquipoModalOpen.value = true;
}

function handleEditEquipo(id: number) {
  const equipo = equipos.value.find(e => e.id === id);
  if (equipo) {
    equipoEnEdicion.value = { ...equipo };
    isEditEquipoModalOpen.value = true;
  }
}

function handleDeleteEquipo(id: number, nombre: string) {
  if (confirm(`¿Estás seguro de eliminar: ${nombre}?`)) {
    alert(`Simulación: Equipo ${id} eliminado.`);
  }
}

function saveNuevoEquipo() {
  alert(`Simulación: Equipo "${nuevoEquipo.value.nombre}" creado.`);
  isAddEquipoModalOpen.value = false;
}

function saveEquipoEditado() {
  alert(`Simulación: Equipo "${equipoEnEdicion.value.nombre}" actualizado.`);
  isEditEquipoModalOpen.value = false;
}

// --- FUNCIONES DE USUARIOS ---
function handleEditRolUsuario(id: number, nombre: string) {
  const usuario = usuarios.value.find(u => u.id === id);
  if (usuario) {
    usuarioEnEdicionRol.value = { ...usuario };
    isEditUserRolModalOpen.value = true;
  }
}

function handleDeleteUsuario(id: number, nombre: string) {
  if (confirm(`¿Eliminar usuario ${nombre}?`)) {
    alert(`Simulación: Usuario eliminado.`);
  }
}

function saveUserRolEditado() {
  alert(`Simulación: Rol de ${usuarioEnEdicionRol.value.nombre} cambiado a ${usuarioEnEdicionRol.value.rol}.`);
  isEditUserRolModalOpen.value = false;
}

// --- FUNCIONES DE RESERVAS ---
function handleConfirmarReserva(id: number) { alert(`Reserva ${id} confirmada.`); }
function handleFinalizarReserva(id: number) { alert(`Reserva ${id} finalizada.`); }
function handleCancelarReserva(id: number) { 
  if(confirm("¿Cancelar reserva?")) alert(`Reserva ${id} cancelada.`); 
}
</script>

<template>
  <div class="bg-gray-100 min-h-screen p-8">
    <div class="container mx-auto max-w-7xl">
      
      <h1 class="text-4xl font-bold text-brand-blue mb-8">Panel de Administración</h1>

      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-semibold text-brand-blue">Gestión de Equipos</h2>
          <button @click="handleAddEquipo" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded-lg transition-colors transform hover:scale-105">
            + Añadir Equipo
          </button>
        </div>
        <div class="mb-4">
          <input 
            type="text" 
            v-model="searchTextEquipos" 
            placeholder="Buscar equipos por nombre, ID o precio..." 
            class="p-2 border border-gray-300 rounded-md w-full focus:ring-brand-blue focus:border-brand-blue"
          />
        </div>
        <div class="overflow-x-auto">
          <table class="w-full min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="equipo in paginatedEquipos" :key="equipo.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ equipo.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{{ equipo.nombre }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${{ equipo.precio }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span :class="['px-2 inline-flex text-xs leading-5 font-semibold rounded-full', equipo.disponible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
                    {{ equipo.disponible ? 'Disponible' : 'Agotado' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-medium">
                  <button @click="handleEditEquipo(equipo.id)" class="bg-brand-orange text-black py-1 px-3 rounded-md text-sm font-medium transition-colors hover:bg-orange-500">Editar</button>
                  <button @click="handleDeleteEquipo(equipo.id, equipo.nombre)" class="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md text-sm font-medium ml-2 transition-colors">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="totalPagesEquipos > 1" class="flex justify-center items-center mt-6 space-x-2">
          <button 
            @click="goToPageEquipos(currentPageEquipos - 1)" 
            :disabled="currentPageEquipos === 1"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg disabled:opacity-50 transition-colors hover:bg-gray-400"
          >
            Anterior
          </button>
          <span class="text-gray-700">Página {{ currentPageEquipos }} de {{ totalPagesEquipos }}</span>
          <button 
            @click="goToPageEquipos(currentPageEquipos + 1)" 
            :disabled="currentPageEquipos === totalPagesEquipos"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg disabled:opacity-50 transition-colors hover:bg-gray-400"
          >
            Siguiente
          </button>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-semibold text-brand-blue mb-4">Gestión de Usuarios</h2>
        <div class="mb-4">
          <input 
            type="text" 
            v-model="searchTextUsuarios" 
            placeholder="Buscar usuarios por nombre, email, rol o ID..." 
            class="p-2 border border-gray-300 rounded-md w-full focus:ring-brand-blue focus:border-brand-blue"
          />
        </div>
        <div class="overflow-x-auto">
          <table class="w-full min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="usuario in paginatedUsuarios" :key="usuario.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ usuario.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{{ usuario.nombre }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ usuario.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">{{ usuario.rol }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-medium">
                  <button @click="handleEditRolUsuario(usuario.id, usuario.nombre)" class="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md text-sm font-medium transition-colors">Editar Rol</button>
                  <button @click="handleDeleteUsuario(usuario.id, usuario.nombre)" class="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md text-sm font-medium ml-2 transition-colors">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="totalPagesUsuarios > 1" class="flex justify-center items-center mt-6 space-x-2">
          <button 
            @click="goToPageUsuarios(currentPageUsuarios - 1)" 
            :disabled="currentPageUsuarios === 1"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg disabled:opacity-50 transition-colors hover:bg-gray-400"
          >
            Anterior
          </button>
          <span class="text-gray-700">Página {{ currentPageUsuarios }} de {{ totalPagesUsuarios }}</span>
          <button 
            @click="goToPageUsuarios(currentPageUsuarios + 1)" 
            :disabled="currentPageUsuarios === totalPagesUsuarios"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg disabled:opacity-50 transition-colors hover:bg-gray-400"
          >
            Siguiente
          </button>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-semibold text-brand-blue mb-4">Gestión de Reservas</h2>
        <div class="mb-4">
          <input 
            type="text" 
            v-model="searchTextReservas" 
            placeholder="Buscar reservas por ID, usuario ID, equipo ID o estado..." 
            class="p-2 border border-gray-300 rounded-md w-full focus:ring-brand-blue focus:border-brand-blue"
          />
        </div>
        <div class="overflow-x-auto">
          <table class="w-full min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Equipo</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fechas</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="reserva in paginatedReservas" :key="reserva.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{{ reserva.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ reserva.usuarioId }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ reserva.equipoId }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ reserva.fechaInicio }} / {{ reserva.fechaFin }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">${{ reserva.costoTotal }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                   <span :class="['px-2 inline-flex text-xs leading-5 font-semibold rounded-full', reserva.estado === 'Confirmada' ? 'bg-green-100 text-green-800' : reserva.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800']">
                    {{ reserva.estado }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-medium space-x-2">
                  <button v-if="reserva.estado === 'Pendiente'" @click="handleConfirmarReserva(reserva.id)" class="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded text-xs">Confirmar</button>
                  <button v-if="reserva.estado === 'Confirmada'" @click="handleFinalizarReserva(reserva.id)" class="bg-gray-500 hover:bg-gray-600 text-white py-1 px-2 rounded text-xs">Finalizar</button>
                  <button @click="handleCancelarReserva(reserva.id)" class="text-red-600 hover:text-red-900 text-xs underline">Cancelar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="totalPagesReservas > 1" class="flex justify-center items-center mt-6 space-x-2">
          <button 
            @click="goToPageReservas(currentPageReservas - 1)" 
            :disabled="currentPageReservas === 1"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg disabled:opacity-50 transition-colors hover:bg-gray-400"
          >
            Anterior
          </button>
          <span class="text-gray-700">Página {{ currentPageReservas }} de {{ totalPagesReservas }}</span>
          <button 
            @click="goToPageReservas(currentPageReservas + 1)" 
            :disabled="currentPageReservas === totalPagesReservas"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg disabled:opacity-50 transition-colors hover:bg-gray-400"
          >
            Siguiente
          </button>
        </div>
      </div>

    </div>

    <Modal :is-open="isAddEquipoModalOpen" @close="isAddEquipoModalOpen = false">
      <template #header>Añadir Nuevo Equipo</template>
      <div class="space-y-4">
        <div><label class="block text-sm font-medium text-gray-700">Nombre</label><input type="text" v-model="nuevoEquipo.nombre" class="mt-1 block w-full p-2 border border-gray-300 rounded-md"></div>
        <div><label class="block text-sm font-medium text-gray-700">Precio</label><input type="number" v-model.number="nuevoEquipo.precio" class="mt-1 block w-full p-2 border border-gray-300 rounded-md"></div>
        <div class="flex items-center"><input type="checkbox" v-model="nuevoEquipo.disponible" class="mr-2"> <label>Disponible</label></div>
      </div>
      <template #footer>
        <button @click="isAddEquipoModalOpen = false" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mr-2">Cancelar</button>
        <button @click="saveNuevoEquipo" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">Guardar</button>
      </template>
    </Modal>

    <Modal :is-open="isEditEquipoModalOpen" @close="isEditEquipoModalOpen = false">
      <template #header>Editar Equipo</template>
      <div class="space-y-4">
        <div><label class="block text-sm font-medium text-gray-700">ID</label><input type="text" :value="equipoEnEdicion.id" disabled class="mt-1 block w-full bg-gray-100 p-2 rounded-md"></div>
        <div><label class="block text-sm font-medium text-gray-700">Nombre</label><input type="text" v-model="equipoEnEdicion.nombre" class="mt-1 block w-full p-2 border border-gray-300 rounded-md"></div>
        <div><label class="block text-sm font-medium text-gray-700">Precio</label><input type="number" v-model.number="equipoEnEdicion.precio" class="mt-1 block w-full p-2 border border-gray-300 rounded-md"></div>
        <div class="flex items-center"><input type="checkbox" v-model="equipoEnEdicion.disponible" class="mr-2"> <label>Disponible</label></div>
      </div>
      <template #footer>
        <button @click="isEditEquipoModalOpen = false" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mr-2">Cancelar</button>
        <button @click="saveEquipoEditado" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">Guardar Cambios</button>
      </template>
    </Modal>

    <Modal :is-open="isEditUserRolModalOpen" @close="isEditUserRolModalOpen = false">
      <template #header>Editar Rol de Usuario</template>
      <div class="space-y-4">
        <div><label class="block text-sm font-medium text-gray-700">Usuario</label><input type="text" :value="usuarioEnEdicionRol.nombre" disabled class="mt-1 block w-full bg-gray-100 p-2 rounded-md"></div>
        <div><label class="block text-sm font-medium text-gray-700">Email</label><input type="text" :value="usuarioEnEdicionRol.email" disabled class="mt-1 block w-full bg-gray-100 p-2 rounded-md"></div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Rol</label>
          <select v-model="usuarioEnEdicionRol.rol" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
            <option v-for="rol in rolesDisponibles" :key="rol" :value="rol">{{ rol }}</option>
          </select>
        </div>
      </div>
      <template #footer>
        <button @click="isEditUserRolModalOpen = false" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mr-2">Cancelar</button>
        <button @click="saveUserRolEditado" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Guardar Rol</button>
      </template>
    </Modal>

  </div>
</template>