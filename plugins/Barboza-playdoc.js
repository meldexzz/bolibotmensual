// By WillZek >> https://github.com/WillZek

import fetch from 'node-fetch';

let handler = async(m, { conn, usedPrefix, command, text }) => {

if (!text) return m.reply(`> 𝘐𝘯𝘨𝘳𝘦𝘴𝘢 𝘶𝘯 𝘵𝘦𝘹𝘵𝘰 𝘱𝘢𝘳𝘢 𝘣𝘶𝘴𝘤𝘢𝘳 𝘦𝘯 𝘠𝘰𝘶𝘛𝘶𝘣𝘦.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘱𝘭𝘢𝘺𝘥𝘰𝘤 𝘣𝘰𝘭𝘪𝘭𝘭𝘰𝘴 𝘣𝘦𝘣𝘦𝘴. 🥖 `);

try {
let api = await (await fetch(`https://delirius-apiofc.vercel.app/search/ytsearch?q=${text}`)).json();

let results = api.data[0];

let txt = `> 𝘛𝘪𝘵𝘶𝘭𝘰: ${results.title}\n> 𝘋𝘶𝘳𝘢𝘤𝘪𝘰𝘯: ${results.duration}\n> 𝘓𝘪𝘯𝘬: ${results.url}\n> 𝘗𝘶𝘣𝘭𝘪𝘤𝘢𝘥𝘰: ${results.publishedAt}`;

let img = results.image;

conn.sendMessage(m.chat, { image: { url: img }, caption: txt }, { quoted: m });

let api2 = await(await fetch(`https://api.vreden.my.id/api/ytmp3?url=${results.url}`)).json();

// if (!api2?.result?.download.url) return m.reply('No Se  Encontraron Resultados');

await conn.sendMessage(m.chat, { document: { url: api2.result.download.url }, mimetype: 'audio/mpeg', fileName: `${results.title}.mp3` }, { quoted: m });

} catch (e) {
m.reply(`Error: ${e.message}`);
m.react('✖️');
  }
}

handler.command = ['playdoc', 'pdoc'];

export default handler
