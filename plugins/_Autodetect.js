let WAMessageStubType = (await import('@whiskeysockets/baileys')).default

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return
  const fkontak = { 
    "key": { 
    "participants": "0@s.whatsapp.net", 
      "remoteJid": "status@broadcast", 
      "fromMe": false, 
      "id": "Halo"   
    }, 
    "message": { 
      "contactMessage": { 
        "vcard": `BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:y
item1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}
item1.X-ABLabel:Ponsel
END:VCARD` 
      }
    }, 
    "participant": "0@s.whatsapp.net"
  }
  let chat = global.db.data.chats[m.chat]
  let usuario = `@${m.sender.split`@`[0]}`
  let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://files.catbox.moe/xr2m6u.jpg'

  
  let nombre = `> ¡ 𝘽𝙊𝙇𝙄𝙇𝙇𝙊-𝘼𝙇𝙀𝙍𝙏𝘼 !.🥖
> ▸ *_${usuario}_* 
> ▸ 𝘔𝘰𝘥𝘪𝘧𝘪𝘤𝘰 𝘦𝘭 𝘯𝘰𝘮𝘣𝘳𝘦 𝘥𝘦 𝘨𝘳𝘶𝘱𝘰 𝘢:
▸ *_${m.messageStubParameters[0]}_*
`
  
  let foto = `> ¡ 𝘽𝙊𝙇𝙄𝙇𝙇𝙊-𝘼𝙇𝙀𝙍𝙏𝘼 !.🥖
> ▸ *_${usuario}_* 
> ▸ 𝘔𝘰𝘥𝘪𝘧𝘪𝘤𝘰 𝘭𝘢 𝘪𝘮𝘢𝘨𝘦𝘯 𝘥𝘦𝘭 𝘨𝘳𝘶𝘱𝘰.
> ▸ 𝙉𝙐𝙀𝙑𝘼 𝙄𝙈𝘼𝙂𝙀𝙉 𝘼𝙋𝙇𝙄𝘾𝘼𝘿𝘼 𝘼𝙇 𝙂𝙍𝙐𝙋𝙊.
`
  
  let edit = `> ¡ 𝘽𝙊𝙇𝙄𝙇𝙇𝙊-𝘼𝙇𝙀𝙍𝙏𝘼 !.🥖
> ▸ *_${usuario}_*
> ▸ 𝘙𝘦𝘢𝘭𝘪𝘻𝘰 𝘢𝘭𝘨𝘶𝘯𝘰𝘴 𝘤𝘢𝘮𝘣𝘪𝘰𝘴..
> ▸ 𝘊𝘰𝘯𝘧𝘪𝘨𝘶𝘳𝘢𝘤𝘪𝘰𝘯 𝘢𝘤𝘵𝘶𝘢𝘭: ${m.messageStubParameters[0] == '𝘰𝘯' ? '𝘴𝘰𝘭𝘰 𝘢𝘥𝘮𝘪𝘯𝘪𝘴𝘵𝘳𝘢𝘥𝘰𝘳𝘦𝘴' : '𝘛𝘰𝘥𝘰𝘴.'}
`
  
  let newlink = `> ¡ 𝘽𝙊𝙇𝙄𝙇𝙇𝙊-𝘼𝙇𝙀𝙍𝙏𝘼 !.🥖
> ▸ 𝘌𝘭 𝘭𝘪𝘯𝘬 𝘩𝘢 𝘴𝘪𝘥𝘰 𝘳𝘦𝘪𝘯𝘪𝘤𝘪𝘢𝘥𝘰 𝘱𝘰𝘳:
> ▸ *_${usuario}_*
`
  
  let status = `> ¡ 𝘽𝙊𝙇𝙄𝙇𝙇𝙊-𝘼𝙇𝙀𝙍𝙏𝘼 !.🥖
> ▸ 𝘈𝘩𝘰𝘳𝘢 𝘦𝘭 𝘨𝘳𝘶𝘱𝘰 𝘱𝘦𝘳𝘮𝘢𝘯𝘦𝘤𝘦: ${m.messageStubParameters[0] == '𝘰𝘯' ? '𝘊𝘦𝘳𝘳𝘢𝘥𝘰.' : '𝘈𝘣𝘪𝘦𝘳𝘵𝘰.'}.
> ▸ 𝘈𝘤𝘤𝘪ó𝘯 𝘳𝘦𝘢𝘭𝘪𝘻𝘢𝘥𝘢 𝘱𝘰𝘳: *_${usuario}_*
> ▸ 𝘊𝘰𝘯𝘧𝘪𝘨𝘶𝘳𝘢𝘤𝘪ó𝘯: ${m.messageStubParameters[0] == '𝘰𝘯' ? '𝘚𝘰𝘭𝘰 𝘢𝘥𝘮𝘪𝘯𝘪𝘴𝘵𝘳𝘢𝘥𝘰𝘳𝘦𝘴.' : '𝘛𝘰𝘥𝘰𝘴.'}
`
  
  let admingp = `> ¡ 𝘽𝙊𝙇𝙄𝙇𝙇𝙊-𝘼𝙇𝙀𝙍𝙏𝘼 !.🥖
> ▸ *_${m.messageStubParameters[0].split`@`[0]}_* 
> ▸ 𝘏𝘢 𝘴𝘪𝘥𝘰 𝘢𝘴𝘤𝘦𝘯𝘥𝘪𝘥𝘰 𝘢 𝘢𝘥𝘮𝘪𝘯𝘪𝘴𝘵𝘳𝘢𝘥𝘰𝘳.
> ▸ 𝘈𝘤𝘤𝘪ó𝘯 𝘳𝘦𝘢𝘭𝘪𝘻𝘢𝘥𝘢 𝘱𝘰𝘳: *_${usuario}_*
`
  
  let noadmingp = `> ¡ 𝘽𝙊𝙇𝙄𝙇𝙇𝙊-𝘼𝙇𝙀𝙍𝙏𝘼 !.🥖
> ▸ *_${m.messageStubParameters[0].split`@`[0]}_* 
> ▸ 𝘏𝘢 𝘴𝘪𝘥𝘰 𝘥𝘦𝘴𝘤𝘦𝘯𝘥𝘪𝘥𝘰 𝘥𝘦 𝘢𝘥𝘮𝘪𝘯𝘪𝘴𝘵𝘳𝘢𝘥𝘰𝘳.
> ▸ 𝘈𝘤𝘤𝘪ó𝘯 𝘳𝘦𝘢𝘭𝘪𝘻𝘢𝘥𝘢 𝘱𝘰𝘳: *_${usuario}_*
`

  if (chat.detect && m.messageStubType == 21) {
    await conn.sendMessage(m.chat, { text: nombre, mentions: [m.sender] })
  } else if (chat.detect && m.messageStubType == 22) {
    await conn.sendMessage(m.chat, { image: { url: pp }, caption: foto, mentions: [m.sender] })
  } else if (chat.detect && m.messageStubType == 23) {
    await conn.sendMessage(m.chat, { text: newlink, mentions: [m.sender] })
  } else if (chat.detect && m.messageStubType == 25) {
    await conn.sendMessage(m.chat, { text: edit, mentions: [m.sender] })
  } else if (chat.detect && m.messageStubType == 26) {
    await conn.sendMessage(m.chat, { text: status, mentions: [m.sender] })
  } else if (chat.detect && m.messageStubType == 29) {
    await conn.sendMessage(m.chat, { text: admingp, mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`] })
    return;
  } if (chat.detect && m.messageStubType == 30) {
    await conn.sendMessage(m.chat, { text: noadmingp, mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`] })
  } else {
    // Opcional: consola para depuración
    // console.log({ messageStubType: m.messageStubType, messageStubParameters: m.messageStubParameters, type: WAMessageStubType[m.messageStubType] })
  }
}
