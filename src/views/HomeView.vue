<script setup lang="ts">
import { RouterLink } from 'vue-router'

// Array de iconos SVG para las características
const features = [
  { 
    title: "Entrega Rápida", 
    description: "Recibe y devuelve tu equipo a domicilio, rápido y sin costo adicional en zonas seleccionadas.", 
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-brand-orange mb-3"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375M2.25 10.5h19.5m-1.5 3.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9-2.25V7.5m3 4.5V7.5m1.5 4.5V7.5m3 4.5V7.5m0 3a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-5.25-4.5H5.25M3 20.25h10.5A2.25 2.25 0 0015.75 18V5.25a2.25 2.25 0 00-2.25-2.25H3A2.25 2.25 0 00.75 5.25v12.75A2.25 2.25 0 003 20.25z" /></svg>` 
  },
  { 
    title: "Equipo Personalizado", 
    description: "Configuramos tu equipo con el software y hardware exacto que tu proyecto exige. Tú pides, nosotros armamos.", 
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-brand-orange mb-3"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.061.365.317.66.676.865l1.173.73c.404.252.504.743.29 1.107l-1.474 2.203a1.865 1.865 0 00-.318.66m-4.912-2.183a8.96 8.96 0 01-3.315.618c-1.777 0-3.416-.607-4.482-1.624a18.334 18.334 0 00-.105-.115 11.068 11.068 0 01-2.9-7.398c0-1.77.724-3.49 2.099-4.787a.974.974 0 01.59-.19l.581.077a.981.981 0 01.701.442 5.8 5.8 0 01.692 1.487m4.912-2.183c-.073.238-.27.397-.5.474L9.4 6.736a1.865 1.865 0 00-.318.66m4.912-2.183l-1.1.343a1.865 1.865 0 01-.676.865L12 7.072m-4.912-2.183L7.228 3.32c-.09-.543-.56-.94-1.11-.94H4.075c-.55 0-1.02.398-1.11.94l-.213 1.281c-.061.365-.317.66-.676.865L.936 6.597c-.404.252-.504.743-.29 1.107l1.474 2.203a1.865 1.865 0 00.318.66m4.912-2.183c.073.238.27.397.5.474L7.4 6.736a1.865 1.865 0 00.318.66m4.912-2.183a8.96 8.96 0 013.315.618c1.777 0 3.416-.607 4.482-1.624a18.334 18.334 0 01.105-.115 11.068 11.068 0 002.9-7.398c0-1.77-.724-3.49-2.099-4.787a.974.974 0 00-.59-.19l-.581.077a.981.981 0 00-.701.442 5.8 5.8 0 00-.692 1.487m-4.912-2.183l1.1.343a1.865 1.865 0 01.676.865L12 7.072m-7.25 11.293V18a3 3 0 00-6 0v.581m0 0C.246 19.3 0 20.013 0 20.75a3 3 0 106 0c0-.737-.246-1.45-.694-2.009L1.936 15.59a.974.974 0 01-.59-.19L.75 15.198M16.75 18a3 3 0 00-6 0v.581m0 0C10.246 19.3 10 20.013 10 20.75a3 3 0 106 0c0-.737-.246-1.45-.694-2.009L11.936 15.59a.974.974 0 01-.59-.19L10.75 15.198" /></svg>` 
  },
  { 
    title: "Soporte Premium 24/7", 
    description: "Nuestro equipo de expertos te asiste en todo momento. Resoluciones rápidas para que nunca detengas tu trabajo.", 
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-brand-orange mb-3"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712L12 15l-2.121-2.121c-1.172-1.025-1.172-2.687 0-3.712zM22 10.5h-2.25a1.125 1.125 0 01-1.125-1.125V7.5m-12 3L9 15m-1.5-6.75L6 10.5m1.5-6.75h.008v.008H7.5V3.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM12 9l3.75-3.75M17.25 10.5H22" /></svg>` 
  },
  { 
    title: "Precios Competitivos", 
    description: "Ofrecemos las tarifas más atractivas del mercado con planes flexibles, desde 1 día hasta 36 meses. Renta más, paga menos.", 
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-brand-orange mb-3"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.795 2.104c.829.18 1.65-.106 2.076-.838.254-.457.29-.959.1-1.472L18.368 8.716m-1.092 0L15.347 1.83A2.25 2.25 0 0013.373 0H10.5a2.25 2.25 0 00-2.249 1.83L6.467 8.716m-1.092 0L2.25 18.75M12 12.75h.008v.008H12v-.008z" /></svg>` 
  }
];
</script>

