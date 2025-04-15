const handler = async (m, {text}) => {
const user = global.db.data.users[m.sender];
user.afk = + new Date;
user.afkReason = text;
conn.fakeReply(m.chat, ` 𝘼𝙁𝙆.🥖 

> ᴇʟ ᴜsᴜᴀʀɪᴏ ${conn.getName(m.sender)} ᴇsᴛᴀ ɪɴᴀᴄᴛɪᴠᴏ. 

\`𝙉𝙊 𝙇𝙊𝙎 𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝙀.🥖\`
*☣️ ᴍᴏᴛɪᴠᴏs :* ${text ? ': ' + text : 'paja'}`, '0@s.whatsapp.net', `𝙉𝙊 𝙈𝙊𝙇𝙀𝙎𝙏𝘼𝙍.🥖`, 'status@broadcast', null, fake)
/*m.reply(`『 ＡＦＫ 』

> ᴇsᴛᴇ ᴜsᴜᴀʀɪᴏ : ${conn.getName(m.sender)} ᴇsᴛᴀ ɪɴᴀᴄᴛɪᴠᴏ. 

\`💤 ＮＯ ＬＯＳ ＥＴＩＱＵＥＴＥ 💤\`
*☣️ ᴍᴏᴛɪᴠᴏs :* ${text ? ': ' + text : 'paja'}`);*/
};
handler.help = ['afk [alasan]'];
handler.tags = ['econ'];
handler.command = /^afk$/i;
handler.money = 95
handler.register = false
export default handler;
