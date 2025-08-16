<?php
/**  @var illuminate\Database\Eloquent\Collection|\App\Models\Product $products **/

 ?>
<x-layout>
    <x-slot:title>Listado del Productos</x-slot:title>
    <section class="body">
    <div class="row ps-4 pe-4">
        <picture class="col-12 text-center ">
            <img class="img-fluid" src="images/products/slide-1.jpg" alt="Banner de contacto">
        </picture>
    </div>
    <div class="d-flex justify-content-between align-items-end px-4 mb-3">
    <h1>Productos a la venta</h1>
    <section class="me-5">
        <form action="{{ route('Product.index')}}" method="get">
            <div class="d-flex gap-3 align-items-end">
                <div>
                    <input type="search" value="{{ $serchParams['s-name'] }}" name="s-name" placeholder="Busca producto..." id="s-name" class="form-control">
                </div>
                <button type="submit" class="btn btn-primary">Buscar</button>
            </div>
        </form>
    </section>
</div>
  @if ($products->isNotEmpty())
  <div class="row p-5">
        @foreach($products as $product)


        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div class="card h-100  " >
                <!-- Imagen con altura automática y ancho 100% -->
                <img src="images/products/{{ $product->cover }}" alt="{{ $product->cover_description }}" 
                     class="img-fluid mx-auto d-block p-2 " style="max-height: 200px; object-fit: contain;">
                <div class="card-body d-flex flex-column justify-content-between">
                    <!-- Título con altura mínima para alinear -->
                    <h2 class="text-center fs-5 fw-bold mb-3" style="min-height: 48px;">
                        {{ $product->name }}
                    </h2>
                    <div class="d-flex justify-content-around align-items-center mt-auto">
                        <!-- Precio -->
                        <p class="fs-5 mb-0"><strong>$</strong>{{ $product->price }}</p>  
                        <!-- Botón agregar al carrito -->
                        <a href="{{ route('Product.view', ['id'=>$product->product_id])  }}" class="btn btn-outline-success">Conocer Mas</a>
                    </div>
                </div>
            </div>
        </div>
        @endforeach
    </div>
    @else 
    <section class="text-center py-5">
    <p class="alert alert-warning d-inline-block px-4 py-2 rounded shadow-sm fw-semibold">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        No se encontró ningún resultado con tu busqueda
    </p>
</section>


  @endif
    <section class="d-flex justify-content-center my-4 ">
   {{ $products->links() }} 
</section>
</section>
</x-layout>