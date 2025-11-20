import { ref, computed } from 'vue' // Importamos 'computed' para el isEquipoDisponible
import { defineStore } from 'pinia'

// Definición de la interfaz del equipo
export interface Equipo {
  id: number
  nombre: string
  categoria: string
  precioPorDia: number
  // CAMBIO AQUÍ: 'disponible' es reemplazado por 'stock'
  stock: number // Número de unidades disponibles
  imagenUrl: string
  specs: string[]
  descripcion: string
}

export const useEquiposStore = defineStore('equipos', () => {
  
  // Aquí están los datos reales de los equipos con la propiedad 'stock'
  const equipos = ref<Equipo[]>([ // Aseguramos el tipo Equipo[]
    {
      "id": 1,
      "nombre": "Computadora PRIDE CALIPSO V2",
      "categoria": "workstation",
      "precioPorDia": 800,
      "stock": 3, // Cambiado de 'disponible: true' a 'stock: 3'
      "imagenUrl": "/escritorio1.png", 
      "specs": [
        "AMD Ryzen 7 9700X",
        "32GB RAM DDR5",
        "NVIDIA GeForce RTX 5080"
      ],
      "descripcion": "La mejor opción para gaming extremo y renderizado 3D profesional."
    },
    {
      "id": 2,
      "nombre": "Computadora KAIJU CAT:5",
      "categoria": "workstation",
      "precioPorDia": 1000,
      "stock": 0, // Cambiado de 'disponible: false' a 'stock: 0'
      "imagenUrl": "/escritorio2.png",
      "specs": [
        "Intel Core i9-14900KF",
        "64GB DDR5 RAM",
        "NVIDIA GeForce RTX 5080"
      ],
      "descripcion": "Potencia absoluta, ideal para renderizados instantaneos."
    },
    {
      "id": 3,
      "nombre": "Laptop Gaming LENOVO LOQ 15ARP9",
      "categoria": "laptop",
      "precioPorDia": 350,
      "stock": 5, // Cambiado de 'disponible: true' a 'stock: 5'
      "imagenUrl": "/laptop1.png",
      "specs": [
        "AMD Ryzen 5 7235HS",
        "12GB",
        "NVIDIA GeForce RTX 4050"
      ],
      "descripcion": "Ideal para juegos ligeros y productividad ligera."
    },
    {
      "id": 4,
      "nombre": "Laptop Gamer MSI THIN 15 B13VE",
      "categoria": "laptop",
      "precioPorDia": 500,
      "stock": 0, // Cambiado de 'disponible: false' a 'stock: 0'
      "imagenUrl": "/laptop2.png",
      "specs": [
        "Intel Core i5-13420H",
        "16GB DDR4 RAM",
        "NVIDIA GeForce RTX 4060"
      ],
      "descripcion": "Ideal para todo tipo de juegos y renders medianos."
    },
    {
      "id": 5,
      "nombre": "Computadora PRIDE GAMING PBA CRONOS",
      "categoria": "workstation",
      "precioPorDia": 1350,
      "stock": 1, // Cambiado de 'disponible: true' a 'stock: 1'
      "imagenUrl": "/escritorio3.png",
      "specs": [
        "AMD RYZEN 7 9800X3D",
        "64GB DDR5 RAM",
        "NVIDIA GeForce RTX 5080"
      ],
      "descripcion": "Ideal para juegos, streaming y renders medio-altos."
    },
    {
      "id": 6,
      "nombre": "Laptop HP Inspiron 3520",
      "categoria": "laptop",
      "precioPorDia": 200,
      "stock": 8, // Cambiado de 'disponible: true' a 'stock: 8'
      "imagenUrl": "/laptop3.png",
      "specs": [
        "Intel Core i5-1235U",
        "8GB DDR4 RAM",
        "256GB SSD"
      ],
      "descripcion": "Ideal para trabajos de ofimatica."
    },
    {
      "id": 7,
      "nombre": "Servidor Empresarial ASUS TS700-E9-RS8",
      "categoria": "servidor",
      "precioPorDia": 200,
      "stock": 2, // Cambiado de 'disponible: true' a 'stock: 2'
      "imagenUrl": "/servidor1.jpg",
      "specs": [
        "Xeon Silver 4210R",
        "16GB DDR4 RAM",
        "1TB"
      ],
      "descripcion": "Diseño flexible para entornos de oficina y centro de datos."
    },
  ])

  // Función para buscar un equipo por ID
  function getEquipoById(id: number) {
    return equipos.value.find(e => e.id === id)
  }

  // Acción para reducir el stock de un equipo (llamado al reservar, por ejemplo)
  function reducirStock(id: number, cantidad: number = 1) {
    const equipo = equipos.value.find(e => e.id === id);
    if (equipo && equipo.stock >= cantidad) {
      equipo.stock -= cantidad;
      return true; // Éxito en la reducción
    }
    return false; // No hay suficiente stock o el equipo no existe
  }

  // Getter para saber si un equipo está disponible (stock > 0)
  const isEquipoDisponible = (id: number) => {
    const equipo = equipos.value.find(e => e.id === id);
    return equipo ? equipo.stock > 0 : false;
  }
  
  return { equipos, getEquipoById, reducirStock, isEquipoDisponible }
})