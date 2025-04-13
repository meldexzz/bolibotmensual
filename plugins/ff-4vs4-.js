
import fetch from 'node-fetch';
import axios from 'axios';

// Lista para almacenar los usuarios anotados
let anotados = [];

let handler = async (m, { conn, args, command, usedPrefix }) => {
    // Rama: Mostrar la lista inicial de anotados
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
            {
                buttonId: `${usedPrefix}anotarse`,
                buttonText: { displayText: "✍️ Anotarse" },
                type: 1
            }
        ];

        const buttonMessage = {
            text: lista,
            footer: "Presiona el botón para anotarte",
            buttons: buttons,
            headerType: 1
        };

        await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
        return;
    }

    // Rama: Al presionar el botón de anotarse
    if (command === 'anotarse') {
        if (anotados.includes(m.sender)) {
            await conn.sendMessage(m.chat, { text: "❗ Ya estás anotado." }, { quoted: m });
        } else {
            // Agregar el usuario anotado a la lista
            anotados.push(conn.getName(m.sender));

            let listaActualizada = `
𝟒 𝐕𝐄𝐑𝐒𝐔𝐒 𝟒

⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎                       
🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : 
🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 :                

➥ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: 
➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:

𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 1
👑 ┇ ${anotados.join('\n👑 ┇ ')}
    
ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:
🥷🏻 ┇ Vacío
`;

            const buttons = [
                {
                    buttonId: `${usedPrefix}anotarse`,
                    buttonText: { displayText: "✍️ Anotarse" },
                    type: 1
                }
            ];

            const buttonMessage = {
                text: listaActualizada,
                footer: "Presiona el botón para anotarte",
                buttons: buttons,
                headerType: 1
            };

            await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
        }
        return;
    }
};

handler.help = ['4vs4', 'anotarse'];
handler.tags = ['freefire'];
handler.command = /^(4vs4|anotarse|masc4)$/i;
handler.group = true;
handler.admin = true;

export default handler;