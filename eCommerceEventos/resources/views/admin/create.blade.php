<?php
// @var  \illuminate\Support\ViewErrorBag $error

// @var  \illuminate\Support\Collection<int, App\Model\category> $category
?>
<x-layout>
    <x-slot:title>Panel de administrador</x-slot:title>
    <div class="nav nav-tabs mx-5 mt-3 align-items-center ">
        <a class="link-dark nav-link fs-4" href="{{route('admin.index')  }}"><i class="bi bi-arrow-left me-2"></i>Mas Articulos</a>
    </div>
    <h1 class="mx-5">Crear nuevo Articulo</h1>
    @if ($errors->any())
       <div class="alert alert-danger">
        <p>La informacion ingresada contiene erorres</p>
       </div>
    @endif
<form action="{{ route('admin.store') }}" method="POST" enctype="multipart/form-data">
    @csrf
    <div class="container mt-4">
        <div class="row mb-3">
            <div class="col-md-6">
                <label for="title" class="form-label">Título</label>
                <input type="text" id="title" name="title" value="{{ old('title') }}"
                    class="form-control @error('title') is-invalid @enderror"
                    @error('title') aria-invalid="true" aria-errormessage="error-title" @enderror>
                @error('title')
                    <div class="text-danger" id="error-title"><p>{{ $message }}</p></div>
                @enderror
            </div>

            <div class="col-md-6">
                <label for="resumen" class="form-label">Resumen</label>
                <input type="text" id="resumen" name="resumen" value="{{ old('resumen') }}"
                    class="form-control @error('resumen') is-invalid @enderror" 
                    @error('resumen') aria-invalid="true" aria-errormessage="error-resumen" @enderror>
                @error('resumen')
                    <div class="text-danger" id="error-resumen"><p>{{ $message }}</p></div>
                @enderror
            </div>
        </div>

        <div class="mb-3">
            <label for="contenido" class="form-label">Contenido del artículo</label>
            <textarea id="contenido" name="contenido" rows="6"
                class="form-control @error('contenido') is-invalid @enderror"
                @error('contenido') aria-invalid="true" aria-errormessage="error-contenido"   @enderror> {{ old('contenido') }}</textarea>
            @error('contenido')
                <div class="text-danger" id="error-contenido"><p>{{ $message }}</p></div>
            @enderror
           </div> 
            
        

        <div class="row  align-items-center">
  <div class="col-md-2 d-flex justify-content-center">
    <div class="dropdown w-100">
      <button 
        class="btn btn-secondary dropdown-toggle w-100" 
        type="button" 
        id="dropdownCategoryButton" 
        data-bs-toggle="dropdown" 
        aria-expanded="false"
      >
        Tipo de Artículo
      </button>
      <ul class="dropdown-menu " aria-labelledby="dropdownCategoryButton" style="min-width: 200px;">
        @foreach ($category as $cat)
          <li>
            <div class="form-check">
              <input 
                class="form-check-input ms-1" 
                type="checkbox" 
                value="{{ $cat->category_id }}" 
                id="categoryCheck{{ $cat->category_id }}" 
                name="category_id[]"
                @checked(in_array($cat->category_id, old('category_id', [])))
              >
              <label class="form-check-label ms-2" for="categoryCheck{{ $cat->category_id }}">
                {{ $cat->name }}
              </label>
            </div>
          </li>
        @endforeach
      </ul>
    </div>
  </div>

    <div class="col-md-6">
      <label for="cover" class="form-label">Portada <span class="small">(Opcional)</span></label>
     <input type="file" id="cover" name="cover"  class="form-control"> 
   
    
  </div>
  <div class="col-md-4">
      <label for="cover_description" class="form-label">Descripcion de la Portada <span class="small">(Opcional)</span></label>
    <input type="text" id="cover_description" name="cover_description"  class="form-control">   
    </div>
</div>

<div class="col-12 text-end mt-4">
        <button type="submit" class="btn btn-success">Publicar</button>
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
             
           editableElement.style.height = '20vh';
            editableElement.style.overflowY = 'auto';
            editableElement.style.overflowX = 'hidden'; 
            editableElement.style.maxHeight = '100%';
            editableElement.style.boxSizing = 'border-box'; 
        })
    .catch(error => {
        console.error(error);
    });

</script>
</x-layout>