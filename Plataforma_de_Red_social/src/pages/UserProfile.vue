<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import {
  getUserProfileByid,
  getPublicacionesLastMassages,
} from "../services/user-profiles.js";
import MainH1 from "../components/MainH1.vue";
import MainLoader from "../components/MainLoader.vue";

const route = useRoute();

const user = ref({
  id: null,
  email: null,
  bio: null,
  display_name: null,
  birthdate: null,
  photo: null,
});

const messages = ref([]);
const loadingUser = ref(true);

const formatDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

onMounted(async () => {
  try {
    loadingUser.value = true;
    const userData = await getUserProfileByid(route.params.id);
    user.value = userData;

    const fetchedMessages = await getPublicacionesLastMassages(user.value.id);
    messages.value = fetchedMessages.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  } catch (error) {
    console.error("Error al cargar perfil o publicaciones:", error);
  } finally {
    loadingUser.value = false;
  }
});
</script>

<template>
  <router-link
    :to="`/publicaciones`"
    class="font-bold text-xl text-gray-400 hover:underline"
  >
    ⬅ Volver ha publicaciones
  </router-link>
  <hr class="my-2" />
  <div v-if="!loadingUser">
    <div class="mx-auto px-6 py-10 bg-white rounded-xl shadow-md">
      <!-- Encabezado -->
      <div class="flex items-center justify-between mb-8">
        <MainH1>Perfil de: {{ user.display_name || user.email }}</MainH1>
      </div>

      <!-- Perfil de usuario -->
      <div class="flex flex-col md:flex-row items-center gap-6 mb-5">
        <!-- avatar -->
        <img
          alt="Foto de perfil"
          class="w-32 h-32 rounded-full border-2 border-blue-600 shadow-md"
          :src="
            user?.photo
              ? `https://tybeupyqjiqftdreziad.supabase.co/storage/v1/object/public/profilephoto/${user.photo}`
              : `https://ui-avatars.com/api/?name=${
                  user.display_name || 'User'
                }`
          "
        />
        <!-- Datos principales -->
        <section class="text-center md:text-left">
          <h2 class="text-2xl font-semibold text-gray-800">{{ user.email }}</h2>
          <p class="text-gray-600">
            @{{ user.display_name || "Sin especificar" }}
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p class="text-sm text-gray-500 font-semibold mb-1">
                {{ user.email }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500 uppercase font-semibold mb-1">
                Fecha de nacimiento:
                <strong>{{ user.birthdate || "Sin especificar" }}</strong>
              </p>
            </div>
          </div>
        </section>
      </div>

      <RouterLink :to="`/usuario/${user.id}/chat`"
        >Iniciar conversación</RouterLink
      >
      <hr class="mb-4" />

      <!-- Biografía -->
      <section class="mb-8">
        <h3 class="text-lg font-medium text-gray-700 mb-2">Biografía</h3>
        <p
          class="text-gray-600 bg-gray-50 p-4 rounded-md border border-gray-200 italic"
        >
          {{ user.bio || "Aca va mi biografía..." }}
        </p>
      </section>

      <!-- Publicaciones -->
      <section class="mb-8">
        <h3 class="text-lg font-medium text-gray-700 mb-2">Publicaciones</h3>
        <div v-if="messages.length === 0" class="flex flex-col items-center justify-center bg-white border border-gray-300 rounded-xl shadow p-6 my-3 text-center">
        <p class="text-xl text-gray-600 font-medium">Aún no hay publicaciones</p>
      </div>
        <div  v-else class="flex-1 p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
          <h2 class="sr-only">Lista de Publicaciones</h2>

          <!-- Loader -->
           
          <MainLoader v-if="loadingUser" />

          <!-- Lista de mensajes -->
          <ol v-else class="flex flex-col gap-6">
            <li
              v-for="message in messages"
              :key="message.id"
              class="bg-white p-4 rounded-lg shadow border border-gray-200"
            >
              <div>
                <RouterLink
                  :to="`/usuario/${message.sender_id}`"
                  class="text-blue-600 font-semibold text-lg hover:underline"
                >
                  {{ message.email }}
                </RouterLink>
              </div>
              <div>
                <p class="text-gray-700 whitespace-pre-wrap">
                  {{ message.body }}
                </p>
                <div class="flex justify-center">
                <img
                  v-if="message.photo"
                  :src="message.photo"
                  alt="Imagen de la publicación"
                  class="mt-3 rounded-lg border max-h-100"
                />
              </div>
              </div>
              <div class="text-lg text-gray-500 mt-2 flex">
                {{ formatDate(message.created_at) }}
                <div class="flex ms-2">
                  <img
                    src="../../iconos/Comentario.svg"
                    alt="Icono comentar"
                  />
                  <router-link
                    :to="`/publicacion/${message.id}`"
                    class="text-green-700 font-semibold hover:underline"
                  >
                    Comentar
                  </router-link>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </section>
    </div>
  </div>
    <div v-else class="flex justify-center items-center min-h-screen">
        <MainLoader/>
      </div>
  
</template>
