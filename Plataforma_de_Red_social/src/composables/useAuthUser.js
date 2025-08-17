import { onMounted, onUnmounted, ref } from "vue";
import { subscribeToAuthUserChanges } from "../services/auth";

export default function useAuthUser(){
    const user = ref({
  id: null,
  email: null,
  bio: null,
  display_name: null,
  birthdate: null,
  photo:null
  
});
 let unsubAuth = () => {};
onMounted(()=>unsubAuth = subscribeToAuthUserChanges(newUserDate=>{
  user.value =newUserDate}));
onUnmounted(()=>unsubAuth())
return{
    user
}
}
