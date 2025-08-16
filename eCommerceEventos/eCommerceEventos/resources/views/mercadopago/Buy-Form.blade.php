<?php
   /** @var \App\Models\Product[] $cartItems */
?>

<x-layout>
  <x-slot:title>Confirmar Compra</x-slot:title>

  <div class="container py-5">
    <div class="mb-5 text-center">
      <h2 class="fw-bold mb-1">🧾 Detalles de tu pedido</h2>
      <p class="text-muted">Revisá los productos antes de proceder al pago</p>
    </div>

    <div class="table-responsive shadow rounded-4 overflow-hidden border">
      <table class="table table-striped align-middle mb-0">
        <thead class="bg-light text-center text-uppercase small">
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          @foreach($cartItems as $item)
            <tr class="text-center">
              <td class="fw-medium">{{ $item['name'] }}</td>
              <td>${{ number_format($item['price'], 2) }}</td>
              <td>{{ $item['quantity'] }}</td>
              <td class="text-success fw-semibold">
                ${{ number_format($item['price'] * $item['quantity'], 2) }}
              </td>
            </tr>
          @endforeach
        </tbody>
      </table>
    </div>

    <div class="d-flex justify-content-end align-items-center mt-4">
      <h4 class="fw-bold text-success">
        Total a pagar: ${{ number_format($total, 2) }}
      </h4>
    </div>

    {{-- Botón de Mercado Pago --}}
    <div class="d-flex justify-content-center mt-5">
      <div id="wallet_container" class="p-2 w-auto"></div>
    </div>
  </div>

  {{-- SDK MercadoPago --}}
  <script src="https://sdk.mercadopago.com/js/v2"></script>
  <script>
    const mp = new MercadoPago("{{ env('MP_PUBLIC_KEY') }}", {
        locale: 'es-AR'
    });

    mp.checkout({
        preference: {
            id: "{{ $preferenceId }}"
        },
        render: {
            container: '#wallet_container',
            label: 'Pagar con Mercado Pago',
        }
    });
  </script>
</x-layout>



