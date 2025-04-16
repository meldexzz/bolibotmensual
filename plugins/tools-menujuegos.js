let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let d = new Date(new Date() + 3600000);
        let locale = 'es';
        let week = d.toLocaleDateString(locale, { weekday: 'long' });
        let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
        let _uptime = process.uptime() * 1000;
        let uptime = clockString(_uptime);

        let menu = `
> ¡𝘏𝘰𝘭𝘢!.🥖 👋🏻 @${m.sender.split("@")[0]}
> ${week}, ${date}

╭──𝗠𝗘𝗡𝗨 𝗝𝗨𝗘𝗚𝗢𝗦───
> 𝘉𝘪𝘦𝘯𝘷𝘦𝘯𝘪𝘥𝘰 ...
> 𝘉𝘰𝘭𝘪𝘭𝘭𝘰𝘉𝘰𝘵 𝘵𝘦 𝘱𝘳𝘦𝘴𝘦𝘯𝘵𝘢:
> 𝘌𝘓 𝘊𝘈𝘛𝘈𝘓𝘖𝘎𝘖 𝘋𝘌 𝘑𝘜𝘌𝘎𝘖𝘚.🥖
╰────────────────
» 𝙀𝙓𝙋 𝙅𝙐𝙀𝙂𝙊𝙎 ]━⬣
┃➺ 👤.𝘣𝘢𝘯𝘤𝘰
┃➺ ⚖️ .𝘣𝘢𝘭𝘢𝘯𝘤𝘦
┃➺ ⚖️ .𝘣𝘢𝘭𝘢𝘯𝘤𝘦2
┃➺ 💎 .𝘮𝘪𝘯𝘢𝘳
┃➺ 🧨 .𝘤𝘭𝘢𝘪𝘮
┃➺ 🔫 .𝘳𝘰𝘣𝘢𝘳 @𝘵𝘢𝘨
┃➺ 🎁 .𝘤𝘰𝘧𝘳𝘦
┃➺ 🛒 .𝘣𝘶𝘺 𝘤𝘢𝘯𝘵𝘪𝘥𝘢𝘥 
┃➺ 💵 .𝘵𝘳𝘢𝘯𝘴𝘧𝘦𝘳
┃➺ 🎰 .𝘢𝘱𝘰𝘴𝘵𝘢𝘳
┃➺ 📉 .𝘵𝘳𝘢𝘣𝘢𝘫𝘢𝘳 
┃➺ 💎 .𝘥𝘢𝘳𝘥𝘪𝘢𝘮𝘢𝘯𝘵𝘦𝘴 
┃➺ 📈 .𝘥𝘢𝘳𝘹p
╰━━━━━━⋆★⋆━━━━━━⬣

» 𝗝𝗨𝗘𝗚𝗢𝗦 𝗧𝗘𝗫𝗧𝗢 
┃🎲➺ .𝘴𝘰𝘱𝘢
┃🎲➺ .𝘴𝘶𝘦𝘳𝘵𝘦
┃🎲➺ .𝘳𝘦𝘵𝘰
┃🎲➺ .𝘷𝘦𝘳𝘥𝘢𝘥
┃🎲➺ .𝘢𝘤𝘦𝘳𝘵𝘪𝘫𝘰
┃🎲➺ .𝘥𝘰𝘹𝘦𝘢𝘳 𝙩𝙖𝙜
┃🎲➺ .𝘥𝘰𝘹𝘹𝘦𝘢𝘮𝘦
┃🎲➺ .𝘥𝘢𝘥𝘰
┃🎲➺ .𝘮𝘢𝘵𝘦𝘴
┃🎲➺ .𝘱𝘦𝘭𝘦𝘢
╰━━━━━━⋆★⋆━━━━━━⬣

> 𝘽𝙊𝙇𝙄𝙇𝙇𝙊𝘽𝙊𝙏 / 𝙈𝙀𝙇𝘿𝙀𝙓𝙕𝙕.🥖
`.trim();

        // Enviar solo el texto del menú
        await conn.sendMessage(m.chat, { text: menu, mentions: [m.sender] });
    } catch (e) {
        await m.reply(`𝘖𝘤𝘶𝘳𝘳𝘪ó 𝘶𝘯 𝘦𝘳𝘳𝘰𝘳 𝘦𝘭 𝘦𝘫𝘦𝘤𝘶𝘵𝘢𝘳 𝘦𝘭 𝘤𝘰𝘮𝘢𝘯𝘥𝘰..\n\n${e.message}`);
        console.error(e);
    }
};

handler.command = /^(menujuego|menujuegos|juegos)$/i;
export default handler;

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}
