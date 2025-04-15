import fetch from 'node-fetch';

// Mensajes predefinidos
const mssg = {
    noText: '> 𝘗𝘰𝘳 𝘧𝘢𝘷𝘰𝘳, 𝘪𝘯𝘨𝘳𝘦𝘴𝘢 𝘶𝘯 𝘵é𝘳𝘮𝘪𝘯𝘰 𝘱𝘢𝘳𝘢 𝘣𝘶𝘴𝘤𝘢𝘳 𝘦𝘯 𝘛𝘪𝘬𝘛𝘰𝘬. 🥖',
    noResults: '> 𝘕𝘰 𝘴𝘦 𝘦𝘯𝘤𝘰𝘯𝘵𝘳𝘢𝘳𝘰𝘯 𝘳𝘦𝘴𝘶𝘭𝘵𝘢𝘥𝘰𝘴 𝘱𝘢𝘳𝘢 𝘵𝘶 𝘣ú𝘴𝘲𝘶𝘦𝘥𝘢. 𝘐𝘯𝘵𝘦𝘯𝘵𝘢 𝘤𝘰𝘯 𝘰𝘵𝘳𝘰 𝘵é𝘳𝘮𝘪𝘯𝘰. 🥖',
    error: '> 𝘖𝘤𝘶𝘳𝘳𝘪ó 𝘶𝘯 𝘦𝘳𝘳𝘰𝘳 𝘢𝘭 𝘪𝘯𝘵𝘦𝘯𝘵𝘢𝘳 𝘱𝘳𝘰𝘤𝘦𝘴𝘢𝘳 𝘭𝘢 𝘣ú𝘴𝘲𝘶𝘦𝘥𝘢. 🧐',
};

// Función para enviar respuestas rápidas
const reply = (texto, conn, m) => {
    conn.sendMessage(m.chat, { text: texto }, { quoted: m });
};

// Función para buscar en TikTok con la API actualizada
const searchTikTok = async (query) => {
    try {
        const apiUrl = `https://api.siputzx.my.id/api/s/tiktok?query=${encodeURIComponent(query)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log('Respuesta de la API de TikTok:', data); // Depuración para ver los datos

        if (data.status && data.data && data.data.length > 0) {
            return data.data.slice(0, 10); // Retornar los primeros 10 resultados
        }
        return null;
    } catch (error) {
        console.error('Error al buscar en TikTok:', error);
        return null;
    }
};

// Handler principal para los comandos
let handler = async (m, { conn, args, text }) => {
    if (!text) {
        return reply(mssg.noText, conn, m);
    }

    // Mensaje de búsqueda
    reply(`> 𝘉𝘶𝘴𝘤𝘢𝘯𝘥𝘰 𝘦𝘯 𝘵𝘪𝘬𝘵𝘰𝘬: "_${text}_"...\n\n> 𝘗𝘰𝘳 𝘧𝘢𝘷𝘰𝘳, 𝘦𝘴𝘱𝘦𝘳𝘦.🥖`, conn, m);

    // Buscar en TikTok
    const searchResults = await searchTikTok(text);

    if (searchResults) {
        reply(`> 𝘚𝘦 𝘦𝘯𝘤𝘰𝘯𝘵𝘳𝘢𝘳𝘰𝘯: ${searchResults.length} 𝘙𝘦𝘴𝘶𝘭𝘵𝘢𝘥𝘰𝘴. 𝘈𝘲𝘶í 𝘦𝘴𝘵á𝘯 𝘭𝘰𝘴 𝘷𝘪𝘥𝘦𝘰𝘴.🥖`, conn, m);

        // Enviar los primeros 10 videos encontrados
        for (const result of searchResults) {
            const videoUrl = result.play; // URL del video

            try {
                // Enviar el video al usuario
                await conn.sendMessage(m.chat, {
                    video: { url: videoUrl },
                    caption: `Aquí tienes tu video de TikTok.`,
                    fileName: `${result.video_id}.mp4`,
                }, { quoted: m });
            } catch (error) {
                console.error('𝘈𝘲𝘶í 𝘦𝘴𝘵𝘢 𝘵𝘶 𝘷𝘪𝘥𝘦𝘰.🥖', error.message);
            }
        }
    } else {
        return reply(mssg.noResults, conn, m);
    }
};

// Comando para activar la función de búsqueda y descarga de TikTok
handler.command = /^(Tik|tk)$/i;

export default handler;
