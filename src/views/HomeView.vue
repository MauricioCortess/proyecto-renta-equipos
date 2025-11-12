<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="relative h-screen bg-cover bg-center bg-no-repeat" 
       style="background-image: url('/mi-fondo-hero.jpg');">
       
    <div class="absolute inset-0 bg-brand-blue opacity-70"></div>
    
    <div class="relative z-10 container mx-auto flex flex-col items-center justify-center py-24 px-4 text-center h-full">
      <h1 class="text-5xl font-bold leading-tight text-white">
        Renta el Poder que Necesitas,
        <br />
        <span class="text-brand-orange">Cuando lo Necesitas.</span>
      </h1>
      <p class="text-xl text-gray-200 mt-6 max-w-2xl">
        Accede a estaciones de trabajo de alto rendimiento, laptops gamer y servidores para tus proyectos más exigentes, sin la necesidad de comprar.
      </p>
      <RouterLink 
         to="/catalogo" 
         class="bg-brand-orange hover:bg-opacity-80 text-black font-bold text-lg px-8 py-3 rounded-full mt-10 transition-colors">
        Ver Catálogo de Equipos
      </RouterLink>
    </div>
  </div>

  <div class="bg-white py-20">
    <div class="container mx-auto px-4 max-w-3xl text-center">
      
      <p class="text-base text-gray-600 font-semibold uppercase tracking-wider">
        Usa el arrendamiento a favor del crecimiento de tu empresa
      </p>

      <h2 class="text-4xl md:text-5xl font-bold text-brand-blue mt-4 mb-6">
        Renta de computadoras, laptops, pantallas y equipo de cómputo en general
      </h2>

      <div class="w-24 h-1 bg-brand-orange mx-auto mb-6"></div>

      <p class="text-lg text-gray-700 leading-relaxed">
        En <span class="font-bold text-brand-blue">RentxTech</span> te asesoramos, renta el equipo que mejor se adecue a las necesidades de tu estación de trabajo o evento. Tenemos cobertura a nivel nacional y garantía de servicio.
      </p>

    </div>
  </div>

  <div class="bg-gray-100 py-20">
    <div class="container mx-auto px-4">

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div class="text-gray-800">
          <h2 class="text-4xl font-bold text-brand-blue mb-6">
            Alta productividad con equipo de cómputo de calidad
          </h2>
          <div class="space-y-4 text-gray-700 text-lg">
            <p>
              En <span class="font-bold text-brand-blue">RentxTech</span> contamos con una amplia variedad de equipos...
            </p>
            <p>
              Todos nuestros equipos están garantizados y respaldados...
            </p>
            <p>
              Contamos con instalación básica gratuita...
            </p>
            <p>
              Obtén en arrendamiento el equipo que necesitas...
            </p>
          </div>
        </div>
        
        <div>
          <img 
            src="/foto-productividad.jpg" 
            alt="Soporte RentxTech" 
            class="rounded-lg shadow-2xl w-full h-auto object-cover"
          >
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        
        <div>
          <h3 class="font-bold text-brand-blue text-lg mb-2 uppercase">Entrega Gratuita</h3>
          <p class="text-gray-600 text-sm">
            Entrega y recolección del equipo a domicilio sin costo...
          </p>
        </div>
        
        <div>
          <h3 class="font-bold text-brand-blue text-lg mb-2 uppercase">Personaliza tu Equipo</h3>
          <p class="text-gray-600 text-sm">
            Personaliza tu computadora de acuerdo a tus necesidades...
          </p>
        </div>
        
        <div>
          <h3 class="font-bold text-brand-blue text-lg mb-2 uppercase">Soporte Profesional</h3>
          <p class="text-gray-600 text-sm">
            Soporte express, en menos de 24 hrs...
          </p>
        </div>
        
        <div>
          <h3 class="font-bold text-brand-blue text-lg mb-2 uppercase">Mejor Precio</h3>
          <p class="text-gray-600 text-sm">
            Renta desde 5 equipos en adelante...
          </p>
        </div>

      </div>

    </div>
  </div>


  <div class="bg-white py-20">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="text-gray-800">
          <h2 class="text-4xl font-bold text-brand-blue mb-4">¿Qué Ofrecemos?</h2>
          <p class="text-lg text-gray-600 leading-relaxed">En RentxTech, te damos acceso inmediato al hardware...</p>
          <ul class="list-disc list-inside text-lg text-gray-600 mt-4 space-y-2">
            <li>Workstations para Modelado 3D y Render.</li>
            <li>Laptops Gamer para desarrollo y pruebas.</li>
            <li>Servidores potentes para análisis de datos.</li>
          </ul>
          <RouterLink to="/nosotros" class="text-brand-orange font-bold mt-6 inline-block hover:underline text-lg">
            Conoce más sobre nosotros &rarr;
          </RouterLink>
        </div>
        <div>
          <img src="https://i.imgur.com/gA9mEwS.png" alt="Equipos de cómputo en renta" class="rounded-lg shadow-2xl">
        </div>
      </div>
    </div>
  </div>

  <div class="bg-gray-100 py-20">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="text-gray-800">
          <h2 class="text-4xl font-bold text-brand-blue mb-6">
            Arrendamiento de computadoras
          </h2>
          <div class="space-y-4 text-gray-700 text-lg">
            <p>Queremos que realices un gran trabajo con el equipo adecuado...</p>
            <p class="font-semibold text-gray-800">Renta computadoras de las marcas más reconocidas...</p>
            <p>¿Necesitas más memoria o RAM? te ayudamos a personaliza...</p>
          </div>
          <RouterLink 
            to="/catalogo?categoria=workstation" 
            class="inline-block border-2 border-brand-blue text-brand-blue font-bold py-2 px-6 rounded-lg hover:bg-brand-blue hover:text-white transition-colors mt-8 text-lg"
          >
            VER CATÁLOGO
          </RouterLink>
        </div>
        
        <div>
          <img 
            src="/arrendamiento_pc_escritorio.jpg" 
            alt="Arrendamiento de computadoras" 
            class="rounded-lg shadow-2xl w-full h-auto object-cover"
          >
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white py-20">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div>
          <img src="https://i.imgur.com/gA9mEwS.png" alt="Arrendamiento de laptops" class="rounded-lg shadow-2xl">
        </div>

        <div class="text-gray-800">
          <h2 class="text-4xl font-bold text-brand-blue mb-6">
            Arrendamiento de laptops
          </h2>
          <div class="space-y-4 text-gray-700 text-lg">
            <p>
              Encuentre la laptop adecuada que permita a tu gente dar lo mejor...
            </p>
            <p>
              Pregunta sobre nuestro servicio de entrega a domicilio...
            </p>
            <p class="font-semibold text-gray-800">
              Renta de laptops DELL y HP desde 1 día hasta 36 meses.
            </p>
          </div>
          
          <RouterLink 
            to="/catalogo?categoria=laptop" 
            class="inline-block border-2 border-brand-blue text-brand-blue font-bold py-2 px-6 rounded-lg hover:bg-brand-blue hover:text-white transition-colors mt-8 text-lg"
          >
            VER CATÁLOGO
          </RouterLink>
        </div>
        
      </div>
    </div>
  </div>

  <div class="bg-gray-100 py-20">
    <div class="container mx-auto px-4 max-w-3xl text-center">
      
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Te Asesoramos, Cotiza Ahora. Respuesta Inmediata.
      </h2>
      
      <a 
        href="https://wa.me/521XXXXXXXXXX" 
        target="_blank" 
        rel="noopener noreferrer"
        class="inline-block bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
      >
        ¡CONTÁCTANOS!
      </a>
    </div>
  </div>

</template>