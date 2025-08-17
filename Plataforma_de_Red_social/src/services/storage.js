import supabase from "./supabase";

/**
 * @param {string} name
 * @param {File|Blob} file
 * @param {string} bucket
 */
export async function uploadFile(name, file, bucket = "profilephoto") {
  const { error } = await supabase.storage.from(bucket).upload(name, file);
  if (error) {
    console.error("Error al subir la imagen de perfil", error);
    throw error;
  }
}
/**
 *
 * @param {string} filname
 * @param {string} bucket
 * @returns {string}
 */
export function getUrl(filname, bucket = "profilephoto") {
  const { data } = supabase.storage.from(bucket).getPublicUrl(filname);
  return data.publicUrl;
}

/**
 * @param {string} filename 
 * @param {string} bucket 
 */
export async function deleteFile(filename, bucket = "profilephoto") {
  const { error } = await supabase.storage.from(bucket).remove([filename]);
  if (error) {
    console.error("Error al eliminar la imagen", error);
    throw error;
  }
}




