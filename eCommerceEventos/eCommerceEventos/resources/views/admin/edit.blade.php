<?php
// @var  \illuminate\Support\ViewErrorBag $error
// @var  \App\Models\Admin $Admin
$categoryIds= $blog->category->pluck('category_id')->all()
?>

<x-layout>
    <x-slot:title>Panel de administrador</x-slot:title>
     <div class="container mt-3">
      <div class="nav nav-tabs mx-2 mx-md-5 mt-3 align-items-center ">
        <a class="link-dark nav-link fs-4" href="{{route('admin.index')  }}"><i class="bi bi-arrow-left me-2"></i>Mas Articulos</a>
    </div>  
    </div>
     
    <h1 class="mx-2 mx-md-5">Editar Articulo: {{ $blog->titulo }} </h1>
    @if ($errors->any())
       <div class="alert alert-danger">
        <p>La informacion ingresada contiene erorres</p>
       </div>
    @endif
<form action="{{ route('admin.update', ['blog' => $blog->blog_id]) }}" 
      method="POST" 
      enctype="multipart/form-data">
    @csrf
    @method('PUT')
    
    <div class="container mt-4">
        <div class="row g-3">
            <div class="col-12 col-md-6">
                <label for="title" class="form-label">Título</label>
                <input type="text" id="title" name="title" 
                       value="{{ old('title', $blog->titulo) }}"
                       class="form-control @error('title') is-invalid @enderror"
                       @error('title') aria-invalid="true" aria-errormessage="error-title" @enderror>
                @error('title')
                    <div class="text-danger" id="error-title"><p>{{ $message }}</p></div>
                @enderror
            </div>

            <div class="col-12 col-md-6">
                <label for="resumen" class="form-label">Resumen</label>
                <input type="text" id="resumen" name="resumen" 
                       value="{{ old('resumen', $blog->resumen) }}"
                       class="form-control @error('resumen') is-invalid @enderror"
                       @error('resumen') aria-invalid="true" aria-errormessage="error-resumen" @enderror>
                @error('resumen')
                    <div class="text-danger" id="error-resumen"><p>{{ $message }}</p></div>
                @enderror
            </div>

            <div class="col-12 ">
                <label for="contenido" class="form-label">Contenido del artículo</label>
                <textarea id="contenido" name="contenido" rows="6"
                          class="form-control @error('contenido') is-invalid @enderror"
                          @error('contenido') aria-invalid="true" aria-errormessage="error-contenido" @enderror>{{ old('contenido', $blog->contenido) }}</textarea>
      
                @error('contenido')
                    <div class="text-danger" id="error-contenido"><p>{{ $message }}</p></div>
                @enderror
            </div>
<div class="col-md-2 d-flex justify-content-center mt-4 mb-4">
    <div class="dropdown w-100">
      <button class="btn btn-secondary dropdown-toggle w-100" type="button" id="dropdownCategoryButton" data-bs-toggle="dropdown" aria-expanded="false" >
        Tipo de Artículo
      </button>
      <ul class="dropdown-menu " aria-labelledby="dropdownCategoryButton" style="min-width: 200px;">
        @foreach ($category as $cat)
          <li>
            <div class="form-check">
              <input class="form-check-input ms-1"  type="checkbox" value="{{ $cat->category_id }}" id="categoryCheck{{ $cat->category_id }}" name="category_id[]"
                @checked(in_array($cat->category_id, old('category_id', $categoryIds)))>
              <label class="form-check-label ms-2" for="categoryCheck{{ $cat->category_id }}">
                {{ $cat->name }}
              </label>
            </div>
          </li>
        @endforeach
      </ul>
    </div>
  </div>
            <div class="row  align-items-center">
              
              @if ($blog->cover)
                <div  class="col-md-2  ">
    <label for="cover_description" class="form-label">Portada actual:</label>
            <img class="img-fluid" src="{{ \Illuminate\Support\Facades\Storage::url($blog->cover) }}" alt="{{ $blog->cover_description }}" style="max-width: 150px">
  </div>
              @endif
  

  <div class="col-md-6">
    <label for="cover" class="form-label">Portada <span class="small">(Opcional)</span></label>
    <input 
      type="file" 
      id="cover" 
      name="cover" 
      value="{{ old('cover') }}" 
      class="form-control"
    >
  </div>
  <div class="col-md-4">
      <label for="cover_description" class="form-label">Descripcion de la Portada <span class="small">(Opcional)</span></label>
    <input type="text" id="cover_description" name="cover_description" value="{{ old('cover_description', $blog->cover_description) }}"  class="form-control">   
    </div>
</div>

            <div class="col-12 text-end mb-4">
                <button type="submit" class="btn btn-success">Aplicar cambios</button>
            </div>
        </div>
    </div>
</form>

<script src="https://cdn.ckeditor.com/ckeditor5/39.0.1/classic/ckeditor.js"></script>
<script>
    ClassicEditor
    .create(document.querySelector('#contenido'), {
    mediaEmbed: {
        previewsInData: true
    }
}) 
.then(editor => {
            // Aplica escrol al área 
            const editableElement = editor.ui.view.editable.element;
            editableElement.style.height = '50vh';
            editableElement.style.overflowY = 'auto';
            editableElement.style.maxHeight = '100%';
           
        })
    .catch(error => {
        console.error(error);
    });

</script>

</x-layout>