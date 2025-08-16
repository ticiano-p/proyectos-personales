<?php
/** @var \App\Models\Blog $blog*/
?>


<x-layout >
     <x-slot:title>Confirmación de edad</x-slot:title>

<div class="container d-flex flex-column justify-content-center align-items-center text-center" style="min-height: 80vh;">
    <div class="card p-4 shadow-lg" style="max-width: 600px; width: 100%;">
        <h1 class="mb-3 text-danger">Se necesita confirmación de edad para continuar</h1>
        <p>El blog <b>{{ $blog->titulo }}</b> está marcado solo para mayores de edad.</p>
        <p>Para continuar, es necesario confirmar que cumples con este requerimiento.</p>

        <form action="{{ route('blog.age-verification.save', ['blog' => $blog->blog_id]) }}" method="POST" class="mt-4">
            @csrf
            <div class="d-flex justify-content-center gap-3">
                <button type="submit" class="btn btn-success">Sí, soy mayor de edad</button>
                <a href="{{ route('blog.index') }}" class="btn btn-outline-danger">No, soy menor de edad</a>
            </div>
        </form>
    </div>
</div>

</x-layout>