/* Código hecho por Destroy
 - https://github.com/The-King-Destroy
 */

let handler = async (m, { conn }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let name = conn.getName(who);
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './logo.jpg');
    conn.sendFile(m.chat, pp, 'profile.jpg', `𝘈𝘲𝘶í 𝘦𝘴𝘵á 𝘭𝘢 𝘧𝘰𝘵𝘰 𝘥𝘦 𝘱𝘦𝘳𝘧𝘪𝘭 𝘥𝘦: ${name}`, m);
}

handler.help = ['pfp @user'];
handler.tags = ['sticker'];
handler.command = ['pfp'];

export default handler;
