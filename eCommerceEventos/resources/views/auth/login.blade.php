
<x-layout>
        <x-slot:title>Iniciar Sesion</x-slot:title>

<div class="container d-flex justify-content-center align-items-center min-vh-100">
  <div class="col-12 col-sm-8 col-md-6 col-lg-4">
    <div>
    <form action="{{ route('auth.authenticate') }}" method="POST" class="p-4 border rounded shadow  text-center">
      @csrf
<img src="{{ asset('images/Logo2.png') }}" alt="Logo" class=" img-fluid giro-despacio" style="max-height: 100px;">
      <h2 class="mb-4">Iniciar sesión</h2>
      <div class="mb-3 text-start">
        <label for="email" class="form-label">Email</label>
        <input type="email" name="email" placeholder="Eventos@360.com" id="email" class="form-control @error('email')is-invalid @enderror" 
        @error('email')aria-invalid="true" aria-errormessage="error-email" @enderror
        value="{{ old('email') }}">
      @error('email')
        <div class="text-danger" id="error-email"><p>{{$message}}</p></div>
      @enderror
    </div>
      <div class="mb-3 text-start">
        <label for="password" class="form-label">Contraseña</label>
        <input type="password" name="password" placeholder="******" id="password" class="form-control @error('password')is-invalid @enderror"
        @error('email')aria-invalid="true" aria-errormessage="error-password" @enderror
        value="{{ old('password') }}"> 
      @error('password')
        <div class="text-danger" id="error-password"><p>{{$message}}</p></div>
      @enderror
    </div>
      <button type="submit" class="btn btn-outline-primary w-100">Ingresar</button>
    <div class="mt-2">
      <a href="{{ route('auth.register') }}">¿No tienes Cuenta? Reguistrarse</a>
    </div>
    </form>
    
  </div>
</div>
</div>

</x-layout>