const handler = async (m, {conn}) => {
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  await conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/gay', {
    avatar: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
  }), 'error.png', '𝘔𝘪𝘳𝘦𝘯 𝘢 𝘦𝘴𝘵𝘦 𝘮𝘢𝘳𝘪𝘤𝘰𝘯, 𝘯𝘰 𝘤𝘰𝘮𝘦 𝘣𝘰𝘭𝘪𝘭𝘭𝘰. 🥖 ', m);
};

handler.help = ['gay'];
handler.tags = ['maker'];
handler.command = /^(gay)$/i;
export default handler;
