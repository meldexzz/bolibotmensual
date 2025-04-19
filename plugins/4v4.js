import fg from 'api-dylux'
import fetch from 'node-fetch'
import axios from 'axios'

let inscritos = []

let handler = async (m, { conn, args, command, usedPrefix }) => {
  if (!args[0]) {
    const text = `
𝟒 𝐕𝐄𝐑𝐒𝐔𝐒 𝟒

⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎                       •
🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : 
🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 :                

➥ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: 
➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:

      𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 1
    
    👑 ┇ 
    🥷🏻 ┇  
    🥷🏻 ┇ 
    🥷🏻 ┇  
    
    ʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:
    🥷🏻 ┇ 
    🥷🏻 ┇

𝗣𝗔𝗥𝗧𝗜𝗖𝗜𝗣𝗔𝗡𝗧𝗘𝗦 𝗔𝗡𝗢𝗧𝗔𝗗𝗢𝗦:
${inscritos.length === 0 ? 'Ninguno aún.' : inscritos.map((n, i) => `${i + 1}. ${n}`).join('\n')}
    `.trim()

    const buttons = [
      { buttonId: `${usedPrefix}4vs4 anotar`, buttonText: { displayText: '✏️ Anotarse' }, type: 1 },
      { buttonId: `${usedPrefix}4vs4 limpiar`, buttonText: { displayText: '🗑 Limpiar lista' }, type: 1 }
    ]

    await conn.sendMessage(m.chat, {
      text,
      buttons,
      headerType: 1
    }, { quoted: m })

    return
  }

  if (args[0].toLowerCase() === 'anotar') {
    const nombre = m.pushName || 'Usuario'
    if (inscritos.includes(nombre)) {
      return m.reply('❗Ya estás anotado.')
    }
    inscritos.push(nombre)
    m.reply(`✅ *${nombre}* ha sido anotado.`)
    return
  }

  if (args[0].toLowerCase() === 'limpiar') {
    inscritos = []
    m.reply('🧹 Lista de participantes limpiada.')
    return
  }
}

handler.help = ['4vs4']
handler.tags = ['freefire']
handler.command = /^(vs4|4vs4|masc4)$/i
handler.group = true

export default handler