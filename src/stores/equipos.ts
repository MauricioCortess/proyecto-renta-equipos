import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEquiposStore = defineStore('equipos', () => {
  
  // AQUÍ ESTÁN TUS DATOS REALES
  const equipos = ref([
    {
      "id": 1,
      "nombre": "Computadora PRIDE GAMING CALIPSO V2",
      "categoria": "workstation",
      "precioPorDia": 2000,
      "disponible": true,
      // Asegúrate que esta imagen exista o usa una URL real
      "imagenUrl": "escritorio1.png", 
      "specs": [
        "AMD Ryzen 7 9700X",
        "32GB RAM DDR5",
        "NVIDIA GeForce RTX 5080"
      ],
      "descripcion": "La mejor opción para gaming extremo y renderizado 3D profesional."
    },
    {
      "id": 2,
      "nombre": "Laptop Gamer Alienware",
      "categoria": "laptop",
      "precioPorDia": 95,
      "disponible": true,
      "imagenUrl": "https://i.imgur.com/gA9mEwS.png",
      "specs": [
        "Intel Core i9",
        "32GB RAM",
        "RTX 4070"
      ],
      "descripcion": "Potencia portátil para gaming y diseño gráfico en cualquier lugar."
    },
    // ... Puedes agregar los demás equipos aquí ...
  ])

  // Acción para buscar un equipo
  function getEquipoById(id: number) {
    return equipos.value.find(e => e.id === id)
  }

  return { equipos, getEquipoById }
})