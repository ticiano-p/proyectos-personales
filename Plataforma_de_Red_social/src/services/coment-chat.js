import supabase from "./supabase";

/**
 * 
 * @param {email:string,body:string,message_id,sender_id} data 
 */
export async function saveComentMassages(data) {
    
    try {
        const {error}= await supabase
         // llamamos a la tabla a interactuar
    .from('global_chat_comments')
      //concatenamos la accion
    .insert({
        ...data
    });
    } catch (error) {
        console.error('[coment-chat.js saveComentMassages] Error al grabar el comentario', error);
        throw error;
    }
    
}
export async function listenForComentMessages(callback) {
  const comentChatChannel= supabase.channel('global_chat_comments')
    try {
    comentChatChannel.on(
        'postgres_changes',
        {   // pasamos el evento a realizar
            event: 'INSERT',
            schema:'public',
            table:'global_chat_comments'
        },
        data=>{
            console.log('la data recibido es: ', data);
            callback(data.new) 
        }
    );
   comentChatChannel.subscribe()
  } catch (error) {
    console.error('[coment-chat.js listenForComentMessages] ocurrio un error', error);
    
  }
}

/**
 * 
 * @return {Promise<{id, message_id, sender_id, email, body}[]>}  
 */
export async function getComentMassages(messageIds) {
    try {
        let query = supabase
            .from('global_chat_comments')
            .select(`*, user_profiles (display_name,photo)`)
            .in('message_id', messageIds);
        
        const { data, error } = await query;
        if (error) throw error;

        return data;
    } catch (error) {
         console.error('[coment-chat.js getComentMassages] Error al obtener los comentarios', error);
        throw error;
    } 
   
}
// borra TODOS los comentarios de una publicacion
/**
 * 
 * @param {number} messageId 
 */
export async function deleteComentariosDePublicacion(messageId) {
  const { error } = await supabase
    .from('global_chat_comments')
    .delete()
    .eq('message_id', messageId);

  if (error) throw error;
}
// borra UN comentario de una publicacion
/**
 * 
 * @param {number} comentarioId 
 */
export async function deleteComentarioIndividual(comentarioId) {
  const { error } = await supabase
    .from('global_chat_comments')
    .delete()
    .eq('id', comentarioId);

  if (error) throw error;
}

