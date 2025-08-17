import { uploadFile } from "./storage.js";
import supabase from "./supabase";
import {
  creatUserProfile,
  getUserProfileByid,
  updateUserProfile,
} from "./user-profiles.js";

let user = {
  id: null,
  email: null,
  bio: null,
  display_name: null,
  birthdate: null,
  photo: null,
};
let observer = [];
//cargamos los datos iniciales del usuarioautenticado
getCurrentAuthUser();
//Lemos los datos del LocalStorag si existe
if (localStorage.getItem("user")) {
  user = JSON.parse(localStorage.getItem("user"));
}
async function getCurrentAuthUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error(
      "[auth.js getCurrentAuthUser] Error al obtener el usuario autenticado:",
      error
    );
    throw error;
  }
  updateUser({
    id: data.user.id,
    email: data.user.email,
  });

  fetchCurrentUserExtendedProfile();

  return data.user;
}
// carga los datos del perfil del usuario

async function fetchCurrentUserExtendedProfile() {
  try {
    const profile = await getUserProfileByid(user.id);
    updateUser({
      bio: profile.bio,
      display_name: profile.display_name,
      birthdate: profile.birthdate,
      photo: profile.photo,
    });
  } catch (error) {
    console.log("No se pudo Cargar los datos del usuario");
  }
}
/**
 *
 * @param {string} email
 * @param {string} password
 * @returns
 */
export async function register(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    console.error("[auth.js register] Error al registrar el usuario", error);
    throw error;
  }
  try {
    await creatUserProfile({
      id: data.user.id,
      email: data.user.email,
    });
  } catch (error) {}
  //actualizamos la data del usuario
  updateUser({
    id: data.user.id,
    email: data.user.email,
  });

  return data.user;
}
/**
 *
 * @param {string} email
 * @param {string} password
 * @returns
 */
export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error("[auth.js login] Error al iniciar sesion", error);
    throw error;
  }

  updateUser({
    id: data.user.id,
    email: data.user.email,
  });

  //cargamos el resto del perfil.
  fetchCurrentUserExtendedProfile();
  return data.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(
      "[auth.js getCurrentAuthUser] Error al cerrar sesion:",
      error
    );
    throw error;
  }
  //actualizamos la data del usuario y notifico
  updateUser({
    id: null,
    email: null,
    bio: null,
    display_name: null,
    birthdate: null,
  });
}
/**
 *
 * @param {Object} data
 */
export async function updateCurrentUserProfile(data) {
  try {
    await updateUserProfile(user.id, data);
  } catch (error) {
    throw error;
  }

  updateUser({ ...data });
}
/**
 *
 * @param {File} file
 */
export async function updateCurrentUserEditPhoto(file) {
  try {
    const photoName = `${user.id}/${crypto.randomUUID()}.jpg`;
    await uploadFile(photoName, file);

    await updateCurrentUserProfile({ photo: photoName });
  } catch (error) {
    console.error("fallo el guardado de la imagen");
  }
}


//-- OBSERVER-----------------------------------------------------

export function subscribeToAuthUserChanges(callback) {
  // guardamos el callback
  observer.push(callback);

  notify(callback);

  return () => {
    observer = observer.filter((obserber) => obserber != callback);
  };
}
// ejecuta el callback y le pasa una copia a los usuarios
function notify(callback) {
  callback({ ...user });
}
// notifica a los observer
function notifyAll() {
  observer.forEach((callback) => notify(callback));
}

/**
 *
 * @param {{id?: string|null, email?:string|null, display_name?:string|null, bio?:string|null, birthdate?:string|null}} data
 */
function updateUser(data) {
  user = {
    ...user,
    ...data,
  };
  notifyAll();

  if (user.id) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
}
