
import { WAMessageStubType } from '@whiskeysockets/baileys';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

// Obtener el nombre del usuario
async function getUserName(conn, jid) {
  let name = await conn.getName(jid);
  if (!name) {
    const contact = await conn.fetchContact(jid);
    name = contact?.notify || contact?.name || jid.split('@')[0];
  }
  return name;
}

// Obtener el icono del grupo
function getGroupIcon(m) {
  const dirPath = path.resolve('./groupIcons');
  const groupIconPath = path.join(dirPath, `${m.chat}.jpg`);

  if (fs.existsSync(groupIconPath)) {
    return fs.readFileSync(groupIconPath);
  }
  return null;
}

// Obtener la imagen de perfil del usuario
async function getUserProfilePicture(conn, jid) {
  try {
    const ppUrl = await conn.profilePictureUrl(jid, 'image');
    if (ppUrl) {
      return await (await fetch(ppUrl)).buffer();
    }
  } catch (e) {}
  return null;
}

// Función principal para manejar eventos
export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  // Identificar al usuario afectado
  let who = m.messageStubParameters[0];
  let taguser = `@${who.split('@')[0]}`;
  let chat = global.db.data.chats[m.chat];

  const userJid = m.messageStubParameters[0];
  let img = await getUserProfilePicture(conn, userJid);

  // Priorizar la imagen de perfil del usuario, icono del grupo, o imagen predeterminada
  if (!img) {
    img = getGroupIcon(m);
  }
  if (!img) {
    img = fs.readFileSync('./default-image.jpg'); // Asegúrate de tener esta imagen
  }

  // Generar el mensaje según el tipo de evento
  let message = '';
  switch (m.messageStubType) {
    case WAMessageStubType.GROUP_PARTICIPANT_ADD: // Evento: Se añade un usuario
      message = chat.sWelcome
        ? chat.sWelcome.replace('@user', taguser).replace('@subject', groupMetadata.subject)
        : `_🙂 Hola *${taguser}*, bienvenid@ al grupo *${groupMetadata.subject}*._`;
      break;
    case WAMessageStubType.GROUP_PARTICIPANT_REMOVE: // Evento: Usuario es removido
      message = chat.sBye
        ? chat.sBye.replace('@user', taguser).replace('@subject', groupMetadata.subject)
        : `_☠️ *${taguser}* fue expulsad@ del grupo._`;
      break;
    case WAMessageStubType.GROUP_PARTICIPANT_LEAVE: // Evento: Usuario abandona el grupo
      message = chat.sBye
        ? chat.sBye.replace('@user', taguser).replace('@subject', groupMetadata.subject)
        : `_👋 *${taguser}* ha abandonado el grupo._`;
      break;
  }

  // Enviar el mensaje con la imagen adecuada
  if (message) {
    await conn.sendMessage(m.chat, {
      image: img,
      caption: message,
      mentions: [userJid],
    });
  }
}