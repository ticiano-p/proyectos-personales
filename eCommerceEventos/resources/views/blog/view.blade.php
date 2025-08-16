

<x-layout>
    <x-slot:title>Detalle de {{$Blog->titulo}}</x-slot:title>

    <div class="nav nav-tabs mx-5 mt-3 align-items-center ">
        <a class="link-dark nav-link fs-4" href="{{route('blog.index')  }}"><i class="bi bi-arrow-left me-2"></i>Mas Articulos</a>
    </div>
    <div class="container my-5 ">
        <article class="card shadow-lg">
      
          <div class="card-body">
            <h1 class="card-title">{{$Blog->titulo}}</h1>
      
            <div class="mb-3 text-muted small ">
              <span class="badge bg-primary fs-6">
                       @foreach ($Blog->category as $category)
                       <span class=""> {{$category->name}}</span>
                    @endforeach
              </span>
              <span class="ms-2 fs-6">{{$Blog->fecha_publicacion}}</span>
            </div>
       <hr>
                  <p class="lead">{!! $Blog->contenido !!}</p>
            
            {{-- @foreach (explode("\n\n", $Blog->contenido) as $parrafo)
                <p class="lead">{!! nl2br(e(trim($parrafo))) !!}</p>
            @endforeach --}}
          </div>
        </article>
      </div>
</x-layout>