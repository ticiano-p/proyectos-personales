
<x-layout>
    <x-slot:title>Historial de {{ $user->name }} </x-slot:title>

    <div class="container my-5">
      <div class="text-start mb-4">
            <a href="{{ route('home.index') }}" class="btn btn-outline-dark rounded-pill px-4">
                <i class="bi bi-arrow-left me-2"></i> Volver al inicio
            </a>
            <hr class="mt-2">
        </div>
        <h1 class="text-center mb-4 fw-bold display-5 ">
            <i class="bi bi-clock-history me-2"></i> Mi Historial de Compras
        </h1>

        

        @forelse($user->orders as $order)
            <div class="ticket border rounded-4 p-4 mb-4 shadow position-relative bg-white">
                <div class="ribbon border border-primary text-primary px-3 py-1 rounded-end position-absolute top-0 start-0 bg-white">
                  Identificador de Pedido #{{ $order->id }} 
                </div>


                <div class="mb-3 pt-4">
                    <h5 class="fw-bold text-secondary">
                        <i class="bi bi-receipt me-2"></i>Detalle del pedido
                    </h5>
                    <hr class=" border-2 opacity-50">
                    <ul class="list-unstyled">
                        @foreach($order->items as $item)
                            <li class="d-flex justify-content-between py-2 border-bottom">
                                <div>
                                    <span class="fw-semibold">{{ $item->product->name }}</span>
                                    <span class="text-muted"> x{{ $item->quantity }}</span>
                                </div>
                                <span class="text-success fw-bold">${{ $item->price }}</span>
                            </li>
                        @endforeach
                    </ul>
                </div>

                <div class="text-end">
                    <h5 class="fw-bold text-dark mt-3">
                        <i class="bi bi-cash-coin me-2"></i>Total: ${{ $order->total }}
                    </h5>
                </div>
            </div>
        @empty
            <div class="alert alert-info text-center my-5 shadow-sm rounded-pill py-4 fs-5">
                <i class="bi bi-info-circle me-2"></i> Aún no tenés compras registradas.
            </div>
        @endforelse
    </div>
</x-layout>
