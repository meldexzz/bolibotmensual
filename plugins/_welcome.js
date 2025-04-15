import { WAMessageStubType } from '@whiskeysockets/baileys'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'


async function getUserName(conn, jid) {
  let name = await conn.getName(jid)
  if (!name) {
    const contact = await conn.fetchContact(jid)
    name = contact?.notify || contact?.name || jid.split('@')[0]
  }
  return name
}

function getGroupIcon(m) {
  const dirPath = path.resolve('./groupIcons')
  const groupIconPath = path.join(dirPath, `${m.chat}.jpg`)

  if (fs.existsSync(groupIconPath)) {
    return fs.readFileSync(groupIconPath)
  }
  return null
}

async function getUserProfilePicture(conn, jid) {
  try {
    const ppUrl = await conn.profilePictureUrl(jid, 'image')
    if (ppUrl) {
      return await (await fetch(ppUrl)).buffer()
    }
  } catch (e) {
    
  }
  return null
}



export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]

  
  const userJid = m.messageStubParameters[0]
  let img = await getUserProfilePicture(conn, userJid)

  
  if (!img) {
    img = getGroupIcon(m)
  }

  if (!img) {
    img = imagen1
  }

 //const userName = await getUserName(conn, userJid)

  if (chat.welcome) {
    let message = ''
    if (m.messageStubType == 27) {
      message = chat.sWelcome
        ? chat.sWelcome.replace('@user', taguser).replace('@subject', groupMetadata.subject)
        : `_🙂 Hola *${taguser}* Bienvenid@ al grupo *${groupMetadata.subject}*_`
    } else if (m.messageStubType == 32) {
      message = chat.sBye
        ? chat.sBye.replace('@user', taguser).replace('@subject', groupMetadata.subject)
        : `_👋 *${taguser}* Ha abandonado el grupo_`
    } else if (m.messageStubType == 28) {
      message = chat.sBye
        ? chat.sBye.replace('@user', taguser).replace('@subject', groupMetadata.subject)
        : `_☠️ *${taguser}* Fue expulsad@ del grupo_`
    }

    if (message) {
      await conn.sendMessage(m.chat, { image: img, caption: message, mentions: [userJid] })
    }
  }
  }
    
