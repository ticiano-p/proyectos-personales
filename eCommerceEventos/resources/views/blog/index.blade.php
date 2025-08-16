<x-layout >
    <x-slot:title>Listado del blog</x-slot:title>
    <div class="d-flex justify-content-around align-items-end px-4 mb-3 mt-4">
    <h1 class="display-5">Blog de recomendaciones</h1>

    <section class="me-5 ">
        <form action="{{ route('blog.index') }}" method="get">
            <div class="d-flex gap-3 align-items-end">
                <div class="flex-grow-1">
                    <select name="s-category" id="s-category" class="form-control form-select form-select-lg">
                        <option value="">Todas las clasificaciones</option>
                        @foreach ($category as $category)
                            <option value="{{ $category->category_id }}">{{ $category->name }}</option>
                        @endforeach
                    </select>
                </div>
                <button type="submit" class="btn btn-lg btn-primary">Buscar</button>
            </div>
        </form>
    </section>
</div>

@if ($blogs->isNotEmpty()){
    @foreach ($blogs as $blog)
<div class="card container mb-4 shadow-lg  ">
    <div class="row g-0  shadow-md">
        @if ($blog->cover)
         <div class="col-md-2  pe-2 ">
          <img class="img-fluid " src="{{ \Illuminate\Support\Facades\Storage::url($blog->cover) }}" alt="{{ $blog->cover_description }}">
      </div>   
        @endif
        <!-- Contenido -->
        <div class="col-md-10 ">
            <div class="card-body">
                <h5 class="card-title">{{ $blog->titulo }}</h5>
                
                <div class="d-flex mb-2 ">
                    <p class="me-4">{{$blog->fecha_publicacion}}</p>
                    <p class=" mb-1">
                       @foreach ($blog->category as $category)
                       <span class="badge bg-primary "> {{$category->name}}</span>
                    @endforeach
                                  </p>                
                </div>

                <p class="card-text">{{ $blog->resumen }}</p>

            </div>
            <div class="col-md-2 d-flex align-items-center ">
            <a href="{{ route('blog.view', ['blog'=>$blog->blog_id])  }}" class="btn btn-outline-info mb-2 shadow-em">Conocer mas</a>
        </div>
        </div>
        
    </div>
</div>
@endforeach
}

@else 
    <section class="text-center py-5">
    <p class="alert alert-warning d-inline-block px-4 py-2 rounded shadow-sm fw-semibold display-6">
        <i class="bi bi-exclamation-triangle-fill me-2 "></i>
        No hay ningun articulo con esa clasificacion
    </p>
</section>
  @endif
    <section class="d-flex justify-content-center ">
    {{ $blogs->links() }}
</section>
</x-layout>