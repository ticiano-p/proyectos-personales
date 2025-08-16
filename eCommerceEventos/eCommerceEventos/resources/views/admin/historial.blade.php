<?php

?>
<x-layout>
    <x-slot:title>Historial de {{ $user->name }} </x-slot:title>
<h1 class="mx-2 mx-md-5">Historial de compras de: {{ $user->name }}</h1>
<div class="nav nav-tabs mx-5 mt-3 align-items-center ">
        <a class="link-dark nav-link fs-4" href="{{route('admin.index')  }}"><i class="bi bi-arrow-left me-2"></i>Volver al Admin</a>
    </div>
@forelse($user->orders as $order)
  <div class="card container my-4 shadow-sm border-0">
  <div class="card-header bg-white  border-4 border-primary">
    <p class="mb-0 text-dark fw-bold">
      <i class="bi bi-receipt me-2"></i>Codigo del Pedido #{{ $order->id }}
    </p>
  </div>

  <!-- Lista de productos -->
  <ul class="list-group list-group-flush">
    @foreach($order->items as $item)
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <span class="fw-semibold">{{ $item->product->name }}</span>
          <small class="text-muted">x{{ $item->quantity }}</small>
        </div>
        <span class="text-success fw-bold">${{ $item->price }}</span>
      </li>
    @endforeach
  </ul>

  <!-- Total -->
  <div class="card-footer bg-white border-top border-2 border-success d-flex justify-content-end">
    <p class="mb-0 text-dark fw-bold">
      <i class="bi bi-cash-coin me-1"></i>Total: ${{ $order->total }}
    </p>
  </div>
</div>


@empty
  <div class="alert alert-info text-center my-4" role="alert">
    <i class="bi bi-info-circle me-2"></i>
    Este usuario aún no tiene compras registradas.
  </div>
@endforelse


</x-layout>