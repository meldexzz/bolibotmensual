import { sticker } from '../lib/sticker.js';
//import uploadFile from '../lib/uploadFile.js';
//import uploadImage from '../lib/uploadImage.js';
//import { webp2png } from '../lib/webp2mp4.js';

const redes = 'https://tu-enlace-o-dominio.com'; // Define la URL aquí
const icons = null; // Si "icons" es necesario, define su valor o cámbialo según corresponda

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false;
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime)) 
        if ((q.msg || q).seconds > 8) 
          return m.reply(`𝘓𝘪𝘮𝘪𝘵𝘦 𝘮𝘢𝘹𝘪𝘮𝘰 𝘥𝘦 𝘷𝘪𝘥𝘦𝘰: 8 𝘴𝘦𝘨𝘶𝘯𝘥𝘰𝘴. 🥖`);

      let img = await q.download?.();
      if (!img) 
        return conn.reply(m.chat, `¿𝘠 𝘦𝘭 𝘷𝘪𝘥𝘦𝘰? 𝘐𝘯𝘵𝘦𝘯𝘵𝘢 𝘦𝘯𝘷𝘪𝘢𝘳 𝘱𝘳𝘪𝘮𝘦𝘳𝘰 𝘪𝘮𝘢𝘨𝘦𝘯/𝘷𝘪𝘥𝘦𝘰/𝘨𝘪𝘧 𝘺 𝘭𝘶𝘦𝘨𝘰 𝘳𝘦𝘴𝘱𝘰𝘯𝘥𝘦 𝘤𝘰𝘯 𝘦𝘭 𝘤𝘰𝘮𝘢𝘯𝘥𝘰. 🥖`, m);

      let out;
      try {
        stiker = await sticker(img, false, global.packname, global.author);
      } catch (e) {
        console.error(e);
      } finally {
        if (!stiker) {
          if (/webp/g.test(mime)) out = await webp2png(img);
          else if (/image/g.test(mime)) out = await uploadImage(img);
          else if (/video/g.test(mime)) out = await uploadFile(img);
          if (typeof out !== 'string') out = await uploadImage(img);
          stiker = await sticker(false, out, global.packname, global.author);
        }
      }
    } else if (args[0]) {
      if (isUrl(args[0])) 
        stiker = await sticker(false, args[0], global.packname, global.author);
      else 
        return m.reply(`💫 El URL es incorrecto`);
    }
  } catch (e) {
    console.error(e);
    if (!stiker) stiker = e;
  } finally {
    if (stiker) {
      conn.sendFile(
        m.chat, 
        stiker, 
        'sticker.webp', 
        '', 
        m, 
        true, 
        { 
          contextInfo: { 
            'forwardingScore': 200, 
            'isForwarded': false, 
            externalAdReply: { 
              showAdAttribution: false, 
              title: global.packname, 
              body: `botBolillo - Ai ☃️`, 
              mediaType: 2, 
              sourceUrl: redes, // Usamos la variable definida
              thumbnail: icons // Asegúrate de que "icons" tenga un valor definido
            }
          }
        }, 
        { quoted: m }
      );
    } else {
      return conn.reply(m.chat, '¿𝘠 𝘦𝘭 𝘷𝘪𝘥𝘦𝘰? 𝘐𝘯𝘵𝘦𝘯𝘵𝘢 𝘦𝘯𝘷𝘪𝘢𝘳 𝘱𝘳𝘪𝘮𝘦𝘳𝘰 𝘪𝘮𝘢𝘨𝘦𝘯/𝘷𝘪𝘥𝘦𝘰/𝘨𝘪𝘧 𝘺 𝘭𝘶𝘦𝘨𝘰 𝘳𝘦𝘴𝘱𝘰𝘯𝘥𝘦 𝘤𝘰𝘯 𝘦𝘭 𝘤𝘰𝘮𝘢𝘯𝘥𝘰. 🥖', m);
    }
  }
};

handler.help = ['stiker <img>', 'sticker <url>'];
handler.tags = ['sticker'];
handler.command = ['s', 'sticker', 'stiker'];

export default handler;

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'));
};
