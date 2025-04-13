
let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(command);
  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.sender];
  let bot = global.db.data.settings[conn.user.jid] || {};
  let type = (args[0] || '').toLowerCase();
  let isAll = false, isUser = false;

  switch (type) {
    case 'welcome':
    case 'bv':
    case 'bienvenida':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.bienvenida = isEnable;
      break;

    case 'autoread':
    case 'autoleer':
      isAll = true;
      if (!isROwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      global.opts['autoread'] = isEnable;
      break;

    case 'antispam':
      isAll = true;
      if (!isOwner) {
        global.dfail('owner', m, conn);
        throw false;
      }
      bot.antiSpam = isEnable;
      break;

    case 'audios':
    case 'audiosbot':
    case 'botaudios':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.audios = isEnable;
      break;

    case 'detect':
    case 'avisos':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.detect = isEnable;
      break;

    case 'jadibotmd':
    case 'serbot':
    case 'subbots':
      isAll = true;
      if (!isOwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      bot.jadibotmd = isEnable;
      break;

    case 'restrict':
    case 'restringir':
      isAll = true;
      if (!isOwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      bot.restrict = isEnable;
      break;

    case 'document':
    case 'documento':
      isUser = true;
      user.useDocument = isEnable;
      break;

    case 'antilink':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.antiLink = isEnable;
      break;

    case 'antibot2':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.antiBot2 = isEnable;
      break;

    case 'modoadmin':
    case 'soloadmin':
    case 'modeadmin':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.modoadmin = isEnable;
      break;

    case 'antiprivado':
      // Ahora cualquiera puede activarlo o desactivarlo
      bot.antiPrivate = isEnable;
      break;

    case 'nsfw':
    case 'modohorny':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.nsfw = isEnable;
      break;

    case 'antiarabes':
    case 'antinegros':
    case 'antifakes':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.onlyLatinos = isEnable;
      break;

    default:
      if (!/[01]/.test(command)) return m.reply(`
> 🧑‍💻 𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙐𝙉𝘼 𝙊𝙋𝘾𝙄Ó𝙉 𝙋𝘼𝙍𝘼 𝘼𝘾𝙏𝙄𝙑𝘼𝙍 𝙊 𝘿𝙀𝙎𝘼𝘾𝙏𝙄𝙑𝘼𝙍*

🔖 𝙇𝙄𝙎𝙏𝘼 𝘿𝙀 𝙊𝙋𝘾𝙄𝙊𝙉𝙀𝙎
*𝘛𝘪𝘱𝘰 :* 𝘸𝘦𝘭𝘤𝘰𝘮𝘦
*𝘋𝘦𝘴𝘤𝘳𝘪𝘱𝘤𝘪ó𝘯 :* 𝘋𝘦𝘴/𝘈𝘤𝘵𝘪𝘷𝘢 𝘭𝘢 *𝘉𝘪𝘦𝘯𝘷𝘦𝘯𝘪𝘥𝘢* 𝘺 *𝘋𝘦𝘴𝘱𝘦𝘥𝘪𝘥𝘢* 𝘱𝘢𝘳𝘢 𝘎𝘳𝘶𝘱𝘰𝘴

*𝘛𝘪𝘱𝘰 :* 𝘯𝘴𝘧𝘸 
*𝘋𝘦𝘴𝘤𝘳𝘪𝘱𝘤𝘪ó𝘯 :* 𝘋𝘦𝘴/𝘈𝘤𝘵𝘪𝘷𝘢 𝘭𝘰𝘴 𝘤𝘰𝘮𝘢𝘯𝘥𝘰𝘴 *𝘕𝘚𝘍𝘞* 𝘱𝘢𝘳𝘢 𝘎𝘳𝘶𝘱𝘰𝘴

*𝘛𝘪𝘱𝘰 :* 𝘢𝘯𝘵𝘪𝘢𝘳𝘢𝘣𝘦𝘴 
*𝘋𝘦𝘴𝘤𝘳𝘪𝘱𝘤𝘪ó𝘯 :* 𝘋𝘦𝘴/𝘈𝘤𝘵𝘪𝘷𝘢 𝘦𝘭 *𝘈𝘯𝘵𝘪𝘈𝘳𝘢𝘣𝘦𝘴* 𝘱𝘢𝘳𝘢 𝘎𝘳𝘶𝘱𝘰𝘴

*𝘛𝘪𝘱𝘰 :* 𝘢𝘯𝘵𝘪𝘭𝘪𝘯𝘬 
*𝘋𝘦𝘴𝘤𝘳𝘪𝘱𝘤𝘪ó𝘯 :* 𝘋𝘦𝘴/𝘈𝘤𝘵𝘪𝘷𝘢 𝘦𝘭 *𝘈𝘯𝘵𝘪𝘓𝘪𝘯𝘬* 𝘱𝘢𝘳𝘢 𝘎𝘳𝘶𝘱𝘰𝘴

*𝘛𝘪𝘱𝘰 :* 𝘢𝘶𝘵𝘰𝘳𝘦𝘢𝘥 
*𝘋𝘦𝘴𝘤𝘳𝘪𝘱𝘤𝘪ó𝘯 :* 𝘋𝘦𝘴/𝘈𝘤𝘵𝘪𝘷𝘢 𝘦𝘭 *𝘈𝘶𝘵𝘰𝘙𝘦𝘢𝘥* 𝘱𝘢𝘳𝘢 𝘦𝘭 𝘉𝘰𝘵

*𝘛𝘪𝘱𝘰 :* 𝘳𝘦𝘴𝘵𝘳𝘪𝘤𝘵
*𝘋𝘦𝘴𝘤𝘳𝘪𝘱𝘵𝘪𝘰𝘯 :* 𝘋𝘦𝘴/𝘈𝘤𝘵𝘪𝘷𝘢 𝘦𝘭 *𝘙𝘦𝘴𝘵𝘳𝘪𝘤𝘵*
𝘱𝘢𝘳𝘢 𝘦𝘭 𝘣𝘰𝘵

*𝘛𝘪𝘱𝘰 :* 𝘥𝘰𝘤𝘶𝘮𝘦𝘯𝘵 
*𝘋𝘦𝘴𝘤𝘳𝘪𝘱𝘤𝘪ó𝘯 :* 𝘋𝘦𝘴/𝘈𝘤𝘵𝘪𝘷𝘢 𝘭𝘢 *𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢 𝘌𝘯 𝘋𝘰𝘤𝘶𝘮𝘦𝘯𝘵𝘰𝘴* 𝘱𝘢𝘳𝘢 𝘦𝘭 𝘜𝘴𝘶𝘢𝘳𝘪𝘰

*𝘛𝘪𝘱𝘰 :* 𝘮𝘰𝘥𝘰𝘢𝘥𝘮𝘪𝘯
*𝘋𝘦𝘴𝘤𝘳𝘪𝘱𝘤𝘪ó𝘯 :* 𝘋𝘦𝘴/𝘈𝘤𝘵𝘪𝘷𝘢 𝘭𝘢 *𝘮𝘰𝘥𝘰𝘢𝘥𝘮𝘪𝘯* 𝘱𝘢𝘳𝘢 𝘦𝘭 𝘜𝘴𝘶𝘢𝘳𝘪𝘰

*𝘛𝘪𝘱𝘰 :* 𝘢𝘶𝘥𝘪𝘰𝘴
*𝘋𝘦𝘴𝘤𝘳𝘪𝘱𝘤𝘪ó𝘯 :* 𝘋𝘦𝘴/𝘈𝘤𝘵𝘪𝘷𝘢 𝘭𝘢 *𝘢𝘶𝘥𝘪𝘰𝘴* 𝘱𝘢𝘳𝘢 𝘦𝘭 𝘜𝘴𝘶𝘢𝘳𝘪𝘰

*𝘛𝘪𝘱𝘰 :* 𝘴𝘶𝘣𝘣𝘰𝘵𝘴
*𝘋𝘦𝘴𝘤𝘳𝘪𝘱𝘤𝘪ó𝘯 :* 𝘋𝘦𝘴/𝘈𝘤𝘵𝘪𝘷𝘢 𝘭𝘢 *𝘴𝘶𝘣𝘣𝘰𝘵𝘴* 𝘱𝘢𝘳𝘢 𝘦𝘭 𝘜𝘴𝘶𝘢𝘳𝘪𝘰

*• Ejemplo:*
*- ${usedPrefix + command}* welcome
`.trim())
      throw false
  }
  m.reply(` 𝘼𝙏𝙀𝙉𝘾𝙄𝙊𝙉.🥖 \n> 💎 𝘾𝙤𝙢𝙖𝙣𝙙𝙤: *${type}*\n> 👤 𝙁𝙪𝙚: *${isEnable ? '𝘈𝘤𝘵𝘪𝘷𝘢𝘥𝘰' : '𝘋𝘦𝘴𝘢𝘤𝘵𝘪𝘷𝘢𝘥𝘰'}*\n> ${isAll ? '*𝘌𝘯 𝘦𝘴𝘵𝘦 𝘉𝘰𝘵*' : isUser ? '' : '*𝘌𝘯 𝘦𝘴𝘵𝘦 𝘊𝘩𝘢𝘵*'}`)
}

handler.help = ['enable', 'disable', 'on', 'off']
handler.tags = ['nable']
handler.command = /^(enable|disable|on|off|1|0)$/i

export default handler
