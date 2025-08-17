import { onMounted, ref } from "vue";
import { getUserProfileByid } from "../services/user-profiles";

export default function profileUseUser(id) {
    const user = ref({
        id,
        email: null,
        bio: null,
        display_name: null,
        career: null,
    });
    const loading = ref(false);
    onMounted(async () => {
        try {
            loading.value = true;
            user.value = await getUserProfileByid(id);
        } catch (error) {
           console.info(`No se pudo cargare el perfil con el id: ${id}`);
        }
        loading.value = false;
    });

    return {
        user,
        loading,
    }
}