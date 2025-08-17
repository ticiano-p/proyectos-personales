// Importamos las funciones para crear el router.
import { createRouter, createWebHistory } from "vue-router";
import { subscribeToAuthUserChanges } from "../services/auth";

// Importamos los componentes para las rutas.
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Publicaciones from '../pages/Publicaciones.vue';
import MyProfile from "../pages/MyProfile.vue";
import MyProfileEdit from "../pages/MyProfileEdit.vue";
import UserProfile from "../pages/UserProfile.vue";
import PostComent from "../pages/PostComent.vue";
import PrivateChat from "../pages/PrivateChat.vue";
import ProfileEditPhoto from "../pages/ProfileEditPhoto.vue";


// Definimos la lista de rutas.
const routes = [
                                                            //meta sirve para agregar un dato que nos sirva despues
    { path: '/',                       component: Publicaciones, meta:{requireAuth:true,},  },
    { path: '/iniciar-sesion',         component: Login, },                                           
    { path: '/crear-cuenta',           component: Register},

    { path: '/publicaciones',          component: Publicaciones,  meta:{requireAuth:true,}, },
    { path: '/mi-perfil',              component: MyProfile,      meta:{requireAuth:true,}, },
    { path: '/mi-perfil/editar',       component: MyProfileEdit , meta:{requireAuth:true,}, },
    { path: '/usuario/:id',            component: UserProfile,    meta: { requireAuth: true, }, },
    { path: '/usuario/:id/chat',       component: PrivateChat,    meta: { requireAuth: true, }, },

    //Ruta del comentario de publicacion
    { path: '/publicacion/:id',        component: PostComent,     meta: { requireAuth: true, }, },
    
    // editar foto de perfil
    { path: '/mi-perfil/editar/photo', component: ProfileEditPhoto,     meta: { requireAuth: true, }, },

];


const router = createRouter({
    routes,
    history: createWebHistory(),
});

let user= {
        id:null,
        email:null,
}
subscribeToAuthUserChanges(newUserData=> user = newUserData)
router.beforeEach((to , from) => {
    if (to.meta.requireAuth && user.id === null) {
        return '/iniciar-sesion';
    }
});
export default router;