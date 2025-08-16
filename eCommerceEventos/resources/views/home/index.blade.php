<x-layout>
    <x-slot:title> Página Principal </x-slot:title>
<section class="body">
    <!-- Encabezado principal -->
    <header class="text-center py-5 " style="background-color: #121212; color: #fff;">
        <div class="container">
            <h1 class="display-4 fw-bold">Equipa tus Eventos con Tecnología y Estilo</h1>
            <p class="lead">Encuentra soluciones profesionales en iluminación, sonido y mobiliario para crear experiencias inolvidables en cualquier tipo de evento.</p>
            <a href="{{ route('Product.index') }}" class="btn btn-gold btn-lg mt-3">
                Ver Equipos Disponibles
            </a>
        </div>
    </header>

    <!-- Galería de servicios con textos -->
    <section class="container py-5 text-white">
        <div class="row text-center">
            <div class="col-md-4 mb-4">
                <img src="{{ asset('images/lucesHome.png') }}" class="img-fluid rounded" alt="Luces decorativas">
                <h5 class="mt-3">Iluminación Decorativa</h5>
                <p class="text-gray-300">Crea ambientes mágicos con luces cálidas y envolventes, perfectas para bodas y recepciones.</p>
            </div>
            <div class="col-md-4 mb-4">
                <img src="{{ asset('images/carpaHome.png') }}" class="img-fluid rounded" alt="Carpas para eventos">
                <h5 class="mt-3">Carpas Elegantes</h5>
                <p class=" text-gray-300">Ofrece comodidad y protección en exteriores con carpas resistentes y de gran presencia.</p>
            </div>
            <div class="col-md-4 mb-4">
                <img src="{{ asset('images/djHome.png') }}" class="img-fluid rounded" alt="Equipo de sonido DJ">
                <h5 class="mt-3">Audio y DJ Profesional</h5>
                <p class="text-gray-300">Garantiza una experiencia sonora de alto nivel con equipos de última generación para fiestas y eventos.</p>
            </div>
        </div>
    </section>
    

   <section class="container py-5 d-flex flex-column flex-lg-row align-items-center gap-4">
            <div class="col-lg-6">
                <h2 class="mb-4 fw-bold">Bienvenidos a Eventos 360</h2>
                <p class="fs-5 mb-3">
                    En Eventos 360, nos especializamos en ofrecer soluciones profesionales en iluminación, sonido y mobiliario, diseñadas para transformar cualquier evento en una experiencia inolvidable. Nuestro compromiso es brindar un servicio integral y de calidad que se adapte a las necesidades únicas de cada celebración.
                </p>
                <p class="fs-5">
                    Ya sea una boda, conferencia, cumpleaños o evento corporativo, contamos con el equipo y la experiencia para crear ambientes impactantes que marcan la diferencia. Confía en nosotros para hacer de tu evento un momento único e inigualable.
                </p>
            </div>
            <div class="col-lg-6 text-center">
                <img 
                    src="{{ asset('images/baner-BaE-360.jpg') }}" 
                    alt="Presentación Eventos 360" 
                    class="img-fluid rounded shadow-sm"
                >
            </div>
        </section>
      

    <section class="text-white py-5">
        <div class="container text-center">
          <h2 class="display-5 fw-bold mb-4">Descubre Cómo Transformamos Eventos</h2>
          <p class="mb-4 text-gray-300">
            Mira este breve video y conoce cómo nuestros equipos de iluminación, sonido y carpas crean experiencias inolvidables.
          </p>
      
          <div class="ratio ratio-16x9 rounded shadow-sm overflow-hidden">
            <iframe 
              src="https://www.youtube.com/embed/RG2kKOct6IU?autoplay=1&mute=1" 
              title="Video demostrativo de eventos"
              allowfullscreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
            </iframe>
          </div>
        </div>
      </section>
      
      


      <section class="py-5  text-light">
        <div class="container text-center">
          <h3 class="fw-bold mb-4">¿Qué Ofrecemos?</h3>
          <div class="row">
            <div class="col-md-3">
                <img src="{{asset('images/Illu.png')}}" alt="" class="icon mb-3">
                <p>Iluminación Profesional</p>
            </div>
            <div class="col-md-3">
              <img src="{{asset('images/Par.png')}}" alt="" class="icon mb-3">
              <p>Sonido de Alta Fidelidad</p>
            </div>
            <div class="col-md-3">
                <img src="{{asset('images/Car.png')}}" alt="" class="icon mb-3">
                <p>Carpas y Escenarios</p>
            </div>
            <div class="col-md-3">
                <img src="{{asset('images/PerTec.png')}}" alt="" class="icon mb-3">
                <p>Personal Técnico</p>
            </div>
          </div>
        </div>
      </section>
      
      <section class="text-center text-white bg-dark py-5">
            <div class="container">
                <h4 class="fw-bold mb-3">¿Listo para organizar tu próximo evento?</h4>
                <p class="mb-4 text-secondary">Hacelo fácil con nuestros servicios y asesoramiento personalizado.</p>
                <a href="{{ route('Product.index') }}" class="btn btn-warning btn-lg text-dark fw-semibold px-4">
                    Solicitar Cotización
                </a>
            </div>
        </section>
      
      
      
      
      </section>
      
</x-layout>
