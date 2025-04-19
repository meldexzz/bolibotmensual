
import { WAMessageStubType } from '@whiskeysockets/baileys';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

async function getUserName(conn, jid) {
  let name = await conn.getName(jid);
  if (!name) {
    const contact = await conn.fetchContact(jid);
    name = contact?.notify || contact?.name || jid.split('@')[0];
  }
  return name;
}

function getGroupIcon(m) {
  const dirPath = path.resolve('./groupIcons');
  const groupIconPath = path.join(dirPath, `${m.chat}.jpg`);

  if (fs.existsSync(groupIconPath)) {
    return fs.readFileSync(groupIconPath);
  }
  return null;
}

async function getUserProfilePicture(conn, jid) {
  try {
    const ppUrl = await conn.profilePictureUrl(jid, 'image');
    if (ppUrl) {
      return await (await fetch(ppUrl)).buffer();
    }
  } catch (e) {}
  return null;
}

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  let who = m.messageStubParameters[0];
  let taguser = `@${who.split('@')[0]}`;
  let chat = global.db.data.chats[m.chat];

  const userJid = m.messageStubParameters[0];
  let img = await getUserProfilePicture(conn, userJid);

  
  if (!img) {
    img = getGroupIcon(m);
  }
  if (!img) {
    img = fs.readFileSync('./default-image.jpg'); 
  }

  
  let message = '';
  switch (m.messageStubType) {
    case WAMessageStubType.GROUP_PARTICIPANT_ADD: 
      message = chat.sWelcome
        ? chat.sWelcome.replace('@user', taguser).replace('@subject', groupMetadata.subject)
        : `_🙂 Hola *${taguser}*, bienvenid@ al grupo *${groupMetadata.subject}*._`;
      break;
    case WAMessageStubType.GROUP_PARTICIPANT_REMOVE:
      message = chat.sBye
        ? chat.sBye.replace('@user', taguser).replace('@subject', groupMetadata.subject)
        : `_☠️ *${taguser}* fue expulsad@ del grupo._`;
      break;
    case WAMessageStubType.GROUP_PARTICIPANT_LEAVE:
      message = chat.sBye
        ? chat.sBye.replace('@user', taguser).replace('@subject', groupMetadata.subject)
        : `_👋 *${taguser}* ha abandonado el grupo._`;
      break;
  }

 
  if (message) {
    await conn.sendMessage(m.chat, {
      image: img,
      caption: message,
      mentions: [userJid],
    });
  }
}