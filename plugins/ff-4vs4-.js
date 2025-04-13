import fg from 'api-dylux';
import fetch from 'node-fetch';
import axios from 'axios';
import { MessageType, Mimetype } from '@adiwajshing/baileys'; // Asegúrate de tener esta biblioteca instalada

let handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!args[0]) throw `
𝟒 𝐕𝐄𝐑𝐒𝐔𝐒 𝟒

⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎                       •
🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : 
🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 :                

➥ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: 
➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:

      𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 1
    
    👑 ┇ 
    🥷🏻 ┇  
    🥷🏻 ┇ 
    🥷🏻 ┇  
    
    ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:
    🥷🏻 ┇ 
    🥷🏻 ┇
                 
` 

    // Crear botones
    const buttons = [
        { buttonId: 'join', buttonText: { displayText: 'Anotarse' }, type: 1 },
        { buttonId: 'list', buttonText: { displayText: 'Ver Lista' }, type: 1 }
    ];
    
    const buttonMessage = {
        text: '¡Haz clic en un botón para participar!',
        footer: '4 VS 4',
        buttons: buttons,
        headerType: 1
    };

    await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
}

// Manejar la respuesta de los botones
handler.on('buttonClick', async (m, button) => {
    const userName = m.sender.split('@')[0]; // Obtener el nombre de usuario
    if (button.id === 'join') {
        // Aquí puedes agregar el usuario a la lista
        // Por ejemplo, podrías tener un array para almacenar los nombres
        if (!global.participants) global.participants = [];
        global.participants.push(userName);
        await conn.sendMessage(m.chat, `Te has anotado, ${userName}!`, { quoted: m });
    } else if (button.id === 'list') {
        // Mostrar la lista de participantes
        const participantList = global.participants ? global.participants.join(', ') : 'No hay participantes aún.';
        await conn.sendMessage(m.chat, `Participantes:\n${participantList}`, { quoted: m });
    }
});

handler.help = ['4vs4'];
handler.tags = ['freefire'];
handler.command = /^(vs4|4vs4|masc4)$/i;
handler.group = true;
handler.admin = true;

export default handler;