<template>
  <div class="relative h-screen bg-cover bg-center bg-no-repeat" 
       :style="{ backgroundImage: 'url(/mi-fondo-hero.jpg)' }">
    <div class="absolute inset-0 bg-gray-900 opacity-70"></div> 
    
    <div class="relative z-10 container mx-auto flex flex-col items-center justify-center py-24 px-4 text-center h-full">
      <h1 class="text-5xl md:text-7xl font-extrabold leading-tight text-white drop-shadow-lg animate-fade-in-up">
        Renta el Poder que <span class="text-brand-orange">Necesitas</span>,
        <br />
        Cuando lo <span class="text-brand-orange">Necesitas</span>.
      </h1>
      <p class="text-lg md:text-xl text-gray-200 mt-6 max-w-3xl leading-relaxed animate-fade-in-up delay-200">
        Accede a estaciones de trabajo de alto rendimiento, laptops gamer y servidores para tus proyectos más exigentes, sin la necesidad de comprar.
      </p>
      <RouterLink 
        to="/catalogo" 
        class="bg-brand-orange hover:bg-orange-500 text-brand-blue font-bold text-lg px-10 py-4 rounded-full mt-12 transition-all transform hover:scale-105 shadow-xl animate-fade-in-up delay-400"
      >
        Explorar Catálogo de Equipos
      </RouterLink>
    </div>
  </div>

  <div class="bg-slate-50 py-24 text-center">
    <div class="container mx-auto px-4 max-w-4xl">
      <p class="text-base text-gray-500 font-semibold uppercase tracking-wider mb-3 animate-fade-in">
        Maximiza tu inversión, minimiza tus gastos
      </p>
      <h2 class="text-4xl md:text-5xl font-extrabold text-brand-blue mb-6 leading-tight animate-fade-in delay-200">
        Soluciones de arrendamiento para cada tipo de proyecto y empresa
      </h2>
      <div class="w-24 h-1.5 bg-brand-orange mx-auto rounded-full mb-8 animate-fade-in delay-300"></div>
      <p class="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto animate-fade-in delay-400">
        En <span class="font-bold text-brand-blue">RentxTech</span>, te brindamos la asesoría experta para que rentes el equipo ideal, adaptado a tus necesidades específicas. Ofrecemos cobertura nacional y garantía de servicio premium.
      </p>
    </div>
  </div>

  <div class="bg-white py-20">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-4xl font-extrabold text-brand-blue mb-12 animate-fade-in-up">Ventajas de elegir RentxTech</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div v-for="(feature, index) in features" :key="index" class="p-6 bg-slate-50 rounded-xl shadow-soft flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300 animate-fade-in-up" :style="{ 'animation-delay': `${200 * (index + 1)}ms` }">
          <div v-html="feature.icon"></div>
          <h3 class="font-bold text-brand-blue text-xl mb-2 mt-2">{{ feature.title }}</h3>
          <p class="text-gray-600 text-sm leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-gray-100 py-24">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="order-2 lg:order-1 animate-fade-in-left">
          <img src="/foto-productividad.jpg" alt="Soporte RentxTech" class="rounded-3xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500">
        </div>
        <div class="text-gray-800 order-1 lg:order-2 animate-fade-in-right">
          <h2 class="text-4xl md:text-5xl font-extrabold text-brand-blue mb-6 leading-tight">
            Potencia y Confianza: Equipo de Cómputo de Calidad
          </h2>
          <div class="space-y-5 text-gray-700 text-lg leading-relaxed">
            <p>En <span class="font-bold text-brand-blue">RentxTech</span>, disponemos de una <span class="text-brand-orange font-bold">extensa variedad de equipos</span> que se adaptan a cualquier demanda, desde proyectos personales hasta infraestructuras empresariales complejas.</p>
            <p>Cada uno de nuestros equipos está <span class="font-bold text-brand-blue">garantizado y respaldado</span> por un riguroso mantenimiento, asegurando un rendimiento óptimo y una fiabilidad inquebrantable.</p>
            <p>Ofrecemos <span class="font-bold text-brand-blue">instalación básica gratuita</span>, configurando tu equipo para que esté listo desde el primer momento. Simplificamos el proceso para que te enfoques en lo que realmente importa: tu trabajo.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white py-24">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="animate-fade-in-left">
          <img src="/queofrecemos.jpg" alt="Equipos de cómputo en renta" class="rounded-3xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500">
        </div>
        <div class="text-gray-800 animate-fade-in-right">
          <h2 class="text-4xl md:text-5xl font-extrabold text-brand-blue mb-6 leading-tight">
            Tu Proyecto, Nuestro Hardware: Soluciones a Medida
          </h2>
          <p class="text-lg text-gray-700 leading-relaxed mb-6">
            En RentxTech, no solo rentamos equipo; ofrecemos acceso inmediato al hardware de última generación que necesitas para llevar tus proyectos al siguiente nivel.
          </p>
          <ul class="list-none text-lg text-gray-700 space-y-3 pl-0">
            <li class="flex items-start">
              <span class="text-brand-orange text-2xl mr-3 leading-none">&bull;</span> Workstations de alta gama para Modelado 3D, Renderizado y Animación.
            </li>
            <li class="flex items-start">
              <span class="text-brand-orange text-2xl mr-3 leading-none">&bull;</span> Laptops Gamer y profesionales para Desarrollo de Software y Pruebas.
            </li>
            <li class="flex items-start">
              <span class="text-brand-orange text-2xl mr-3 leading-none">&bull;</span> Servidores potentes para Análisis de Datos, IA y Virtualización.
            </li>
          </ul>
          <RouterLink to="/nosotros" class="text-brand-orange font-bold mt-8 inline-block hover:underline text-lg flex items-center group">
            Conoce más sobre nuestra misión 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-brand-blue py-16 text-center animate-fade-in-up">
    <div class="container mx-auto px-4 max-w-4xl">
      <h2 class="text-4xl md:text-5xl font-extrabold text-white leading-tight">
        Arrendamiento de <span class="text-brand-orange">PCs de Escritorio</span>
      </h2>
      <p class="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
        Potencia, rendimiento y flexibilidad para tus proyectos más exigentes.
      </p>
    </div>
  </div>
  
  <div class="bg-gray-100 py-24">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="order-2 lg:order-1 animate-fade-in-left">
          <img src="/arrendamientoescritorio.png" alt="Arrendamiento de computadoras" class="rounded-3xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500">
        </div>
        <div class="text-gray-800 order-1 lg:order-2 animate-fade-in-right">
          <h2 class="text-4xl md:text-5xl font-extrabold text-brand-blue mb-6 leading-tight">
            Workstations y PCs de Escritorio: Potencia sin Límites
          </h2>
          <div class="space-y-5 text-gray-700 text-lg leading-relaxed">
            <p>Garantizamos que realices un trabajo extraordinario con el equipo adecuado. Nuestras <span class="font-bold text-brand-orange">computadoras de escritorio están listas</span> para cualquier reto.</p>
            <p class="font-semibold text-brand-blue">Renta computadoras de las marcas más reconocidas del mercado como Dell, HP, Lenovo y ensambles personalizados de alto rendimiento.</p>
            <p>¿Necesitas más memoria o capacidad de almacenamiento? Te ayudamos a <span class="font-bold text-brand-orange">personalizar tu equipo</span> para que se ajuste a tus especificaciones exactas antes de la entrega.</p>
          </div>
          <RouterLink 
            to="/catalogo?categoria=workstation" 
            class="inline-block bg-brand-blue text-white font-bold py-3 px-8 rounded-full hover:bg-brand-orange hover:text-brand-blue transition-colors mt-10 text-lg shadow-lg"
          >
            VER CATÁLOGO DE WORKSTATIONS
          </RouterLink>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-brand-blue py-16 text-center animate-fade-in-up">
    <div class="container mx-auto px-4 max-w-4xl">
      <h2 class="text-4xl md:text-5xl font-extrabold text-white leading-tight">
        Arrendamiento de <span class="text-brand-orange">Laptops</span>
      </h2>
      <p class="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
        Movilidad y alto rendimiento para profesionales exigentes.
      </p>
    </div>
  </div>
  
  <div class="bg-white py-24">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="animate-fade-in-left">
          <img src="/arrendamientolaptops.png" alt="Arrendamiento de laptops" class="rounded-3xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500">
        </div>
        <div class="text-gray-800 animate-fade-in-right">
          <h2 class="text-4xl md:text-5xl font-extrabold text-brand-blue mb-6 leading-tight">
            Laptops de Alto Rendimiento: Movilidad y Poder
          </h2>
          <div class="space-y-5 text-gray-700 text-lg leading-relaxed">
            <p>Encuentra la laptop perfecta que permita a tu equipo <span class="font-bold text-brand-orange">dar lo mejor de sí en cualquier lugar.</span></p>
            <p>Pregunta por nuestro servicio de <span class="font-bold text-brand-blue">entrega e instalación a domicilio</span>, diseñado para tu comodidad y la optimización de tu tiempo.</p>
            <p class="font-semibold text-brand-orange">Renta de laptops DELL, HP, Lenovo y Apple desde 1 día hasta 36 meses, con opciones de configuración personalizadas.</p>
          </div>
          <RouterLink 
            to="/catalogo?categoria=laptop" 
            class="inline-block bg-brand-blue text-white font-bold py-3 px-8 rounded-full hover:bg-brand-orange hover:text-brand-blue transition-colors mt-10 text-lg shadow-lg"
          >
            VER CATÁLOGO DE LAPTOPS
          </RouterLink>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-brand-blue py-20 text-center">
    <div class="container mx-auto px-4 max-w-4xl">
      <h2 class="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
        ¿Listo para potenciar tu proyecto? <span class="text-brand-orange">Contáctanos ahora.</span>
      </h2>
      <a 
        href="https://wa.me/+529981962797" 
        target="_blank" 
        rel="noopener noreferrer"
        class="inline-block bg-brand-orange hover:bg-white text-brand-blue font-bold py-4 px-12 rounded-full text-xl transition-all shadow-xl transform hover:scale-105"
      >
        ¡COTIZA POR WHATSAPP!
      </a>
    </div>
  </div>
</template>

<style>
/* Animaciones sutiles para la entrada de elementos */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0; /* Asegura que el elemento esté oculto antes de la animación */
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-left {
  animation: fadeInLeft 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-right {
  animation: fadeInRight 0.8s ease-out forwards;
  opacity: 0;
}

/* Retrasos para las animaciones (opcional, puedes ajustarlos) */
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
.delay-500 { animation-delay: 0.5s; }
</style>