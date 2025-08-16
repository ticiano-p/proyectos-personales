<?php

?>
<x-layout>
    <x-slot:title>Eliminar {{ $blog->titulo }}</x-slot:title>
<div class="nav nav-tabs mx-5 mt-3 align-items-center ">
        <a class="link-dark nav-link fs-4" href="{{route('admin.index')  }}"><i class="bi bi-arrow-left me-2"></i>Mas Articulos</a>
    </div>
    <h1 class="mx-5" >Confirmacion para eliminar: <strong>{{ $blog->titulo }}</strong></h1>

    <p class="mx-5"> Estas a punto de <b>eliminar</b> el articulo: <b>{{ $blog->titulo }}</b> </p>
    <p class="mx-5">¿Quieres proceder con la eliminacion?</p>

    <form 
    action="{{ route('admin.destroy', ['blog' => $blog->blog_id ]) }}" 
    method="POST">
        @csrf
        @method('DELETE')
        <div class="mx-5" >
        <button type="submit" class="btn btn-danger mb-3">Si, Eliminar {{ $blog->titulo }}</button>
        <a href="{{ route('admin.index') }}" class="btn btn-warning mb-3 "> No, Volver al panel </a>
        </div>
    </form>
    <hr class="mb-3">

    

    

</x-layout>