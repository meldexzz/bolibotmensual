import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const res = await fetch('https://api.vreden.my.id/api/tebakff');
    const json = await res.json();
    const { jawaban, img } = json.result;

    conn.tebakff = conn.tebakff || {};
    conn.tebakff[m.sender] = {
      jawaban: jawaban.toLowerCase(),
      timeout: setTimeout(() => {
        m.reply(`⏰ ᴛɪᴇᴍᴘᴏ ᴀɢᴏᴛᴀᴅᴏ...\n❗ ʟᴀ ʀᴇꜱᴘᴜᴇꜱᴛᴀ ᴄᴏʀʀᴇᴄᴛᴀ ᴇʀᴀ: *${jawaban}*`);
        delete conn.tebakff[m.sender];
      }, 30000)
    };

    await conn.sendMessage(m.chat, { react: { text: '🕵️', key: m.key } });

    const buttons = [
      {
        buttonId: `${usedPrefix + command}`,
        buttonText: { displayText: "🔁 ɪɴᴛᴇɴᴛᴀʀ ᴏᴛʀᴏ" },
        type: 1,
      },
      {
        buttonId: `${usedPrefix}menu`,
        buttonText: { displayText: "🏡 ᴍᴇɴᴜ ᴘʀɪɴᴄɪᴘᴀʟ" },
        type: 1,
      }
    ];

    await conn.sendMessage(m.chat, {
      image: { url: img },
      caption: `✨ *ᴀᴅɪᴠɪɴᴀ ᴇʟ ᴘᴇʀꜱᴏɴᴀᴊᴇ ᴅᴇ ꜰʀᴇᴇ ꜰɪʀᴇ* ✨

ᴇꜱᴛᴀꜱ ᴠɪᴇɴᴅᴏ ᴀ ᴜɴ ᴘᴇʀꜱᴏɴᴀᴊᴇ ꜱᴜᴘᴇʀ ᴄᴏɴᴏᴄɪᴅᴏ...
ᴘᴇʀᴏ, ¿ᴄᴜᴀ́ʟ ᴇꜱ ꜱᴜ ɴᴏᴍʙʀᴇ?

⏳ ᴛɪᴇɴᴇꜱ *30 ꜱᴇɢᴜɴᴅᴏꜱ* ᴘᴀʀᴀ ʀᴇꜱᴘᴏɴᴅᴇʀ.
ᴇꜱᴄʀɪʙᴇ ᴛᴜ ʀᴇꜱᴘᴜᴇꜱᴛᴀ ᴇɴ ᴇʟ ᴄʜᴀᴛ.`,
      buttons,
      footer: "*The Teddies 🐻🔥*",
      viewOnce: true,
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    m.reply("❌ ᴏᴄᴜʀʀɪᴏ́ ᴜɴ ᴇʀʀᴏʀ ᴀʟ ᴄᴀʀɢᴀʀ ᴇʟ ᴘᴇʀꜱᴏɴᴀᴊᴇ. ɪɴᴛᴇɴᴛᴀ ᴍᴀ́s ᴛᴀʀᴅᴇ.");
  }
};

handler.before = async (m, { conn }) => {
  if (conn.tebakff && conn.tebakff[m.sender]) {
    const respuesta = conn.tebakff[m.sender].jawaban;
    if (m.text.toLowerCase() === respuesta) {
      clearTimeout(conn.tebakff[m.sender].timeout);
      delete conn.tebakff[m.sender];
      return m.reply("✅ *ʀᴇꜱᴘᴜᴇꜱᴛᴀ ᴄᴏʀʀᴇᴄᴛᴀ!* ᴇʀᴇꜱ ᴜɴ ᴇxᴘᴇʀᴛᴏ ꜰꜰ 🔥");
    } else {
      return m.reply("❌ *ɴᴏ ᴇꜱ ᴇꜱᴀ*, ɪɴᴛᴇɴᴛᴀ ᴏᴛʀᴀ ᴠᴇᴢ...");
    }
  }
};

handler.help = ["tebakff"];
handler.tags = ["juegos"];
handler.command = /^tebakff|adivinaff$/i;
handler.exp = 20;

export default handler;
