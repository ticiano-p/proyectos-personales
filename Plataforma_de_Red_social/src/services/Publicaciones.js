import supabase from "./supabase";

export async function savePublicacionesMessage(data) {
  const { error } = await supabase.from("global_chat").insert({
    ...data,
  });
  if (error) {
    console.error("Error al grabar el mensaje", error);
    throw error;
  }
}

export async function getPublicacionesLastMassages() {
  const { data, error } = await supabase
    .from("global_chat")
    .select(`*, user_profiles (display_name,photo)`)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error al obtener los mensajes con perfiles", error);
    throw error;
  }

  return data;
}

export async function listenForPublicacionesMessages(callback) {
  const chatChannel = supabase.channel("global_chat");
  chatChannel.on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "global_chat",
    },
    (data) => {
      callback(data.new);
    }
  );
  chatChannel.subscribe();
}

//subir imagen
export async function uploadPublicacionImage(file, userId) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("publicacionphoto")
    .upload(filePath, file);

  if (uploadError) {
    console.error("Error al subir imagen", uploadError);
    throw uploadError;
  }

  const { data: publicUrl } = supabase.storage
    .from("publicacionphoto")
    .getPublicUrl(filePath);

  return publicUrl?.publicUrl || null;
}
export async function deleteImageFromStorage(imageUrl, bucket = "publicacionphoto") {
  if (!imageUrl) return;

  const match = imageUrl.match(/public\/(.+)$/);
  const fullPath = match[1]; 
  
  const path = fullPath.replace(/^publicacionphoto\//, "");
 
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) {
    console.error("❌ Error al eliminar imagen:", error);
    throw error;
  } else {
    console.log("✅ Imagen eliminada correctamente");
  }
  
}


export async function deletePublicacionMessage(messageId) {
  const { error } = await supabase
    .from("global_chat")
    .delete()
    .eq("id", messageId);

  if (error) throw error;

  return true;
}

export async function updatePublicacionMessage(id, data) {
  const { error } = await supabase
    .from("global_chat")
    .update(data)
    .eq("id", id);

  if (error) {
    console.error("Error al actualizar publicación:", error);
    throw error;
  }
}
