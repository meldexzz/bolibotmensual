export function before(m) {
const user = global.db.data.users[m.sender];
if (user.afk > -1) {
m.reply(` 𝘿𝙀𝙅𝘼𝙎𝙏𝙀 𝘿𝙀 𝙀𝙎𝙏𝘼𝙍 𝘼𝙁𝙆..🥖

${user.afkReason ? '*🔸️ ʀᴀᴢᴏɴ :* ' + user.afkReason : ''}*
*🔸 ᴇsᴛᴜᴠᴏ ɪɴᴀᴄᴛɪᴠᴏ ᴅᴜʀᴀɴᴛᴇ:* ${(new Date - user.afk).toTimeString()}*`.trim());
user.afk = -1;
user.afkReason = '';
}
const jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
for (const jid of jids) {
const user = global.db.data.users[jid];
if (!user) {
continue;
}
const afkTime = user.afk;
if (!afkTime || afkTime < 0) {
continue;
}
const reason = user.afkReason || '';
conn.fakeReply(m.chat, ` 𝙉𝙊 𝙇𝙊𝙎 𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝙀.🥖

> *ᴇʟ ᴜsᴜᴀʀɪᴏ ǫᴜᴇ ᴍᴇɴᴄɪᴏɴᴀs ᴇsᴛᴀ ᴀғᴋ*

*🔸 ${reason ? 'ᴍᴏᴛɪᴠᴏ ᴅᴇ ɪɴᴀᴄᴛɪᴠɪᴅᴀᴅ (ᴀғᴋ): ' + reason : 'ᴍᴏᴛɪᴠᴏ ᴅᴇ ɪɴᴀᴄᴛɪᴠɪᴅᴀᴅ (ᴀғᴋ): Paja xD\n> _El usuario no especificó un motivo_'}*
*🔸 ᴛɪᴇᴍᴘᴏ ᴛʀᴀɴsᴄᴜʀʀɪᴅᴏ ᴅᴇ ɪɴᴀᴄᴛɪᴠɪᴅᴀᴅ (ᴀғᴋ): ${(new Date - afkTime).toTimeString()}*`, '0@s.whatsapp.net', `𝙉𝙊 𝙈𝙊𝙇𝙀𝙎𝙏𝘼𝙍.🥖`, 'status@broadcast', null, fake)
}
return true;
}
