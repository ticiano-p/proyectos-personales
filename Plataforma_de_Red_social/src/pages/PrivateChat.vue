<script setup>
import MainH1 from "../components/MainH1.vue";
import MainLoader from "../components/MainLoader.vue";
import MainLabel from "../components/MainLabel.vue";
import { useRoute } from "vue-router";

import {
  getPrivateChatLastMessages,
  listenForPrivateChatMessage,
  savePrivateChatMessage,
} from "../services/private-chat";
import { nextTick, ref, useTemplateRef, onMounted } from "vue";
import useAuthUser from "../composables/useAuthUser";
import profileUseUser from "../composables/profileUseUser";
const route = useRoute();
const { user: userAuth } = useAuthUser();
const { user: userChat, loadingUser } = profileUseUser(route.params.id);
const { newMessage, sendMessage } = usePrivateChatForm(userAuth, userChat);
const { messages, loadingMessages } = usePrivateChatMessages(
  userAuth,
  route.params.id
);
function usePrivateChatMessages(userAuth, userChat) {
  const messages = ref([]);
  const loadingMessages = ref(false);
  const container = useTemplateRef("chatContainer");

  onMounted(async () => {
    try {
      loadingMessages.value = true;
      messages.value = await getPrivateChatLastMessages(
        userAuth.value.id,
        userChat
      );
      loadingMessages.value = false;

      await nextTick();
      container.value.scrollTop = container.value.scrollHeight;

      listenForPrivateChatMessage(
        userAuth.value.id,
        userChat,
        async (newMessage) => {
          messages.value.push(newMessage);

          await nextTick();
          container.value.scrollTop = container.value.scrollHeight;
        }
      );
    } catch (error) {}
    loadingMessages.value = false;
  });

  return {
    messages,
    loadingMessages,
  };
}

function usePrivateChatForm(userAuth, userChat) {
  const newMessage = ref({
    body: "",
  });

  async function sendMessage() {
    try {
      await savePrivateChatMessage(
        userAuth.value.id,
        userChat.value.id,

        newMessage.value.body
      );
      newMessage.value.body = "";
    } catch (error) {
      console.error("no funciono el guardado del mensaje del chat privado");
      console.error(error);
    }
  }

  return {
    newMessage,
    sendMessage,
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
  <template v-if="!loadingUser">
    <MainH1>Conversación privada con: {{ userChat.email }}</MainH1>

    <div
      ref="chatContainer"
      class="overflow-y-auto h-100 p-4 mb-4 border border-gray-400 rounded"
    >
      <h2 class="sr-only">Lista de mensajes</h2>
      <ol v-if="!loadingMessages" class="flex flex-col gap-4">
        <li
          v-if="messages.length === 0"
          class=" text-center bg-gray-50 border border-dashed border-gray-300 rounded-xl p-6">
          <p class="text-gray-600 ">
            No hay mensajes aún.
          </p>
        </li>
        <li
          v-else
          v-for="message in messages"
          class="flex flex-col gap-0.5 rounded max-w-3/4 p-4"
          :class="{
            'self-end bg-green-200': message.sender_id == userAuth.id,
            'self-start bg-gray-200': message.sender_id != userAuth.id,
          }"
        >
          <div>{{ message.body }}</div>
          <div class="text-sm text-gray-600">
            {{ formatDate(message.created_at) }}
          </div>
        </li>
      </ol>
      <div v-else class="flex justify-center items-center">
        <MainLoader/>
      </div>
      
    </div>
    <h2 class="sr-only">Enviar un mensaje</h2>
    <form @submit.prevent="() => sendMessage()" class="flex items-strech gap-4">
      <div class="w-full">
        <MainLabel for="body" class="sr-only">Mensaje</MainLabel>
        <textarea
          v-model="newMessage.body"
          id="body"
          class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-800 h-full"
          placeholder="Escribe tu mensaje aquí..."
          required
        ></textarea>
      </div>
      <div class="text-right">
        <button
          type="submit"
          :disabled="!newMessage.body.trim()"
          :class="[
            'font-semibold py-2 px-4 rounded-md transition-all',
            newMessage.body.trim()
              ? 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed',
          ]"
        >
          Enviar
        </button>
      </div>
    </form>
  </template>
  <MainLoader v-else />
</template>
