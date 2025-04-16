import { sticker } from '../lib/sticker.js';
import axios from 'axios';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchSticker = async (text, attempt = 1) => {
    try {
        const response = await axios.get(`https://kepolu-brat.hf.space/brat`, {
            params: { q: text },
            responseType: 'arraybuffer',
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 429 && attempt <= 3) {
            const retryAfter = error.response.headers['retry-after'] || 5;
            await delay(retryAfter * 1000);
            return fetchSticker(text, attempt + 1);
        }
        throw error;
    }
};

// Definimos los emojis para el mensaje
const emoji = '✨';  // Emoji para indicar que falta texto
const msm = '❌';    // Emoji para mostrar un error

let handler = async (m, { conn, text }) => {
    // Si no hay texto, pedimos que ingrese uno
    if (!text || text.trim().length === 0) {
        return conn.sendMessage(m.chat, {
            text: `> 𝘐𝘯𝘨𝘳𝘦𝘴𝘢 𝘦𝘭 𝘵𝘦𝘹𝘵𝘰 𝘫𝘶𝘯𝘵𝘰 𝘢𝘭 𝘤𝘰𝘮𝘢𝘯𝘥𝘰 𝘱𝘢𝘳𝘢 𝘤𝘳𝘦𝘢𝘳 𝘶𝘯 𝘴𝘵𝘪𝘤𝘬𝘦𝘳.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰 .𝘴𝘵 𝘩𝘰𝘭𝘢🥖`,
        }, { quoted: m });
    }

    try {
        // Llamamos a la función para obtener el sticker
        const buffer = await fetchSticker(text);
        let stiker = await sticker(buffer, false, global.botname, global.nombre);
        
        if (stiker) {
            return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
        } else {
            throw new Error("> 𝘌𝘳𝘳𝘰𝘳, 𝘯𝘰 𝘴𝘦 𝘱𝘶𝘥𝘰 𝘨𝘦𝘯𝘦𝘳𝘢𝘳 𝘦𝘭 𝘴𝘵𝘪𝘤𝘬𝘦𝘳.🥖");
        }
    } catch (error) {
        console.error(error);
        return conn.sendMessage(m.chat, {
            text: `> 𝘌𝘳𝘳𝘰𝘳, 𝘯𝘰 𝘴𝘦 𝘱𝘶𝘥𝘰 𝘨𝘦𝘯𝘦𝘳𝘢𝘳 𝘦𝘭 𝘴𝘵𝘪𝘤𝘬𝘦𝘳.🥖`,
        }, { quoted: m });
    }
};

handler.command = ['st'];  // El comando para activar el handler
handler.tags = ['sticker'];
handler.help = ['st *<texto>*'];

export default handler;

