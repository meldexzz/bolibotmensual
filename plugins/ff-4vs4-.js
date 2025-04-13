
import fetch from 'node-fetch';
import axios from 'axios';

let anotados = []; // Lista de usuarios anotados

let handler = async (m, { conn, args, command, usedPrefix }) => {
    // Mostrar la lista inicial de anotados
    if (command === '4vs4' && !args[0]) {
        let lista = `𝟒 𝐕𝐄𝐑𝐒𝐔𝐒 𝟒\n\n⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎\n🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎\n🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀\n\n➥ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃\n➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:\n\n𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 1\n👑 ┇ ${anotados.length > 0 ? anotados.join('\n👑 ┇ ') : 'Vacío'}\n\nㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:\n🥷🏻 ┇ Vacío`;

        const buttons = [
            { buttonId: `${usedPrefix}anotarse`, buttonText: { displayText: "✍️ Anotarse" }, type: 1 }
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

    // Registrar al usuario al presionar el botón de anotarse
    if (command === 'anotarse') {
        if (anotados.includes(m.sender)) {
            await conn.sendMessage(m.chat, { text: "❗ Ya estás anotado." }, { quoted: m });
        } else {
            anotados.push(m.sender); // Agregar al usuario a la lista
            let listaActualizada = `𝟒 𝐕𝐄𝐑𝐒𝐔𝐒 𝟒\n\n⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎\n🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎\n🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀\n\n➥ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃\n➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:\n\n𝗘𝗦𝗖𝗨𝗔𝐃𝗥𝗔 1\n👑 ┇ ${anotados.join('\n👑 ┇ ')}\n\nㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:\n🥷🏻 ┇ Vacío`;

            const buttons = [
                { buttonId: `${usedPrefix}anotarse`, buttonText: { displayText: "✍️ Anotarse" }, type: 1 }
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