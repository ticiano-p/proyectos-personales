<script setup>
// Importamos el componente.
import { useRouter, RouterLink, RouterView } from 'vue-router'
import { logout } from './services/auth.js'
import useAuthUser from './composables/useAuthUser.js'
import Notification from './components/notification.vue';
import { ref,provide  } from 'vue' 
const router =useRouter()
const { handleLogout }= uselogout(router);
const {user} = useAuthUser();
const notification = ref({ message: null, type: 'success' });
function uselogout(router) {
   function handleLogout(){
         logout()
         router.push('/iniciar-sesion');
        }
        return{
  handleLogout,
}
}

function notify({ message, type = 'success' }) {
  notification.value = { message, type };
  setTimeout(() => {
    notification.value.message = null;
  }, 2000);
}
provide('notify', notify);

</script>

<template>
   
    <nav class="p-4 bg-sky-600 text-white">
  <div class="flex items-center justify-between">
    <RouterLink class="text-lg font-bold" to="/publicaciones">Twitter beta</RouterLink>

    <!-- Menú de navegación -->
    <ul class="flex gap-4 items-center">
      <template v-if="user.id !== null">
        <li>
          <RouterLink to="/publicaciones">Publicaciones</RouterLink>
        </li>
        <li>
          <RouterLink to="/mi-perfil">Mi Perfil</RouterLink>
        </li>
        <li>
          <form action="#" @submit.prevent="handleLogout">
            <button type="submit">{{user.email}} (Cerrar sesión)</button>
          </form>
        </li>
      </template>

      <template v-else>
        <li>
          <RouterLink to="/iniciar-sesion">Ingresar</RouterLink>
        </li>
        <li>
          <RouterLink to="/crear-cuenta">Registrarse</RouterLink>
        </li>
      </template>
    </ul>
  </div>
</nav>

    <main class="container p-4 mx-auto">
      <Notification v-if="notification.message" :content="notification" />
        <RouterView  />
    </main>
    <footer class="bg-gray-900 text-white py-6 mt-auto">
  <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
    
    <!-- Nombre y derechos -->
    <div class="text-center md:text-left">
      <h2 class="text-lg font-semibold">Twitter beta</h2>
      <p class="text-sm text-gray-400">&copy; 2025 - Todos los derechos reservados</p>
    </div>

    <!-- Enlaces -->
    <ul class="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
      
    
    <template v-if="user.id !== null">
        <li>
          <RouterLink to="/publicaciones">Publicaciones</RouterLink>
        </li>
        <li>
          <RouterLink to="/mi-perfil">Mi Perfil</RouterLink>
        </li>
        <li>
          <form action="#" @submit.prevent="handleLogout">
            <button type="submit">{{user.email}} (Cerrar sesión)</button>
          </form>
        </li>
      </template>

      <template v-else>
        <li>
          <RouterLink to="/iniciar-sesion">Ingresar</RouterLink>
        </li>
        <li>
          <RouterLink to="/crear-cuenta">Registrarse</RouterLink>
        </li>
      </template>
    
    </ul>

  </div>
</footer>

</template>

<style scoped>

</style>