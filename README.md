# 💻 Proyecto: Renta de Equipos de Cómputo

Este proyecto es una aplicación web desarrollada para la materia de Programación Web. El objetivo es crear una plataforma funcional que permita a los usuarios registrarse, explorar un catálogo de equipos de cómputo de alto rendimiento y rentarlos en línea.

El frontend está construido con **Vue.js 3**, **TypeScript**, y **Tailwind CSS**.

---

## 🚀 Propuesta de API (Contratos JSON)

Esta sección define la estructura de los datos (el "contrato") que el frontend espera recibir del backend para funcionar.

### 1. Obtener Catálogo de Equipos

**Endpoint:** `GET /api/equipos`
**Descripción:** Obtiene la lista de todos los equipos disponibles para rentar.

**Respuesta (Response Body):**
```json
[
  {
    "id": 1,
    "nombre": "Workstation Pro Z-Series",
    "categoria": "workstation",
    "precioPorDia": 120,
    "disponible": true,
    "imagenUrl": "[https://url-de-tu-imagen.com/workstation.jpg](https://url-de-tu-imagen.com/workstation.jpg)",
    "specs": [
      "Intel Xeon W-2223",
      "64GB RAM DDR4",
      "NVIDIA Quadro RTX 4000 8GB",
      "1TB SSD NVMe"
    ]
  },
  {
    "id": 2,
    "nombre": "Laptop Gamer Alpha-17",
    "categoria": "laptop",
    "precioPorDia": 85,
    "disponible": true,
    "imagenUrl": "[https://url-de-tu-imagen.com/laptop-gamer.jpg](https://url-de-tu-imagen.com/laptop-gamer.jpg)",
    "specs": [
      "AMD Ryzen 9 7945HX",
      "32GB RAM DDR5",
      "NVIDIA GeForce RTX 4070 8GB",
      "1TB SSD NVMe"
    ]
  },
  {
    "id": 3,
    "nombre": "Servidor de Cómputo R750",
    "categoria": "servidor",
    "precioPorDia": 250,
    "disponible": false,
    "imagenUrl": "[https://url-de-tu-imagen.com/servidor.jpg](https://url-de-tu-imagen.com/servidor.jpg)",
    "specs": [
      "2x Intel Xeon Gold 6330",
      "256GB RAM ECC",
      "10TB Almacenamiento SAS",
      "Red 10GbE"
    ]
  }
]

Explicación: Se devuelve un Array ([]) de Objetos ({}).

id es el identificador único para saber qué equipo rentar.

precioPorDia es un número para poder hacer cálculos.

disponible es un booleano (true/false) para mostrar u ocultar el botón de "Rentar".

specs es un Array de strings para mostrar fácilmente la lista de características.



2. Autenticar Usuario (Login)
Endpoint: POST /api/login Descripción: Autentica a un usuario y devuelve un token de acceso.

Petición (Request Body): (Lo que el frontend envía)

JSON
{
  "email": "usuario@correo.com",
  "password": "miContraseña123"
}

Respuesta (Response Body): (Lo que el backend devuelve si es exitoso)

JSON
{
  "usuario": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "usuario@correo.com",
    "rol": "cliente"
  },
  "token": "eyJh...UnTokenMuyLargo...YjM0In0.eyJzd...In0.yqW..."
}
Explicación: El frontend envía el email y la contraseña. El backend responde con los datos del usuario (para poder mostrar "Bienvenido, Juan") y un token. Este token se guarda en el frontend para autenticar futuras peticiones (como crear una reserva).



3. Crear una Nueva Reserva
Endpoint: POST /api/reservas Descripción: Crea una nueva reserva para un usuario autenticado. (Esta ruta debe estar protegida y requerir el token de login).

Petición (Request Body): (Lo que el frontend envía)
JSON
{
  "equipoId": 2,
  "fechaInicio": "2025-11-10",
  "fechaFin": "2025-11-15"
}

Respuesta (Response Body): (Lo que el backend devuelve como confirmación)
JSON
{
  "reserva": {
    "id": 101,
    "equipoId": 2,
    "usuarioId": 1,
    "fechaInicio": "2025-11-10",
    "fechaFin": "2025-11-15",
    "costoTotal": 425,
    "estado": "confirmada"
  },
  "mensaje": "Reserva creada exitosamente."
}
Explicación: El frontend solo envía lo mínimo: equipoId y las fechas. El backend (usando el token del usuario) se encarga de toda la lógica de negocio: validar la disponibilidad, calcular el costoTotal, asignar el usuarioId y confirmar la reserva.

## Project Setup



```sh

npm install

```



### Compile and Hot-Reload for Development



```sh

npm run dev

```



### Type-Check, Compile and Minify for Production



```sh

npm run build

```



### Lint with [ESLint](https://eslint.org/)



```sh

npm run lint

```