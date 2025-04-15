import translate from '@vitalets/google-translate-api';
import axios from 'axios';
import fetch from 'node-fetch';
const handler = (m) => m;

handler.before = async (m) => {
  const chat = global.db.data.chats[m.chat];
  if (chat.simi) {
    if (/^.*false|disnable|(turn)?off|0/i.test(m.text)) return;
    let textodem = m.text;
    if (m.text.includes('serbot') || m.text.includes('bots')|| m.text.includes('jadibot')|| m.text.includes('menu')|| m.text.includes('play')|| m.text.includes('play2') || m.text.includes('playdoc') || m.text.includes('tiktok') || m.text.includes('facebook') || /* m.text.includes('instalarbot') || */ m.text.includes('menu2') ||  m.text.includes('infobot') || m.text.includes('estado') ||  m.text.includes('ping') ||   m.text.includes('sc') ||  m.text.includes('sticker') ||  m.text.includes('s') || m.text.includes('textbot') ||  m.text.includes('qc')) return
    try {
      const ressimi = await simitalk(textodem);
     // await m.conn.sendMessage(m.chat, { text: ressimi.resultado.simsimi }, { quoted: m });
        await conn.reply(m.chat, ressimi.resultado.simsimi, m)
    } catch {
      throw '❌ *Ocurrió un error*';
    }
    return !0;
  }
  return true;
};
export default handler;

async function simitalk(ask, apikeyyy = "iJ6FxuA9vxlvz5cKQCt3", language = "es") {
    if (!ask) return { status: false, resultado: { msg: "> 𝘐𝘯𝘨𝘳𝘦𝘴𝘢 𝘶𝘯 𝘵𝘦𝘹𝘵𝘰 𝘱𝘢𝘳𝘢 𝘩𝘢𝘣𝘭𝘢𝘳 𝘤𝘰𝘯 𝘚𝘐𝘔𝘐.🥖" }};
    try {
        const response1 = await axios.get(`https://deliriussapi-oficial.vercel.app/tools/simi?text=${encodeURIComponent(ask)}`);
        const trad1 = await translate(`${response1.data.data.message}`, {to: language, autoCorrect: true});
        if (trad1.text == 'indefinida' || response1 == '' || !response1.data) trad1 = XD // Se usa "XD" para causar error y usar otra opción.  
        return { status: true, resultado: { simsimi: trad1.text }};        
    } catch {
        try {
            const response2 = await axios.get(`https://anbusec.xyz/api/v1/simitalk?apikey=${apikeyyy}&ask=${ask}&lc=${language}`);
            return { status: true, resultado: { simsimi: response2.data.message }};       
        } catch (error2) {
            return { status: false, resultado: { msg: "𝘛𝘰𝘥𝘢𝘴 𝘭𝘢𝘴 𝘈𝘗𝘐𝘴 𝘧𝘢𝘭𝘭𝘢𝘳𝘰𝘯, 𝘪𝘯𝘵𝘦𝘯𝘵𝘢 𝘥𝘦 𝘯𝘶𝘦𝘷𝘰. 🥖", error: error2.message }};
        }
    }
}
