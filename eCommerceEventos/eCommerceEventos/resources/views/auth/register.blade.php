
<x-layout>
        <x-slot:title>Reguistrarse</x-slot:title>

<div class="container d-flex justify-content-center align-items-center min-vh-100">
  <div class="col-12 col-sm-8 col-md-6 col-lg-6">
    <div>
    <form action="{{ route('auth.store') }}" method="POST" class="py-4 border rounded shadow text-center">
      @csrf
<img src="{{ asset('images/Logo2.png') }}" alt="Logo" class=" img-fluid giro-despacio" style="max-height: 100px;">
      <h2 class="mb-4">Reguistrarse</h2>
      <div class="d-flex justify-content-evenly">
        <div class="mb-3 text-start col-4">
        <label for="name" class="form-label">Nombre</label>
        <input type="text" name="name" id="name" placeholder="Eventos360" class="form-control @error('name')is-invalid @enderror" 
        @error('name')aria-invalid="true" aria-errormessage="error-name" @enderror
        value="{{ old('name') }}">
      @error('name')
        <div class="text-danger" id="error-name"><p>{{$message}}</p></div>
      @enderror
    </div>
      <div class="mb-3 text-start col-6">
        <label for="email" class="form-label">Email</label>
        <input type="email" name="email" id="email" placeholder="Eventos@360.com" class="form-control @error('email')is-invalid @enderror" 
        @error('email')aria-invalid="true" aria-errormessage="error-email" @enderror
        value="{{ old('email') }}">
      @error('email')
        <div class="text-danger" id="error-email"><p>{{$message}}</p></div>
      @enderror
    </div>
</div>
      
    <div class="d-flex justify-content-evenly">
        <div class="mb-3 text-start col-5">
    <label for="password" class="form-label">Contraseña</label>
    <input 
        type="password" 
        name="password" 
        placeholder="******"
        id="password" 
        class="form-control @error('password') is-invalid @enderror"
        @error('password') aria-invalid="true" aria-describedby="error-password" @enderror
    >
    @error('password')
        <div class="invalid-feedback d-block" id="error-password">{{ $message }}</div>
    @enderror
</div>
<div class="mb-3 text-start col-5">
    <label for="password_confirmation" class="form-label">Repetir contraseña</label>
    <input 
        type="password" 
        name="password_confirmation" 
        placeholder="******"
        id="password_confirmation" 
        class="form-control"
    >
</div>
</div>
    
      <button type="submit" class="btn btn-outline-primary w-50">Ingresar</button>
    <div class="mt-2">
      <a href="{{ route('auth.login') }}">¿Ya tienes Cuenta? Iniciar Sesion</a>
    </div>
    </form>
  </div>
</div>
</div>


</x-layout>