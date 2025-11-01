<script setup lang="ts">
import { ref } from 'vue' // Importamos 'ref' para crear variables reactivas
import EquipmentCard from '@/components/EquipmentCard.vue';

// --- CAMBIO AQUÍ ---
// ¡Aquí está tu JSON!
// Lo guardamos en una variable "reactiva" (ref) llamada 'equipos'.
// Esto es "Manejar el estado de la aplicación".
const equipos = ref([
  {
    "id": 1,
    "nombre": "Workstation Pro Z-Series",
    "categoria": "workstation",
    "precioPorDia": 120,
    "disponible": true,
    "imagenUrl": "https://i.imgur.com/gA9mEwS.png", // (Puse URLs de imagen de ejemplo)
    "specs": [
      "Intel Xeon W-2223",
      "64GB RAM DDR4",
      "NVIDIA Quadro RTX 4000 8GB"
    ]
  },
  {
    "id": 2,
    "nombre": "Laptop Gamer Alpha-17",
    "categoria": "laptop",
    "precioPorDia": 85,
    "disponible": true,
    "imagenUrl": "https://i.imgur.com/gA9mEwS.png",
    "specs": [
      "AMD Ryzen 9 7945HX",
      "32GB RAM DDR5",
      "NVIDIA GeForce RTX 4070 8GB"
    ]
  },
  {
    "id": 3,
    "nombre": "Servidor de Cómputo R750",
    "categoria": "servidor",
    "precioPorDia": 250,
    "disponible": false,
    "imagenUrl": "https://i.imgur.com/gA9mEwS.png",
    "specs": [
      "2x Intel Xeon Gold 6330",
      "256GB RAM ECC",
      "10TB Almacenamiento SAS"
    ]
  },
  {
    "id": 4,
    "nombre": "MacBook Pro 16\" M3 Max",
    "categoria": "laptop",
    "precioPorDia": 110,
    "disponible": true,
    "imagenUrl": "https://i.imgur.com/gA9mEwS.png",
    "specs": [
      "Apple M3 Max Chip",
      "36GB Unified Memory",
      "1TB SSD"
    ]
  }
])
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto py-12">

      <h1 class="text-4xl font-bold text-center text-gray-900 mb-8">
        Catálogo de Equipos
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <EquipmentCard 
          v-for="item in equipos" 
          :key="item.id" 
          :equipo="item" 
        />
        
      </div>

    </div>
  </div>
</template>