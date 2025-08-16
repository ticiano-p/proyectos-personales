<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $title ?? '' }} :: Proyecto Da Vinci</title>
    <link rel="stylesheet" href="{{ url('css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ url('css/style.css') }}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">


</head>

<body>
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-dark custom-navbar  ">
            
            <div class="container ">
                <a class="navbar-brand  " href="/"><img src="{{ asset('images/logo.png') }}" class="me-3" alt="logo">EVENTOS 360</a>
               {{-- <div class="ms-auto"> --}}
<button class="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
               
              <div class="collapse navbar-collapse justify-content-end custom-navbar" id="navbarNav">
                <ul class="navbar-nav ms-4">
                    <li class="nav-item">
                        <x-nav-link route="home.index">
                            Inicio
                        </x-nav-link>
                    </li>
                    <li class="nav-item">
                        <x-nav-link route="Product.index">
                            Productos
                        </x-nav-link>
                    </li>
                    <li class="nav-item">
                        <x-nav-link route="blog.index">
                            Blog
                        </x-nav-link>
                    </li>

                    @guest
        <li class="nav-item">
            <x-nav-link route="auth.login">
                Iniciar Sesión
            </x-nav-link>
        </li>
    @endguest

    @auth
        @if(auth()->user()->role === 'admin')
            <li class="nav-item">
                <x-nav-link route="admin.index">
                    Panel Admin
                </x-nav-link>
            </li>
        @endif
                @if(auth()->user()->role === 'user')
        <li class="nav-item">
            <x-nav-link route="cart.index" >
                <i class="bi bi-cart4 me-1"></i>Carrito
            </x-nav-link>
        </li>
          @endif
    @auth
    @if(auth()->user()->role === 'user')
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle fs-5" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-person-circle me-1"></i> {{ auth()->user()->name }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                    <a class="dropdown-item" href="{{ route('auth.profileUser') }}">
                                <i class="bi bi-person-circle me-2 fs-5"></i>Mi Perfil
                    </a>
                </li>
                <li>
                    <a href="{{ route('product.history') }}" class="dropdown-item">
                        <i class="bi bi-clock-history me-2"></i>Historial de Compras
                    </a>

                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                    <form action="{{ route('auth.logout') }}" method="POST" class="d-inline">
                        @csrf
                        <button type="submit" class="dropdown-item text-danger">
                            <i class="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                        </button>
                    </form>
                </li>
            </ul>
        </li>
    @elseif(auth()->user()->role === 'admin')
        <li class="nav-item">
            <form action="{{ route('auth.logout') }}" method="POST">
                @csrf
                <button type="submit" class="nav-link fs-5 ">
                    <i class="bi bi-box-arrow-right me-1"></i>Cerrar Sesión
                </button>
            </form>
        </li>
    @endif
@endauth

    @endauth        
                </ul>
            </div>
              
            </div>
          </nav>
 {{--  Route::currentRouteName() obtiene el nombre de la ruta actual. se compara con "home.index" y si coincide, se agregan las clases --}}
      
        <main class="@if (Route::currentRouteName() === 'home.index') body @endif">
            @if (session()->has('feedback.message'))
              <div class="container mt-4 alert alert-{{ session()->get('feedback.type','success') }}">
                    {!! session()->get('feedback.message') !!}
              </div>
            @endif


            {{ $slot }}
        </main>
        <footer class="footer custom-navbar text-bg-dark text-center">
            <p>Copyright &copy;<img src="{{asset('images/logo.png')}}" class="ms-2" alt="logo" style="max-height: 25px"> EVENTOS 360</p>
        </footer>
    </div>

    <script src="{{ url('js/bootstrap.bundle.min.js') }}"></script>
    
</body>

</html>
