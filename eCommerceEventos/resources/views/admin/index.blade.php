<x-layout>
    <x-slot:title>Panel de administrador</x-slot:title>
    <section>
      <section class="container my-4">
        <div class="d-flex justify-content-between align-items-center">
          <h1 >Blog de recomendaciones</h1>
          <a class="btn btn-secondary" href="{{ route('admin.create')}} ">Crear nuevo Artículo</a>
        </div>

        {{-- 📊 Estadísticas --}}
  <div class="card border-0 shadow-sm my-4">
  <div class="card-body d-flex align-items-center gap-3">
    <div class="bg-primary bg-opacity-10 text-primary rounded-circle d-flex justify-content-center align-items-center" style="width: 60px; height: 60px;">
      <i class="bi bi-cart-check-fill fs-3"></i>
    </div>
    <div>
      <h2 class="text-muted mb-1 fs-6">Producto más comprado</h2>
      @if($productoMasComprado && $productoMasComprado->product)
        <p class="fw-bold mb-0 fs-5">{{ $productoMasComprado->product->name }}</p>
        <small class="text-secondary ">{{ $productoMasComprado->total_vendidos }} unidades vendidas</small>
      @else
        <p class="text-muted mb-0">No hay ventas registradas aún.</p>
      @endif
    </div>
  </div>
</div>


      </section>
      
      <section class="container ">
        <div class="table-responsive">
          <table class="table table-bordered table-striped">
            <thead class="table-light">
              <tr>
                <th>Título</th>
                <th>Resumen</th>
                <th>Categoría</th>
                <th>Fecha de publicación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              @foreach ($admins as $admin)
              <tr>
                <td class="fw-semibold ">{{ $admin->titulo }}</td>
                <td>{{ $admin->resumen }}</td>
                <td>@foreach ($admin->category as $category)
                       <span class="badge bg-secondary"> {{$category->name}}</span>
                    @endforeach
                </td>
                <td>{{ $admin->fecha_publicacion }}</td>
                <td>
                  <div class="d-flex flex-column flex-md-row gap-1">
                    <a href="{{ route('admin.view', ['blog'=>$admin->blog_id])  }}" class="btn btn-success "><i class="bi bi-eye"></i></a>
                    <a href="{{ route('admin.edit', ['blog'=>$admin->blog_id])  }}" class="btn btn-warning "><i class="bi bi-pencil-square  text-white"></i></a>
                    <a href="{{ route('admin.eliminar', ['blog' => $admin->blog_id ]) }}" class="btn btn-danger "><i class="bi bi-trash3  text-white"></i></a>
                  </div>
                </td>
              </tr>
              @endforeach
            </tbody>
          </table>
        </div>
      </section>
 <section class="d-flex justify-content-center mb-4 ">
   {{ $admins->appends(request()->except('blogs_page'))->links() }}

</section>

    </section><hr>
 <section class="container ">
     <h2 class="">Usuarios registrados</h2>
        <div class="table-responsive">
          <table class="table table-bordered table-striped">
            <thead class="table-light">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              @foreach ($user as $users)
              @if($users->role !== 'admin')
              <tr class="align-middle">
                <td><span class="fw-semibold fs-5">{{ $users->name }}</span></td>
                <td><span class="text-muted fs-5">{{ $users->email }}</span></td>
                <td class="text-center">
                  <a href="{{ route('admin.historial', ['user'=>$users->id])  }}" class="btn btn-success d-inline-flex align-items-center gap-1">
                    <i class="bi bi-eye"></i> Ver Historial de compras
                  </a>
                </td>
              </tr>
              @endif
              @endforeach
            </tbody>
          </table>
        </div>
      </section>
 <section class="d-flex justify-content-center my-4 ">
   {{ $user->appends(request()->except('users_page'))->links() }}

</section>
    </section>
    

    
</x-layout>