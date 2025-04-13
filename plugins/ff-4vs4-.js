
import fetch from 'node-fetch';
import axios from 'axios';

let anotados = []; // Lista de usuarios anotados

let handler = async (m, { conn, args, command, usedPrefix }) => {
    // Mostrar la lista inicial con botones
    if (command === '4vs4') {
        let lista = `
𝟒 𝐕𝐄𝐑𝐒𝐔𝐒 𝟒

⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎                       
🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : 
🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 :                

➥ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: 
➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:

𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 1
👑 ┇ ${anotados.length > 0 ? anotados.join('\n👑 ┇ ') : 'Vacío'}
    
ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:
🥷🏻 ┇ Vacío
`;

        const buttons = [
            { buttonId: `${usedPrefix}anotarse`, buttonText: { displayText: "✍️ Anotarse" }, type: 1 },
            { buttonId: `${usedPrefix}verlista`, buttonText: { displayText: "📋 Ver Lista" }, type: 1 }
        ];

        const buttonMessage = {
            text: lista,
            footer: "Presiona un botón para interactuar",
            buttons: buttons,
            headerType: 1
        };

        await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
        return;
    }

    // Anotarse en la lista
    if (command === 'anotarse') {
        const userName = conn.getName(m.sender); // Obtener nombre del usuario
        if (anotados.includes(userName)) {
            await conn.sendMessage(m.chat, { text: `❗ Ya estás anotado, ${userName}.` }, { quoted: m });
        } else {
            anotados.push(userName); // Agregar usuario a la lista
            await conn.sendMessage(
                m.chat,
                { text: `✅ Te has anotado correctamente, ${userName}!\n\nParticipantes actuales:\n👑 ┇ ${anotados.join('\n👑 ┇ ')}` },
                { quoted: m }
            );
        }
        return;
    }

    // Ver la lista de anotados
    if (command === 'verlista') {
        let lista = anotados.length > 0
            ? `📋 Lista de participantes:\n👑 ┇ ${anotados.join('\n👑 ┇ ')}`
            : "❗ No hay participantes aún.";
        await conn.sendMessage(m.chat, { text: lista }, { quoted: m });
        return;
    }
};

handler.help = ['4vs4', 'anotarse', 'verlista'];
handler.tags = ['freefire'];
handler.command = /^(4vs4|anotarse|verlista|masc4)$/i;
handler.group = true;
handler.admin = true;

export default handler;