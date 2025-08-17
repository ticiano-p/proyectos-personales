<script setup>
import { nextTick, onMounted, ref, useTemplateRef } from "vue";
import MainLoader from "../components/MainLoader.vue";
import MainH1 from "../components/MainH1.vue";
import MainLabel from "../components/MainLabel.vue";

import {
  savePublicacionesMessage,
  uploadPublicacionImage,
  getPublicacionesLastMassages,
  listenForPublicacionesMessages,
} from "../services/Publicaciones";
import useAuthUser from "../composables/useAuthUser";

const { user } = useAuthUser();
const { newMessage, sendMessage, imageNew, handleFileChange } =
  userPublicacionesform(user);

const { messages, loadingMessage } = userPublicacionesMessages();
const fileInput = ref(null);
const ValidationError = ref(false);
function userPublicacionesMessages() {
  const messages = ref([]);
  const loadingMessage = ref(false);
  const container = useTemplateRef("chatContainer");

  onMounted(async () => {
    try {
      loadingMessage.value = true;
      messages.value = await getPublicacionesLastMassages();
      loadingMessage.value = false;
      await nextTick();
      container.value.scrollTop = container.value.scrollHeight;
      listenForPublicacionesMessages(async (newMessage) => {
        messages.value.push(newMessage);

        await nextTick();
        container.value.scrollTop = container.value.scrollHeight;
      });
    } catch (error) {}
  });
  return {
    messages,
    loadingMessage,
  };
}
function userPublicacionesform(user) {
  const newMessage = ref({ body: "" });
  const imageNew = ref({ file: null, preview: null });
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    imageNew.value.file = file;
    imageNew.value.preview = URL.createObjectURL(file);
  }
  async function sendMessage() {
    let imageUrl = null;
if (!newMessage.value.body.trim()) {
    ValidationError.value = true;
    return; 
  }
  
  ValidationError.value = false;
    if (imageNew.value.file) {
      imageUrl = await uploadPublicacionImage(
        imageNew.value.file,
        user.value.id
      );
    }
    await savePublicacionesMessage({
      sender_id: user.value.id,
      email: user.value.email,
      photo: imageUrl,
      body: newMessage.value.body,
    });
    newMessage.value.body = "";
    imageNew.value = { file: null, preview: null };
    if (fileInput.value) {
      fileInput.value.value = "";
    }
  }
  return {
    newMessage,
    imageNew,
    sendMessage,
    handleFileChange,
  };
}
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}
</script>
<template>
  <MainH1>Publicaciones</MainH1>

  <div class="md:grid grid-cols-3 gap-6 mt-6">
    <section
      ref="chatContainer"
      class="col-span-2 h-[75vh] overflow-y-auto bg-white border border-gray-200 rounded-xl p-6 shadow"
    >
      <h2 class="sr-only">Lista de Publicaciones</h2>

      <div class="flex justify-center items-center min-h-[200px]">
        <MainLoader v-if="loadingMessage" />
        <ol v-else class="space-y-6 w-full">
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
                  class="text-blue-700 font-medium text-lg hover:underline"
                >
                  {{ message.email }}
                </router-link>
              </div>

              <span class="text-2xs text-gray-400">
                {{ formatDate(message.created_at) }}
              </span>
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
                  class="mt-3 rounded-lg border "
                />
              </div>
            </div>

            <div class="flex mt-2">
              <img
                src="../../iconos/Comentario.svg"
                alt="Icono comentar"
              />
              <router-link
                :to="`/publicacion/${message.id}`"
                class="text-green-700 font-semibold text-lg hover:underline"
              >
                Comentar
              </router-link>
            </div>
          </li>
        </ol>
      </div>
    </section>
    <!-- Formulario -->
    <section
      class="bg-white border border-gray-200 rounded-xl shadow p-6 sticky top-6 h-fit"
    >
      <h2 class="text-lg font-semibold text-gray-800 mb-4">
        Subir una Publicación
      </h2>
      <form @submit.prevent="() => sendMessage()" class="space-y-4">
        <div>
          <MainLabel for="body">Mensaje</MainLabel>
          <textarea
            v-model="newMessage.body"
            id="body"
            rows="5"
            class="mt-1 block w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-800 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Escribe tu mensaje aquí..."
            
          ></textarea>
          <p v-if="ValidationError" class="text-red-600 text-sm mt-1">
                El mensaje es obligatorio.
</p>
        </div>
        <div>
          <div>
            <MainLabel for="imageNew">Subir imagen</MainLabel>
            <input
              ref="fileInput"
              type="file"
              id="imageNew"
              @change="handleFileChange"
            />
          </div>

          <img
            v-if="imageNew.preview"
            :src="imageNew.preview"
            alt="Vista previa"
            class="mt-2 rounded-lg border max-h-48"
          />
        </div>

        <div class="text-right">
          <button
            type="submit"
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
