import supabase from "./supabase";

export async function creatUserProfile(data) {
  const { error } = await supabase.from("user_profiles").insert(data);

  if (error) {
    console.error(
      "[user-profiles.js createUserProfile] Error al crear el perfil del usuario: ",
      error
    );
    throw error;
  }
}
/**
 *  @param {string} id
 * @param {{id?: string|null, display_name?:string|null, bio?:string|null, birthdate?:string|null}} data
 */
export async function updateUserProfile(id, data) {
  const { error } = await supabase
    .from("user_profiles")
    .update(data)
    .eq("id", id);

  if (error) {
    console.error(
      "[user-profiles.js updateUserProfile] Error al actualizar el perfil del usuario: ",
      error
    );
    throw error;
  }
}
/**
 *  @param {string} id
 */
export async function getUserProfileByid(id) {
  const { data, error } = await supabase
    .from("user_profiles")
    .select()
    // ⬇ permite agregar una clausla al WHERE de igualdad
    .eq("id", id);
  if (error) {
    console.error(
      "[user_profiles.js getUserProfileByid] Error al obtener el perfil del usuario:",
      error
    );
    throw error;
  }
  // ⬇ el metodo select retorna siempre un array
  return data[0];
}

/**
 *
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
export async function getPerfilLastMassages(id) {
  const { data, error } = await supabase
    .from("global_chat")
    .select("*")
    // ⬇ permite agregar una clausla al WHERE de igualdad
    .eq("sender_id", id);
  if (error) {
    console.error(
      "[user_profiles.js getUserProfileByid] Error al obtener el perfil del usuario:",
      error
    );
    throw error;
  }
  // ⬇ el metodo select retorna siempre un array
  return data[0];
}

/** @return {Promise<{id:number, email:string, body: string, create_at: string}[]} */
export async function getPublicacionesLastMassages(id) {
  const { data, error } = await supabase
    .from("global_chat")
    .select(
      `
      *,
      user_profiles (
        display_name,
        photo
      )
    `
    )
    // ⬇ permite agregar una clausla al WHERE de igualdad
    .eq("sender_id", id);
  if (error) {
    console.error(
      "[global-CharacterData.js saveGlobalChatMessage] Error al obtener los ultimos mensaje",
      error
    );
    throw error;
  }
  return data;
}
