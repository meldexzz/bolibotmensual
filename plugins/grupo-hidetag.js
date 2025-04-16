import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
import * as fs from 'fs'

var handler = async (m, { conn, text, participants }) => {
    if (!m.quoted && !text?.trim()) return m.reply(`¿𝙔 𝙀𝙇 𝙏𝙀𝙓𝙏𝙊? 🥖`) 

    try { 
        let users = participants.map(u => conn.decodeJid(u.id))
        let q = m.quoted ? m.quoted : m || m.text || m.sender
        let c = m.quoted ? await m.getQuotedObj() : m.msg || m.text || m.sender
        let msg = generateWAMessageFromContent(m.chat, { 
            [m.quoted ? q.mtype : 'extendedTextMessage']: 
            m.quoted ? c.message?.[q.mtype] || { text: c.text || '' } : { text: text }
        }, { userJid: conn.user.id, mentions: users }) // 🔹 Agregado mentions correctamente

        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    } catch {  
        let users = participants.map(u => conn.decodeJid(u.id))
        let quoted = m.quoted ? m.quoted : m
        let mime = (quoted.msg || quoted).mimetype || ''
        let isMedia = /image|video|sticker|audio/.test(mime)
        let htextos = text ? text : "*Hola!!*"

        if (isMedia && quoted.mtype) {
            let mediax = await quoted.download?.()
            if (mediax) {
                let options = { mentions: users, caption: htextos }
                if (quoted.mtype === 'imageMessage') {
                    conn.sendMessage(m.chat, { image: mediax, ...options }, { quoted: m }) // 🔹 Ahora cita el mensaje correctamente
                } else if (quoted.mtype === 'videoMessage') {
                    conn.sendMessage(m.chat, { video: mediax, mimetype: 'video/mp4', ...options }, { quoted: m })
                } else if (quoted.mtype === 'audioMessage') {
                    conn.sendMessage(m.chat, { audio: mediax, mimetype: 'audio/mp4', fileName: `Hidetag.mp3`, ...options }, { quoted: m })
                } else if (quoted.mtype === 'stickerMessage') {
                    conn.sendMessage(m.chat, { sticker: mediax, mentions: users }, { quoted: m })
                }
            } else {
                conn.sendMessage(m.chat, { text: htextos, mentions: users }, { quoted: m }) // 🔹 Ahora cita el mensaje correctamente
            }
        } else {
            conn.sendMessage(m.chat, { text: htextos, mentions: users }, { quoted: m }) // 🔹 Ahora cita el mensaje correctamente
        }
    }
}

handler.command = /^(n|notificar|notify)$/i
handler.group = true
handler.admin = true
handler.register = false 

export default handler
