
let inscritos24vs24 = []

const handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!args[0]) {
        const texto = `
*24 𝐕𝐄𝐑𝐒𝐔𝐒 24*

⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎
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

         𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 3
    👑 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 

         𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 4
    👑 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 

         𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 5
    👑 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 

         𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 6
    👑 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 
    
    ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:
    🥷🏻 ┇ 
    🥷🏻 ┇ 

𝗣𝗔𝗥𝗧𝗜𝗖𝗜𝗣𝗔𝗡𝗧𝗘𝗦 𝗔𝗡𝗢𝗧𝗔𝗗𝗢𝗦:
${inscritos24vs24.length === 0 ? 'Ninguno aún.' : inscritos24vs24.map((n, i) => `${i + 1}. ${n}`).join('\n')}
        `.trim()

        const buttons = [
            {
                buttonId: `${usedPrefix}24vs24 anotar`,
                buttonText: { displayText: "✏️ Anotarse" },
                type: 1,
            },
            {
                buttonId: `${usedPrefix}24vs24 limpiar`,
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
        if (inscritos24vs24.includes(nombre)) {
            return m.reply('❗Ya estás anotado.')
        }
        inscritos24vs24.push(nombre)
        return m.reply(`✅ *${nombre}* ha sido anotado.\nAhora hay *${inscritos24vs24.length}* participante(s).`)
    }

    if (subcmd === 'limpiar') {
        inscritos24vs24 = []
        return m.reply('🧹 Lista limpiada con éxito.')
    }
}

handler.command = /^24vs24$/i
handler.help = ['24vs24']
handler.tags = ['freefire']
handler.group = true
handler.admin = true

export default handler