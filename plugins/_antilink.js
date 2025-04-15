const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i

export async function before(m, {conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    const isGroupLink = linkRegex.exec(m.text)

    if (chat.antiLink && isGroupLink && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
            if (m.text.includes(linkThisGroup)) return !0
        }
        await conn.reply(m.chat, `> 𝘕𝘰 𝘱𝘦𝘳𝘮𝘪𝘵𝘪𝘮𝘰𝘴 𝘦𝘯𝘭𝘢𝘤𝘦𝘴 𝘥𝘦 𝘰𝘵𝘳𝘰 𝘨𝘳𝘶𝘱𝘰 *_@${m.sender.split('@')[0]}_* 𝘴𝘦𝘳á𝘴 𝘦𝘹𝘱𝘶𝘭𝘴𝘢𝘥𝘰 𝘥𝘦𝘭 𝘨𝘳𝘶𝘱𝘰.🥖  ${isBotAdmin ? '' : '\n\n𝘕𝘰 𝘴𝘰𝘺 𝘢𝘥𝘮𝘪𝘯𝘪𝘴𝘵𝘳𝘢𝘥𝘰𝘳 𝘥𝘦𝘭 𝘨𝘳𝘶𝘱𝘰, 𝘯𝘰 𝘱𝘶𝘦𝘥𝘰 𝘦𝘹𝘱𝘶𝘭𝘴𝘢𝘳𝘵𝘦.'}`, null, { mentions: [m.sender] } )
        if (isBotAdmin && chat.antiLink) {
                await conn.sendMessage(m.chat, { delete: m.key })
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        } else if (!chat.antiLink) return //m.reply('')
    }
    return !0
}
