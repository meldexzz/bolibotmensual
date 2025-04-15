let handler = async (m, { conn, usedPrefix, command}) => {
await conn.reply(m.chat,`𝘛𝘰𝘮𝘢, 𝘯𝘰 𝘰𝘭𝘷𝘪𝘥𝘦𝘴 𝘤𝘰𝘮𝘦𝘳 𝘣𝘰𝘭𝘪𝘭𝘭𝘰. 🥖`, m)
}
handler.customPrefix = /^(Fototeta|fototeta)$/i
handler.command = new RegExp
export default handler
