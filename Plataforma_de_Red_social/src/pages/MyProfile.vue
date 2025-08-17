<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { RouterLink } from "vue-router";
import { subscribeToAuthUserChanges } from "../services/auth";
import { getPublicacionesLastMassages } from "../services/user-profiles.js";
import {
  listenForPublicacionesMessages,
  savePublicacionesMessage,
  uploadPublicacionImage,
  deletePublicacionMessage,
  deleteImageFromStorage,
  updatePublicacionMessage,
} from "../services/Publicaciones.js";
import { deleteComentariosDePublicacion } from "../services/coment-chat.js";
import MainLoader from "../components/MainLoader.vue";

const user = ref({
  id: null,
  email: null,
  bio: null,
  display_name: null,
  birthdate: null,
  photo: null,
});

const messages = ref([]);
const loadingMessage = ref(false);
const newMessage = ref({
  body: "",
});
const imageNew = ref({ file: null, preview: null });
const fileInput = ref(null);
const ValidationError = ref(false);

const chatContainer = ref(null);
//manejar img
function handleFileChange(e) {
  const file = e.target.files[0];
  if (!file) return;

  imageNew.value.file = file;
  imageNew.value.preview = URL.createObjectURL(file);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

async function sendMessage() {
  if (!newMessage.value.body.trim()) {
    ValidationError.value = true;
    return; 
  }
  
  ValidationError.value = false;
  try {
    let imageUrl = null;
    if (imageNew.value.file) {
      imageUrl = await uploadPublicacionImage(
        imageNew.value.file,
        user.value.id
      );
    }
    await savePublicacionesMessage({
      sender_id: user.value.id,
      email: user.value.email,
      body: newMessage.value.body,
      photo: imageUrl,
    });
    newMessage.value.body = "";
    imageNew.value = { file: null, preview: null };
    if (fileInput.value) {
      fileInput.value.value = "";
    }
  } catch (error) {
    console.log("No se pudo enviar el mensaje");
  }
}

//elimina
async function handleEliminar(messageId) {
  const confirmacion = confirm(
    "¿Estás seguro de que querés eliminar esta publicación?"
  );
  if (!confirmacion) return;
  try {
    const message = messages.value.find((msg) => msg.id === messageId);

    await deleteComentariosDePublicacion(messageId);
    await deletePublicacionMessage(messageId);

    if (message?.photo) {
      await deleteImageFromStorage(message.photo);
    }
    //elimina de la vista la publicacion
    messages.value = messages.value.filter((msg) => msg.id !== messageId);
  } catch (error) {
    alert("Ocurrió un error al eliminar la publicación.");
  }
}

let unsubAuth = () => {};

onMounted(async () => {
  unsubAuth = subscribeToAuthUserChanges((newUserData) => {
    user.value = newUserData;
  });

  try {
    loadingMessage.value = true;
    const publicaciones = await getPublicacionesLastMassages(user.value.id);
    messages.value = publicaciones.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  } catch (error) {
    console.error("Error al cargar publicaciones");
  } finally {
    loadingMessage.value = false;
  }

  listenForPublicacionesMessages(async (receivedMessage) => {
    messages.value.unshift(receivedMessage);

    await nextTick();
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
});

onUnmounted(() => {
  unsubAuth();
});

//Editar--------------------------------
const isModalOpen = ref(false);
const editingMessage = ref(null);
const editingBody = ref("");
const editingPreview = ref(null);
const editing = ref(false);
// Función para abrir modal con el mensaje seleccionado
function openEditModal(message) {
  editingMessage.value = message;
  editingBody.value = message.body;
  editingPreview.value = message.photo || null;
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  editingMessage.value = null;
  editingBody.value = "";
}

// Función para guardar cambios
async function saveEdit() {
  if (!editingMessage.value) return;
  
  try {
    let updatedPhotoUrl = editingMessage.value.photo;
    editing.value = true;
    if (imageNew.value.file) {
      updatedPhotoUrl = await uploadPublicacionImage(
        imageNew.value.file,
        user.value.id
      );
      // Borrar la anterior
      if (editingMessage.value.photo) {
        await deleteImageFromStorage(editingMessage.value.photo);
      }
    }

    await updatePublicacionMessage(editingMessage.value.id, {
      body: editingBody.value,
      photo: updatedPhotoUrl,
    });

    // Actualizamos la vista para no recargar la pagina
    editingMessage.value.body = editingBody.value;
    editingMessage.value.photo = updatedPhotoUrl;

    closeModal();
  } catch (error) {
    alert("Error al actualizar la publicación.");
    console.error(error);
  }
  editing.value = false;
}
function handleEditFileChange(e) {
  const file = e.target.files[0];
  if (!file) return;
  imageNew.value.file = file;
  editingPreview.value = URL.createObjectURL(file); // vista previa del modal
}

// boton desplegable
const activeDropdown = ref(null);
function toggleDropdown(id) {
  activeDropdown.value = activeDropdown.value === id ? null : id;
}
</script>

<template>
    <main class="mx-auto px-6 py-10 bg-white rounded-xl shadow-md">
    <!-- Encabezado -->
    <header class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Mi Perfil</h1>
      <RouterLink
        to="/mi-perfil/editar"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
        >Editar Perfil</RouterLink
      >
    </header>
    <section>
      <div class="flex flex-col md:flex-row items-center gap-6">
        <img
          :src="
            user?.photo
              ? `https://tybeupyqjiqftdreziad.supabase.co/storage/v1/object/public/profilephoto/${user.photo}`
              : `https://ui-avatars.com/api/?name=${
                  user.display_name || 'User'
                }`
          "
          alt="Foto de perfil"
          class="w-32 h-32 rounded-full border-2 border-blue-600 shadow-md"
        />
        <!-- Datos principales -->
        <div class="text-center md:text-left">
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
        </div>
      </div>
      <RouterLink
        to="/mi-perfil/editar/photo"
        class="mt-4 inline-block bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow"
      >
        Editar Avatar
      </RouterLink>
    </section>
    <!-- Biografía -->
    <section class="mb-8">
      <h3 class="text-lg font-medium text-gray-700 my-2">Biografía</h3>
      <p
        class="text-gray-600 bg-gray-50 p-4 rounded-md border border-gray-200 italic"
      >
        {{ user.bio || "Aca va mi biografia..." }}
      </p>
    </section>
    <!-- Formulario para Subir una Publicacion -->
    <section
      class="w-full bg-gray-50 p-6 border border-gray-300 rounded-lg shadow-sm"
    >
      <h2 class="text-xl font-semibold mb-4 text-gray-800">
        Subir una Publicacion
      </h2>
      <form @submit.prevent="() => sendMessage()" class="space-y-4">
        <div class="flex items-center gap-4">
          <div class="flex-grow">
            <div>
              <textarea
                v-model="newMessage.body"
                id="body"
                rows="2"
                class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-800"
                placeholder="Escribe tu mensaje aquí..."
                
              ></textarea>
              <p v-if="ValidationError" class="text-red-600 text-sm mt-1">
                El mensaje es obligatorio.
</p>
            </div>
            <div>
              <div class="my-3">
                <label
                  for="imageNew"
                  class="block text-sm font-medium text-gray-700"
                  >Subir imagen</label
                >
                <input
                  ref="fileInput"
                  type="file"
                  id="imageNew"
                  @change="handleFileChange"
                />
              </div>
              <div class="flex justify-center">
                <img
                  v-if="imageNew.preview"
                  :src="imageNew.preview"
                  alt="Vista previa"
                  class="mt-2 rounded-lg border max-h-100"
                />
              </div>
            </div>
          </div>
          <div class="flex-shrink-0">
            <button
              type="submit"
              
              :class="[
                'font-semibold py-2 px-4 rounded-md transition-all whitespace-nowrap',
                newMessage.body.trim()
                  ? 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed',
              ]"
            >
              Enviar
            </button>
          </div>
        </div>
      </form>
    </section>

    <!-- Publicaciones -->
    <section>
      <div
        ref="chatContainer"
        class="flex-1 p-4 my-8 bg-gray-50 border border-gray-300 rounded-lg shadow-sm"
       >
        <h2 class="text-xl font-semibold text-gray-700 my-2">Publicaciones</h2>
        <div v-if="loadingMessage" class="flex justify-center items-center">
              <MainLoader />
         </div>
         <div v-else>
          <div v-if="messages.length === 0" class="flex flex-col items-center justify-center bg-white border border-gray-300 rounded-xl shadow p-6 my-3 text-center">
        <p class="text-xl text-gray-600 font-medium">Aún no hay publicaciones</p>
      </div>
          <div v-else>
          <h2 class="sr-only">Lista de Publicaciones</h2>
        <!-- Lista de mensajes -->
         
         <ol class="flex flex-col gap-6">
          <li
            v-for="message in messages"
            :key="message.id"
            class="relative bg-white p-4 rounded-lg shadow border border-gray-200"
          >
            <!-- Info del autor -->
            <div class="flex justify-between items-start">
              <div>
                <router-link
                  :to="`/usuario/${message.sender_id}`"
                  class="text-blue-600 font-semibold text-lg hover:underline"
                >
                  {{ message.email }}
                </router-link>
              </div>

              <!-- Botón desplegable  -->
              <div class="relative">
                <button
                  class="text-gray-600 hover:text-gray-900 px-2"
                  @click="toggleDropdown(message.id)"
                >
                  ⁝
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

                  <div
                    class="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded"
                  >
                    <img
                      src="../../public/iconos/editar.svg"
                      alt="Icono de eliminar"
                      class="max-h-4 w-auto"
                    />
                    <button
                      @click="
                        () => {
                          openEditModal(message);
                          toggleDropdown(null);
                        }
                      "
                      class="text-left text-blue-600"
                    >
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <p class="text-gray-700 whitespace-pre-wrap">
                {{ message.body }}
              </p>
              <hr class="text-gray-300" />
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
         </div>
       
      </div>
    </section>
  </main>

  <!-- Modal para editar -->
  <section
    v-if="isModalOpen"
    class="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
  >
    <div class="bg-white rounded-lg p-6 w-11/12 max-w-lg shadow-lg">
      <h3 class="text-lg font-semibold mb-4">Editar Publicación</h3>
      <form action="">
        <textarea
          v-model="editingBody"
          rows="6"
          class="w-full border border-gray-300 rounded p-2 resize-y"
        ></textarea>

        <div class="my-3">
          <label for="imageNew" class="block text-sm font-medium text-gray-700"
            >Subir imagen</label
          >
          <input
            ref="fileInput"
            type="file"
            id="imageEdit"
            @change="handleEditFileChange"
          />
        </div>
        <div class="flex justify-center">
          <img
            v-if="editingPreview"
            :src="editingPreview"
            alt="Vista previa"
            class="mt-2 rounded-lg border max-h-40"
          />
        </div>
      </form>

      <div class="mt-4 flex justify-end gap-4">
        <button
          @click="closeModal"
          class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>

        <div class="flex items-center space-x-2">
                <button @click="saveEdit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                 Guardar
                </button>
                  <template v-if="editing">
                    <MainLoader/>
                  </template>
                </div>
      </div>
    </div>
  </section>
  
</template>
