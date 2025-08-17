<script setup>
import { onUnmounted, ref, computed, inject } from "vue";
import MainH1 from "../components/MainH1.vue";
import MainButton from "../components/MainButton.vue";
import MainLoader from "../components/MainLoader.vue";
import { deleteFile } from "../services/storage.js";
import useAuthUser from "../composables/useAuthUser.js";
const { user } = useAuthUser();

import { useRouter } from "vue-router";
const router = useRouter();
import { updateCurrentUserEditPhoto } from "../services/auth";
const notify = inject("notify");
const photoURL = computed(() => {
  return user.value.photo
    ? `https://tybeupyqjiqftdreziad.supabase.co/storage/v1/object/public/profilephoto/${user.value.photo}`
    : `https://ui-avatars.com/api/?name=${user.value.display_name || "User"}`;
});
function ProfileEditPhoto() {
  const EditPhoto = ref({
    file: null,
    preview: null,
  });

  const editing = ref(false);

  const fedback = ref({
    message: null,
    type: "success",
  });
  async function handleSubmit() {
    fedback.value.message = null;
    try {
      editing.value = true;
      await updateCurrentUserEditPhoto(EditPhoto.value.file);
      notify?.({
        message: "✅ Tu Foto a sido actualizada",
        type: "success",
      });
      router.push("/mi-perfil");
    } catch (error) {
      console.error("");
    }
    editing.value = false;
  }
  async function handleFileC(event) {
    const selectedfile = event.target.files[0];
    if (EditPhoto.value.preview) URL.revokeObjectURL(EditPhoto.value.preview);
    if (!selectedfile) {
      EditPhoto.value = {
        file: null,
        preview: null,
      };
      return;
    }
    if (user.value.photo) {
  try {
    await deleteFile(user.value.photo); // ✅ nombre del archivo, no la URL completa
    console.log(user.value.photo);
    
  } catch (error) {
    console.error("Error al eliminar imagen anterior", error);
  }
}

    EditPhoto.value.file = selectedfile;
    EditPhoto.value.preview = URL.createObjectURL(EditPhoto.value.file);
  }
  onUnmounted(() =>
    EditPhoto.value.preview
      ? URL.revokeObjectURL(EditPhoto.value.preview)
      : null
  );
  return {
    EditPhoto,
    editing,
    handleFileC,
    handleSubmit,
  };
}

const { EditPhoto, editing, handleFileC, handleSubmit } = ProfileEditPhoto();
</script>

<template>
  <MainH1 class="text-2xl font-bold mb-6 text-center"
    >Editar mi imagen de perfil</MainH1
  >

  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto"
  >
    <!-- Lado izquierdo -->
    <div class="w-full md:w-1/2 space-y-4">
      <div>
        <label for="avatar" class="block text-sm font-medium text-gray-700 mb-1"
          >Nueva imagen</label
        >
        <input
          type="file"
          id="avatar"
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          @change="handleFileC"
        />
      </div>

      <div class="flex items-center gap-4">
        <MainButton>Actualizar Imagen</MainButton>
        <template v-if="editing">
          <MainLoader />
        </template>
      </div>
    </div>

    <!-- Lado derecho (imagen) -->
    <div class="w-full md:w-1/2 flex justify-center items-center">
      <img
        :src="EditPhoto.preview || photoURL"
        alt="Imagen de perfil"
        class="w-32 h-32 rounded-full border border-gray-300 shadow"
      />
    </div>
  </form>
</template>
