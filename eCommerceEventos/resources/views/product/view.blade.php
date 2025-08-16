<x-layout>
    <x-slot:title>Detalle de {{ $products->name }}</x-slot:title>

    <div class="container my-5">
@if(session('success'))
    <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
        {{ session('success') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif

        <!-- Navegación -->
        <nav class=" nav nav-tabs mb-4">
            <a href="{{ route('Product.index') }}" class="btn btn-outline-secondary d-inline-flex align-items-center">
                <i class="bi bi-arrow-left me-2"></i> Más productos
            </a>
        </nav>

        <div class="row g-4 align-items-center">

            <div class="col-12 col-md-5 text-center bg-light rounded p-3 shadow-sm">
                <img 
                    src="{{ asset('images/products/' . $products->cover) }}" 
                    alt="{{ $products->cover_description }}" 
                    class="img-fluid rounded"
                    loading="lazy"
                >
            </div>

            <div class="col-12 col-md-7">

                <h1 class="fw-bold mb-3">{{ $products->name }}</h1>

                <div class="mb-3 d-flex flex-wrap gap-4 fs-5">
                    <div>
                        <span class="fw-semibold">Fabricante:</span> {{ $products->manufacturer }}
                    </div>
                    <div>
                        <span class="fw-semibold">Categoría:</span> {{ $products->category }}
                    </div>
                </div>

                <p class="fs-4 mb-4">
                    <span class="fw-bold">Precio:</span> ${{ number_format($products->price, 2, ',', '.') }}
                </p>

                <p class="fs-5 mb-4">
                    <span class="fw-semibold">Descripción:</span> <br> {{ $products->description }}
                </p>

                <form action="{{ route('cart.add', $products->product_id) }}" method="POST" style="display:inline;">
    @csrf
    <button type="submit" class="btn btn-primary btn-lg">
        <i class="bi bi-cart-plus me-2"></i> Agregar al carrito
    </button>
</form>


            </div>

        </div>
    </div>
</x-layout>
