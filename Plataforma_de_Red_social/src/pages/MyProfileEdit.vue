<script setup>
import { ref, onMounted, onUnmounted, inject  } from 'vue';
import { useRouter } from 'vue-router';

import MainH1 from '../components/MainH1.vue';
import MainLabel from '../components/MainLabel.vue';
import MainButton from '../components/MainButton.vue';
import MainLoader from '../components/MainLoader.vue';
import Notification from '../components/notification.vue';
import { subscribeToAuthUserChanges, updateCurrentUserProfile } from '../services/auth';

const { profile, editing, fedback, handleSubmit } = useProfileEdit();
const notify = inject('notify');
function useProfileEdit() {
let unsubAuth = () => {};  
  const router = useRouter();

  const profile = ref({
    bio: '',
    display_name: '',
    birthdate: '',
  });

  const editing = ref(false);
  const fedback = ref({
      message: null,
      type: 'success',
  });

  async function handleSubmit() {
    fedback.value.message = null
    try {
      editing.value = true;

      const profileToSend = {
        ...profile.value,
        birthdate: profile.value.birthdate === '' ? null : profile.value.birthdate,
      };
      await updateCurrentUserProfile(profileToSend);
      notify?.({
        
        message:'✅ Tu perfil fue actualizada',
        type: 'success',
      
      });
      
       router.push('/mi-perfil');
    } catch (error) {
        fedback.value= {
        message:'❌ Tu perfil no pudo ser actualizada',
        type: 'error'
      }
      console.error('Ocurrió un error al editar el perfil');
    } finally {
      editing.value = false;
    }
  }

  onMounted(() => {
    unsubAuth = subscribeToAuthUserChanges((newUserState) => {
      profile.value = {
        bio: newUserState.bio,
        display_name: newUserState.display_name,
        birthdate: newUserState.birthdate,
      };
    });
  });

  onUnmounted(() => {
    unsubAuth();
  });

  return {
    profile,
    editing,
    fedback,
    handleSubmit,
  };
}

</script>

<template>
    <MainH1>Editar mi perfil</MainH1>
     <Notification v-if="fedback.message != null" :content="fedback" />

    <form action="#" @submit.prevent="handleSubmit">
        <div class="mb-4">
                    <MainLabel for="display_name" >Nombre de usuario</MainLabel>
                    <input
                        type="text"
                        v-model="profile.display_name"
                        id="display_name"
                        class="w-full p-2 border border-gray-500 rounded" 
                    ></input>
                </div>
               <div class="mb-4">
                    <MainLabel for="bio" >Biografia</MainLabel>
                    <textarea
                        v-model="profile.bio"
                        id="bio"
                        class="w-full p-2 border border-gray-500 rounded" 
                    ></textarea>
                </div>
                
                <div class="mb-4">
  <MainLabel for="birthdate" >Fecha de nacimiento</MainLabel>
  <input
    type="date"
    v-model="profile.birthdate"
    id="birthdate"
    class="w-full p-2 border border-gray-500 rounded"
    
  />
</div>
                <div class="flex items-center space-x-2">
                
                  <MainButton type="submit" button-style="success" >Actualizar mi perfil</MainButton>  
                  <template v-if="editing">
                    <MainLoader/>
                  </template>
                </div>
                
    </form>
</template>