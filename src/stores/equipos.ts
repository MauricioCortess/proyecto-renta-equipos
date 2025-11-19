import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEquiposStore = defineStore('equipos', () => {
  
  // --- AQUÍ ESTÁ TU BASE DE DATOS (JSON) ---
  // Modifica esto con tus datos reales y tus nombres de archivo de imagen
  const equipos = ref([
    {
      "id": 1,
      "nombre": "Computadora PRIDE GAMING CALIPSO V2 ",
      "categoria": "workstation",
      "precioPorDia": 2000,
      "disponible": true,
      // CAMBIA ESTO POR TU FOTO EN PUBLIC:
      "imagenUrl": "/escritorio1.png", 
      "specs": [
        "AMD Ryzen 7 9700X",
        "32GB RAM DDR5",
        "NVIDIA GeForce RTX 5080 "
      ],
      "descripcion": "Ideal para renderizado 3D y arquitectura."
    },
    {
      "id": 2,
      "nombre": "Laptop Gamer Alienware",
      "categoria": "laptop",
      "precioPorDia": 95,
      "disponible": true,
      "imagenUrl": "/alienware.jpg", 
      "specs": [
        "Intel Core i9",
        "32GB RAM",
        "RTX 4070"
      ],
      "descripcion": "Potencia portátil para gaming y diseño gráfico."
    },
    // ... ¡Agrega aquí el resto de tus 12 equipos! ...
  ])

  // Acción para obtener un equipo por su ID
  function getEquipoById(id: number) {
    return equipos.value.find(e => e.id === id)
  }

  return { equipos, getEquipoById }
})