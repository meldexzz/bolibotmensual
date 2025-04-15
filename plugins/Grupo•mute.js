let mutedUsers = new Set();

let handler = async (m, { conn, usedPrefix, command, isAdmin, isBotAdmin }) => {
    if (!isBotAdmin) return conn.reply(m.chat, '> 𝘉𝘰𝘭𝘪𝘭𝘭𝘰𝘉𝘰𝘵 𝘯𝘦𝘤𝘦𝘴𝘪𝘵𝘢 𝘴𝘦𝘳 𝘢𝘥𝘮𝘪𝘯𝘪𝘴𝘵𝘳𝘢𝘥𝘰𝘳. 🥖', m);
    if (!isAdmin) return conn.reply(m.chat, '> 𝘌𝘴𝘵𝘦 𝘤𝘰𝘮𝘢𝘯𝘥𝘰 𝘴𝘰𝘭𝘰 𝘱𝘶𝘦𝘥𝘦𝘯 𝘶𝘴𝘢𝘳𝘭𝘰 𝘢𝘥𝘮𝘪𝘯𝘪𝘴𝘵𝘳𝘢𝘥𝘰𝘳𝘦𝘴. 🥖', m);

    let user;
    if (m.quoted) {
        user = m.quoted.sender;
    } else {
        return conn.reply(m.chat, '> 𝘙𝘦𝘴𝘱𝘰𝘯𝘥𝘦 𝘢𝘭 𝘮𝘦𝘯𝘴𝘢𝘫𝘦 𝘥𝘦𝘭 𝘶𝘴𝘶𝘢𝘳𝘪𝘰 𝘲𝘶𝘦 𝘥𝘦𝘴𝘦𝘢𝘴 𝘮𝘶𝘵𝘦𝘢𝘳.\n\n 𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘮𝘶𝘵𝘦 (𝘙𝘦𝘴𝘱𝘰𝘯𝘥𝘪𝘦𝘯𝘥𝘰 𝘢 𝘴𝘶 𝘮𝘦𝘯𝘴𝘢𝘫𝘦).🥖', m);
    }

    if (command === "mute") {
        mutedUsers.add(user);
        conn.reply(m.chat, `𝘜𝘴𝘶𝘢𝘳𝘪𝘰 𝘮𝘶𝘵𝘦𝘢𝘥𝘰: @${user.split('@')[0]}  🥖`, m, { mentions: [user] });
    } else if (command === "unmute") {
        mutedUsers.delete(user);
        conn.reply(m.chat, `𝘜𝘴𝘶𝘢𝘳𝘪𝘰 𝘥𝘦𝘴𝘮𝘶𝘵𝘦𝘢𝘥𝘰: @${user.split('@')[0]}  🥖 `, m, { mentions: [user] });
    }
};

handler.before = async (m, { conn }) => {
    if (mutedUsers.has(m.sender) && m.mtype !== 'stickerMessage') {
        try {
            await conn.sendMessage(m.chat, { delete: m.key });
        } catch (e) {
            console.error(e);
        }
    }
};

handler.help = ['mute', 'unmute'];
handler.tags = ['group'];
handler.command = /^(mute|unmute)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
