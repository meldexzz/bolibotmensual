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
            text: `${emoji} Por favor ingresa el texto para hacer un sticker.`,
        }, { quoted: m });
    }

    try {
        // Llamamos a la función para obtener el sticker
        const buffer = await fetchSticker(text);
        let stiker = await sticker(buffer, false, global.botname, global.nombre);
        
        if (stiker) {
            return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
        } else {
            throw new Error("No se pudo generar el sticker.");
        }
    } catch (error) {
        console.error(error);
        return conn.sendMessage(m.chat, {
            text: `${msm} Ocurrió un error: ${error.message}`,
        }, { quoted: m });
    }
};

handler.command = ['st'];  // El comando para activar el handler
handler.tags = ['sticker'];
handler.help = ['st *<texto>*'];

export default handler;

