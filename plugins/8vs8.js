let inscritos8vs8 = []

const handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!args[0]) {
        const texto = `
*8 𝐕𝐄𝐑𝐒𝐔𝐒 8*

⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎                  •
🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : 
🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 : 

➥ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: 
➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:

         𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 1
    
    👑 ┇ 
    🥷🏻 ┇  
    🥷🏻 ┇ 
    🥷🏻 ┇ 
          
         𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 2
    
    👑 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 
    
    ʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:
    🥷🏻 ┇ 
    🥷🏻 ┇

𝗣𝗔𝗥𝗧𝗜𝗖𝗜𝗣𝗔𝗡𝗧𝗘𝗦 𝗔𝗡𝗢𝗧𝗔𝗗𝗢𝗦:
${inscritos8vs8.length === 0 ? 'Ninguno aún.' : inscritos8vs8.map((n, i) => `${i + 1}. ${n}`).join('\n')}
        `.trim()

        const buttons = [
            {
                buttonId: `${usedPrefix}8vs8 anotar`,
                buttonText: { displayText: "✏️ Anotarse" },
                type: 1,
            },
            {
                buttonId: `${usedPrefix}8vs8 limpiar`,
                buttonText: { displayText: "🗑 Limpiar Lista" },
                type: 1,
            },
        ]

        await conn.sendMessage(
            m.chat,
            {
                text: texto,
                buttons,
                viewOnce: true,
            },
            { quoted: m }
        )
        return
    }

    const subcmd = args[0].toLowerCase()
    const nombre = m.pushName || 'Usuario'

    if (subcmd === 'anotar') {
        if (inscritos8vs8.includes(nombre)) {
            return m.reply('❗Ya estás anotado.')
        }
        inscritos8vs8.push(nombre)
        return m.reply(`✅ *${nombre}* ha sido anotado.\nAhora hay *${inscritos8vs8.length}* participante(s).`)
    }

    if (subcmd === 'limpiar') {
        inscritos8vs8 = []
        return m.reply('🧹 Lista limpiada con éxito.')
    }
}

handler.command = /^8vs8$/i
handler.help = ['8vs8']
handler.tags = ['freefire']
handler.group = true
handler.admin = true

export default handler