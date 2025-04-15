export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return !0;
  if (m.isGroup) return !1;
  if (!m.message) return !0;
  if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('jadibot')) return !0;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
  if (bot.antiPrivate && !isOwner && !isROwner) {
    await m.reply(`> "> 𝘏𝘰𝘭𝘢 @${m.sender.split`@`[0]}, 𝘦𝘴𝘵𝘢 𝘱𝘳𝘰𝘩𝘪𝘣𝘪𝘥𝘰 𝘦𝘴𝘤𝘳𝘪𝘣𝘪𝘳𝘮𝘦 𝘢𝘭 𝘱𝘳𝘪𝘷𝘢𝘥𝘰, 𝘚𝘖𝘠 𝘜𝘕 𝘉𝘖𝘛 𝘋𝘌 𝘙𝘌𝘚𝘗𝘜𝘌𝘚𝘛𝘈 𝘈𝘜𝘛𝘖𝘔𝘈𝘛𝘐𝘊𝘈.\n\n> 𝙎𝙀𝙍𝘼𝙎 𝘽𝙇𝙊𝙌𝙐𝙀𝘼𝘿@. \n\n\n 𝘚𝘪 𝘥𝘦𝘴𝘦𝘢𝘴 𝘢𝘥𝘲𝘶𝘪𝘳𝘪𝘳 𝘶𝘯 𝘣𝘰𝘵 𝘱𝘢𝘳𝘢 𝘵𝘶𝘴 𝘨𝘳𝘶𝘱𝘰𝘴 𝘱𝘦𝘳𝘮𝘢𝘯𝘦𝘯𝘵𝘦/𝘮𝘦𝘯𝘴𝘶𝘢𝘭 𝘦𝘴𝘤𝘳𝘪𝘣𝘦 𝘢 𝘮𝘪 𝘤𝘳𝘦𝘢𝘥𝘰𝘳: +52 5649707515`, false, {mentions: [m.sender]});
    await this.updateBlockStatus(m.chat, 'block');
  }
  return !1;
}
