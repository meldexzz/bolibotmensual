import { addExif } from '../lib/sticker.js'
let handler = async (m, { conn, text }) => {
  if (!m.quoted) return conn.reply(m.chat, `> 𝘙𝘦𝘴𝘱𝘰𝘯𝘥𝘦 𝘢 𝘶𝘯 𝘴𝘵𝘪𝘤𝘬𝘦𝘳 𝘱𝘢𝘳𝘢 𝘤𝘢𝘮𝘣𝘪𝘢𝘳 𝘦𝘭 𝘯𝘰𝘮𝘣𝘳𝘦 𝘥𝘦 𝘢𝘶𝘵𝘰𝘳.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘸𝘮 "𝘯𝘰𝘮𝘣𝘳𝘦|𝘢𝘶𝘵𝘰𝘳"`, m)
  let stiker = false
  try {
    let [packname, ...author] = text.split('|')
    author = (author || []).join('|')
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) return conn.reply(m.chat, `> 𝘙𝘦𝘴𝘱𝘰𝘯𝘥𝘦 𝘢 𝘶𝘯 𝘴𝘵𝘪𝘤𝘬𝘦𝘳 𝘱𝘢𝘳𝘢 𝘤𝘢𝘮𝘣𝘪𝘢𝘳 𝘦𝘭 𝘯𝘰𝘮𝘣𝘳𝘦 𝘥𝘦 𝘢𝘶𝘵𝘰𝘳.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘸𝘮 "𝘯𝘰𝘮𝘣𝘳𝘦|𝘢𝘶𝘵𝘰𝘳"`, m)
    let img = await m.quoted.download()
    if (!img) return conn.reply(m.chat, `> 𝘙𝘦𝘴𝘱𝘰𝘯𝘥𝘦 𝘢 𝘶𝘯 𝘴𝘵𝘪𝘤𝘬𝘦𝘳 𝘱𝘢𝘳𝘢 𝘤𝘢𝘮𝘣𝘪𝘢𝘳 𝘦𝘭 𝘯𝘰𝘮𝘣𝘳𝘦 𝘥𝘦 𝘢𝘶𝘵𝘰𝘳.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘸𝘮 "𝘯𝘰𝘮𝘣𝘳𝘦|𝘢𝘶𝘵𝘰𝘳"`, m)
    stiker = await addExif(img, packname || '', author || '')
  } catch (e) {
    console.error(e)
    if (Buffer.isBuffer(e)) stiker = e
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '', m)
    else return conn.reply(m.chat, `> 𝘙𝘦𝘴𝘱𝘰𝘯𝘥𝘦 𝘢 𝘶𝘯 𝘴𝘵𝘪𝘤𝘬𝘦𝘳 𝘱𝘢𝘳𝘢 𝘤𝘢𝘮𝘣𝘪𝘢𝘳 𝘦𝘭 𝘯𝘰𝘮𝘣𝘳𝘦 𝘥𝘦 𝘢𝘶𝘵𝘰𝘳.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘸𝘮 "𝘯𝘰𝘮𝘣𝘳𝘦|𝘢𝘶𝘵𝘰𝘳"`, m)
  }
}
handler.help = ['wm *<nombre>|<autor>*']
handler.tags = ['sticker']
handler.command = ['take', 'robar', 'wm'] 

export default handler
