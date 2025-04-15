let handler = async (m, { conn, text, isROwner, isOwner }) => {

if (text) {
global.db.data.chats[m.chat].sWelcome = text
conn.reply(m.chat, '𝘓𝘢 𝘣𝘪𝘦𝘯𝘷𝘦𝘯𝘪𝘥𝘢 𝘩𝘢 𝘴𝘪𝘥𝘰 𝘮𝘰𝘥𝘪𝘧𝘪𝘤𝘢𝘥𝘢.🥖', m)

} else {
	m.reply('𝘈𝘨𝘳𝘦𝘨𝘢 𝘭𝘢 𝘣𝘪𝘦𝘯𝘷𝘦𝘯𝘪𝘥𝘢 𝘲𝘶𝘦 𝘥𝘦𝘴𝘦𝘢𝘴 𝘮𝘰𝘥𝘪𝘧𝘪𝘤𝘢𝘳, 𝘦𝘫𝘦𝘮𝘱𝘭𝘰: .𝘴𝘦𝘵𝘸𝘦𝘭𝘤𝘰𝘮𝘦 (𝘵𝘦𝘹𝘵𝘰).🥖');
}
}


handler.command = ['setwelcome', 'bienvenida'] 
handler.botAdmin = true
handler.admin = true
handler.group = true
export default handler
