<script setup>
import MainH1 from "../components/MainH1.vue";
import { register } from "../services/auth";
import MainLabel from "../components/MainLabel.vue";
import MainButton from "../components/MainButton.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Notification from "../components/notification.vue";

const { user, errors, fedback, loading, handleSubmit } = formUserRegister();

function formUserRegister() {
  const router = useRouter();
  const user = ref({
    email: "",
    password: "",
  });
  const errors = ref({
    email: "",
    password: "",
  });

  const fedback = ref({
    message: null,
    type: "success",
  });
  const loading = ref(false);
  function validateForm() {
    let isValid = true;
    errors.value = { email: "", password: "" };

    if (!user.value.email) {
      errors.value.email = "El correo es obligatorio";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.value.email)) {
      errors.value.email = "El correo no tiene un formato válido";
      isValid = false;
    }

    if (!user.value.password) {
      errors.value.password = "La contraseña es obligatoria";
      isValid = false;
    }

    return isValid;
  }
  async function handleSubmit() {
    if (!validateForm()) return;
    try {
      loading.value = true;
      await register(user.value.email, user.value.password);
      router.push("/mi-perfil");
    } catch (error) {
      fedback.value = {
        message: "❌ Usuario no permitido",
        type: "error",
      };
    } finally {
      loading.value = false;
    }
  }

  return {
    user,
    errors,
    fedback,
    loading,
    handleSubmit,
  };
}
</script>

<template>
  <MainH1 class="max-w-md mx-auto text-center text-3xl font-bold mb-8">
    Crear una cuenta
  </MainH1>

  <form
    action="#"
    @submit.prevent="handleSubmit"
    class="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md space-y-6"
  >
    <Notification v-if="fedback.message != null" :content="fedback" />
    <div>
      <MainLabel for="email">Email</MainLabel>
      <input
        v-model="user.email"
        type="email"
        id="email"
        placeholder="ejemplo@correo.com"
        class="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <p v-if="errors.email" class="text-red-500 text-sm mt-1">
        {{ errors.email }}
      </p>
    </div>

    <div>
      <MainLabel for="password">Contraseña</MainLabel>
      <input
        v-model="user.password"
        type="password"
        id="password"
        placeholder="••••••••"
        class="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <p v-if="errors.password" class="text-red-500 text-sm mt-1">
        {{ errors.password }}
      </p>
    </div>

    <MainButton type="submit" class="w-full" :disabled="loading">
      {{ loading ? "Creando cuenta..." : "Crear Cuenta" }}
    </MainButton>
  </form>
</template>
