<x-layout>
    <x-slot:title>Mi Perfil</x-slot:title>

    <div class="container d-flex justify-content-center align-items-center my-5">
        <div class="card shadow rounded-4 p-4 w-100" style="max-width: 600px;">
            <h2 class="mb-4 text-center text-primary fw-bold">Mi Datos</h2>

            @if(session('success'))
                <div class="alert alert-success text-center">
                    {{ session('success') }}
                </div>
            @endif

            <form action="{{ route('auth.profileEdit') }}" method="POST">
                @csrf
                @method('PUT')

                <div class="mb-3">
                    <label for="name" class="form-label fw-semibold">Nombre completo</label>
                    <input type="text" name="name" class="form-control rounded-3 shadow-sm" value="{{ old('name', $user->name) }}" required>
                </div>

                <div class="mb-3">
                    <label for="phone" class="form-label fw-semibold">Teléfono</label>
                    <input type="text" name="phone" class="form-control rounded-3 shadow-sm" value="{{ old('phone', $user->phone) }}">
                </div>

                <div class="mb-3">
                    <label for="address" class="form-label fw-semibold">Dirección</label>
                    <textarea name="address" rows="2" class="form-control rounded-3 shadow-sm">{{ old('address', $user->address) }}</textarea>
                </div>

                <div class="mb-4">
                    <label for="birthdate" class="form-label fw-semibold">Fecha de nacimiento</label>
                    <input type="date" name="birthdate" class="form-control rounded-3 shadow-sm" value="{{ old('birthdate', $user->birthdate) }}">
                </div>

                <div class="d-grid">
                    <button type="submit" class="btn btn-primary btn-lg rounded-pill">
                        Guardar cambios
                    </button>
                </div>
            </form>
        </div>
    </div>
</x-layout>
