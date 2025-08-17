import supabase from "./supabase";

// g en un cahe local los ids
let privateChatIdsCahe = {};
if (localStorage.getItem('private-chat-ids')) {
    privateChatIdsCahe = JSON.parse(localStorage.getItem('private-chat-ids'));
}

/**
 * 
 * @param {string} sender_id 
 * @param {string} received_id 
 * @returns {Promise<number/null>} 
 */
async function fetchPrivateChat(sender_id, received_id) {
    // ordena para que queden en el mismo orden
    const userIds= [sender_id, received_id].sort();
     const {data, error}= await supabase
    .from('private_chats')
    .select('id')
    .eq('user_id1', userIds[0])
    .eq('user_id2', userIds[1])

    if (error) {
        console.error('[private-chat.js savePrivateChatMessage] Error al traer el chat privado', error);
        throw error;
     }
     // usamos el ? para que debuelva number o null
     return data[0]?.id;
}

/**
 * 
 * @param {string} sender_id 
 * @param {string} received_id 
 * @returns {Promise<number>} 
 */
async function createPrivateChat(sender_id, received_id) {
    // ordena para que queden siempre en el mismo orden
    const userIds= [sender_id, received_id].sort();
     const {data, error}= await supabase
    .from('private_chats')
    .insert({
        user_id1: userIds[0],
        user_id2: userIds[1]
    })
    .select();
    if (error) {
        console.error('[private-chat.js savePrivateChatMessage] Error al crear el chat privado', error);
        throw error;
     }
     return data[0].id;
}

/**
 * 
 * @param {string} sender_id 
 * @param {string} received_id 
 * @returns {Promise<number>}
 */
 async function getPriveteChatid(sender_id, received_id){
    // si lo tenemos lo retornamos
    const caheKey = [sender_id, received_id].sort().join('_');
    if(privateChatIdsCahe[caheKey]){
         return privateChatIdsCahe[caheKey];
    }
    let chat_id = await fetchPrivateChat(sender_id, received_id)
    if (!chat_id) {
        chat_id= await createPrivateChat(sender_id, received_id);
    }
    privateChatIdsCahe[caheKey] = chat_id;
    localStorage.setItem('private-chat-ids', JSON.stringify(privateChatIdsCahe))
    return chat_id;
   
 }
/**
 * 
 * @param {string} sender_id 
 * @param {string} received_id 
 * @param {string} body 
 */
export async function savePrivateChatMessage(sender_id, received_id, body) {
    const chat_id = await getPriveteChatid(sender_id, received_id);

    const {error}= await supabase
    .from('private_messages')
    .insert({
        chat_id,
        sender_id,
        body,
    })
    if (error) {
        console.error('[private-chat.js savePrivateChatMessage] Error al crear el mensaje privado', error);
        throw error;
     }
}

/**
 * 
 * @param {string} sender_id 
 * @param {string} received_id 
 * @param {{}=> void} callback 
 */
export async function listenForPrivateChatMessage(sender_id, received_id, callback) 
{
    const chat_id= await getPriveteChatid(sender_id, received_id);
    const privateChatChanel = supabase.channel('private_chat');
   privateChatChanel.on(
    'postgres_changes',
    {
        event: 'INSERT',
        schema:'public',
        table: 'private_messages',
        filter: 'chat_id=eq.' + chat_id,

    },
    data=> {
        console.log('[private_chat.js listenForPrivateChatMessage] El evento recibido es:', data);
        callback(data.new);
    }
   );
   privateChatChanel.subscribe()
}

/**
 * 
 * @param {string} sender_id 
 * @param {string} received_id 
 * @returns {Promise<{}[]>}
 */
export async function getPrivateChatLastMessages(sender_id, received_id){
    const chat_id = await getPriveteChatid(sender_id, received_id)
     const {data, error}= await supabase
     .from('private_messages')
     .select(`*, user_profiles (display_name,photo)`)
     .eq('chat_id', chat_id)
if (error) {
        console.error('[private-chat.js getPrivateChatLastMessages] Error al traer los mensaje privado', error);
        throw error;
     }
   return data;
}