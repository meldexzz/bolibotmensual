import fs from 'fs'
import path from 'path'

let handler = async (m, { conn, isROwner, isOwner }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  
  if (!/image\/(png|jpe?g)/.test(mime)) {
    return m.reply('Responde a una *imagen* para establecer el icono de bienvenida.', m)
  }

  
  let media = await q.download()

  const dirPath = path.resolve('./groupIcons')
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }

  
  const fileExtension = mime.split('/')[1]
  const filePath = path.join(dirPath, `${m.chat}.jpg`)
  fs.writeFileSync(filePath, media)

  await conn.reply(m.chat, '_*La imagen de bienvenida ha sido configurada.*_', m)
}

handler.command = ['setwelcomeimg']
handler.botAdmin = true
handler.admin = true
handler.group = true
export default handler
