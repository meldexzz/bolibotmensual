import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {

    if (!global.db.data.chats[m.chat].nsfw) return m.reply(`> 𝘌𝘭 𝘨𝘳𝘶𝘱𝘰 𝘯𝘰 𝘢𝘥𝘮𝘪𝘵𝘦 𝘤𝘰𝘯𝘵𝘦𝘯𝘪𝘥𝘰 𝘕𝘚𝘍𝘞.\n\nS𝘪 𝘥𝘦𝘴𝘦𝘢𝘴 𝘶𝘴𝘢𝘳 𝘭𝘢 𝘧𝘶𝘯𝘤𝘪𝘰𝘯 𝘢𝘤𝘵𝘪𝘷𝘢𝘭𝘢 𝘤𝘰𝘯 .𝘦𝘯𝘢𝘣𝘭𝘦 𝘕𝘚𝘍𝘞. 🥖 `);

    m.react('🔥');

    let imagenes = [
        "https://telegra.ph/file/17d7a52fa4d09bffd4021.jpg",
        "https://telegra.ph/file/6e4833070c1db456e3f16.jpg",
        "https://telegra.ph/file/6359a215c404084b4b5a5.jpg",
        "https://telegra.ph/file/39d6125edc9d816edea66.jpg",
        "https://telegra.ph/file/9e17fc2c5736c7bf50c1b.jpg",
        "https://telegra.ph/file/ffaf339d90f17f48e0b1e.jpg",
        "https://telegra.ph/file/36b0f4c3ee3f6da840f5a.jpg",
        "https://telegra.ph/file/e3bb0cfa608635ef709f7.jpg",
        "https://telegra.ph/file/37a490ae79ec506162358.jpg",
        "https://telegra.ph/file/7c59261f11fb56fc69fb3.jpg",
        "https://telegra.ph/file/f426a92690ac973e386ca.jpg",
        "https://telegra.ph/file/5349111c4713ccda12c87.jpg",
        "https://telegra.ph/file/83527deec9df9ac4b19b8.jpg",
        "https://telegra.ph/file/346fcefaf50115c561c3c.jpg",
        "https://telegra.ph/file/a824ababb101abeb9381b.jpg",
        "https://telegra.ph/file/b26f7a2ec0b020773634b.jpg",
        "https://telegra.ph/file/f071c9a4cef0fac79c614.jpg",
        "https://telegra.ph/file/85d4dc6ba0e3d922c79c3.jpg",
        "https://telegra.ph/file/81f0b276b91501e14c53e.jpg",
        "https://telegra.ph/file/1a4be9852051e5e818903.jpg"
    ];

    const imagen = imagenes[Math.floor(Math.random() * imagenes.length)];

    await conn.sendMessage(m.chat, { 
        image: { url: imagen }
    }, { quoted: m });
};

handler.help = ['pechos', 'tetas'];
handler.tags = ['nsfw'];
handler.command = ['pechos', 'tetas'];

export default handler;
