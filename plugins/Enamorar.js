var handler = async (m, { conn, command, text }) => {

if (!text) throw `> 𝘌𝘵𝘪𝘲𝘶𝘦𝘵𝘢 𝘢 𝘥𝘰𝘴 𝘱𝘦𝘳𝘴𝘰𝘯𝘢𝘴 𝘦𝘯 𝘦𝘭 𝘮𝘪𝘴𝘮𝘰 𝘵𝘦𝘹𝘵𝘰 𝘥𝘦𝘭 𝘤𝘰𝘮𝘢𝘯𝘥𝘰.\n\n 𝘌𝘫𝘮𝘱𝘭𝘰: .𝘦𝘯𝘢𝘮𝘰𝘳𝘢𝘳 @concha @bolillo.🥖 `
let [text1, ...text2] = text.split(' ')

text2 = (text2 || []).join(' ')
if (!text2) throw `> 𝘌𝘴𝘤𝘳𝘪𝘣𝘦 𝘰 𝘦𝘵𝘪𝘲𝘶𝘦𝘵𝘢 𝘦𝘭 𝘯𝘰𝘮𝘣𝘳𝘦 𝘥𝘦 𝘭𝘢 𝘴𝘦𝘨𝘶𝘯𝘥𝘢 𝘱𝘦𝘳𝘴𝘰𝘯𝘢.🥖`
let love = `━━━━━━━━━━━━━━━
❤️ *${text1}* 𝘛𝘶 𝘰𝘱𝘰𝘳𝘵𝘶𝘯𝘪𝘥𝘢𝘥 𝘥𝘦 𝘦𝘯𝘢𝘮𝘰𝘳𝘢𝘳𝘵𝘦 𝘥𝘦:  *${text2}* 𝘦𝘴 𝘥𝘦: *${Math.floor(Math.random() * 100)}%* 👩🏻‍❤️‍👨🏻 
━━━━━━━━━━━━━━━
`.trim()
m.reply(love, null, { mentions: conn.parseMention(love) })

}
handler.help = ['love']
handler.tags = ['fun']
handler.command = /^(enamorar|ship)$/i

export default handler
