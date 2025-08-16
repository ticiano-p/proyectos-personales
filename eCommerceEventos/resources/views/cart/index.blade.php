<x-layout>
    <x-slot:title>Carrito de compras</x-slot:title>

<div class="container">
    <div class="d-flex justify-content-between my-4">
      <h2 class="">Carrito de compras</h2>
      @if(count($cart))
      <a href="{{ route('cart.clear') }}" class="btn btn-warning">Vaciar carrito</a>
   @endif
    </div>
    
    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    @if(count($cart))
        <div class="table-responsive">
            <table class="table align-middle">
                <thead class="table-light">
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($cart as $id => $details)
                        <tr class="shadow-sm rounded bg-white mb-2 border">
                            <td>{{ $details['name'] }}</td>
                            <td>${{ $details['price'] }}</td>
                            <td>{{ $details['quantity'] }}</td>
                            <td>${{ $details['price'] * $details['quantity'] }}</td>
                            <td>
                                <a href="{{ route('cart.remove', $id) }}" class="btn btn-danger btn-sm">Eliminar</a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <h4 class="text-end mt-4">Total: ${{ $total }}</h4>

            <div class="text-end">
              <a href="{{ route('Mp.show-Buy-Form') }}" class=" btn btn-success">Finalizar compra</a>  
            </div>
            

    @else
        <div class="text-center">
            <img src="images/carritoVacio.gif" alt="Carrito vacío" style="width: 350px; height: auto;">
            <h3>🤔 Tu carrito está vacío.</h3>
            <p>🛒 Visita nuestra tienda y encuentra lo que necesites.</p>
        </div>
    @endif
</div>


</x-layout>
