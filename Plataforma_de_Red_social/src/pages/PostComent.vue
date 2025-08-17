<script setup>
import { onMounted, onUnmounted, ref, nextTick } from "vue";
import { useRoute } from "vue-router";
import MainH1 from "../components/MainH1.vue";
import MainLoader from "../components/MainLoader.vue";
import {
  getComentMassages,
  listenForComentMessages,
  saveComentMassages,
  deleteComentarioIndividual,
} from "../services/coment-chat";
import { subscribeToAuthUserChanges } from "../services/auth";

const route = useRoute();

const user = ref({
  id: null,
  email: null,
  bio: null,
  display_name: null,
  birthdate: null,
});

const messages = ref([]);
const loadingMessage = ref(false);
const newMessage = ref({ body: "" });
const comentContainer = ref(null);

function formatDate(date) {
  return new Date(date).toISOString().split("T")[0];
}

async function sendMessage() {
  const messageId = parseInt(route.params.id);
  if (isNaN(messageId)) {
    console.warn("ID inválido al enviar comentario");
    return;
  }

  await saveComentMassages({
    message_id: messageId,
    sender_id: user.value.id,
    email: user.value.email,
    body: newMessage.value.body,
  });

  newMessage.value.body = "";
}

async function handleEliminar(comentarioId) {
  const confirmacion = confirm(
    "¿Estás seguro de que querés eliminar esta publicación?"
  );
  if (!confirmacion) return;
  try {
    await deleteComentarioIndividual(comentarioId);
    //elimina de la vista del comentario
    messages.value = messages.value.filter((msg) => msg.id !== comentarioId);
  } catch (error) {
    alert("Ocurrió un error al eliminar la publicación.");
    console.error(error);
  }
}

// Subscripción al auth
let unsubAuth = () => {};
onMounted(async () => {
  unsubAuth = subscribeToAuthUserChanges((newUserState) => {
    user.value = newUserState;
  });

  listenForComentMessages(async (receivedComent) => {
    messages.value.push(receivedComent);
    await nextTick();
    comentContainer.value.scrollTop = comentContainer.value.scrollHeight;
  });

  try {
    const id = parseInt(route.params.id);
    loadingMessage.value = true;

    if (!isNaN(id)) {
      messages.value = await getComentMassages([id]);
    } else {
      console.warn("ID inválido en la URL:", route.params.id);
    }

    loadingMessage.value = false;

    await nextTick();
    comentContainer.value.scrollTop = comentContainer.value.scrollHeight;
  } catch (error) {
    console.error("Error al cargar los comentarios", error);
  }
});

onUnmounted(() => {
  unsubAuth();
});

// boton desplegable
const activeDropdown = ref(null);
function toggleDropdown(id) {
  activeDropdown.value = activeDropdown.value === id ? null : id;
}
</script>

<template>
  <router-link
    :to="`/publicaciones`"
    class="font-bold text-xl text-gray-400 hover:underline"
  >
    ⬅ Volver ha publicaciones
  </router-link>
  <hr class="my-2" />
  <MainH1>Comentarios:</MainH1>
  <div class="md:grid grid-cols-3 gap-6 mt-6">
    <!-- Contenedor de comentarios -->
    <section
      ref="comentContainer"
      class="col-span-2 h-[75vh] overflow-y-auto bg-white border border-gray-200 rounded-xl p-6 shadow"
    >
      <h2 class="sr-only">Lista de Comentarios</h2>
       <div v-if="loadingMessage" class="flex justify-center items-center">
        <MainLoader />
       </div>
      

      <ol v-else-if="messages.length > 0" class="space-y-6 w-full">
        <li
          v-for="message in messages"
          :key="message.id"
          class="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow transition-shadow"
        >
          <div class="flex justify-between items-center mb-2">
            <div class="flex items-center">
              <img
                alt="Foto de perfil"
                class="w-8 h-8 rounded-full border-2 border-blue-600 shadow-md me-3"
                :src="
                  message.user_profiles?.photo
                    ? `https://tybeupyqjiqftdreziad.supabase.co/storage/v1/object/public/profilephoto/${message.user_profiles.photo}`
                    : `https://ui-avatars.com/api/?name=${message.email}`
                "
              />
              <router-link
                :to="`/usuario/${message.sender_id}`"
                class="text-blue-700 font-medium hover:underline"
              >
                {{ message.email }}
              </router-link>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-400">
                {{ formatDate(message.created_at) }}
              </span>
              <div v-if="message.sender_id === user.id" class="relative">
                <button
                  class="text-gray-600 hover:text-gray-900 px-2"
                  @click="toggleDropdown(message.id)"
                >
                  ⋮
                </button>
                <div
                  v-if="activeDropdown === message.id"
                  class="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow-lg z-10"
                >
                  <div
                    class="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded"
                  >
                    <img
                      src="../../public/iconos/eliminar.svg"
                      alt="Icono de eliminar"
                      class="max-h-4 w-auto"
                    />
                    <button
                      @click="handleEliminar(message.id)"
                      class="text-left text-red-600 font-medium"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p class="text-gray-700 whitespace-pre-wrap">{{ message.body }}</p>
        </li>
      </ol>

      <div
        v-else
        class="flex justify-center items-center text-center bg-gray-50 border border-dashed border-gray-300 rounded-xl p-6 h-full"
      >
        <p class="text-gray-600 text-base">
          No hay comentarios aún.
          <span class="text-blue-600 font-semibold"
            >¡Sé el primero en comentar!</span
          >
        </p>
      </div>
    </section>

    <!-- Formulario -->
    <section
      class="bg-white border border-gray-200 rounded-xl shadow p-6 sticky top-6 h-fit"
    >
      <h2 class="text-lg font-semibold text-gray-800 mb-4">
        Comentar publicación
      </h2>
      <form @submit.prevent="sendMessage" class="space-y-4">
        <div>
          <label for="body" class="block text-sm font-medium text-gray-600"
            >Mensaje</label
          >
          <textarea
            v-model="newMessage.body"
            id="body"
            rows="5"
            class="mt-1 block w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-800 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Escribe tu comentario aquí..."
            required
          ></textarea>
        </div>

        <div class="text-right">
          <button
            type="submit"
            :disabled="!newMessage.body.trim()"
            :class="[
              'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition',
              newMessage.body.trim()
                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed',
            ]"
          >
            Enviar
          </button>
        </div>
      </form>
    </section>
  </div>
</template>
