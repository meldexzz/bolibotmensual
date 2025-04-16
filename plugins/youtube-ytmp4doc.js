/* By WillZek
- https:// github.com/WillZek 
*/

import fetch from 'node-fetch';
import fg from 'senna-fg';

let handler = async (m, { conn, args, command }) => {

if (!args[0]) return m.reply(`> 𝘐𝘯𝘨𝘳𝘦𝘴𝘢 𝘶𝘯 𝘭𝘪𝘯𝘬 𝘥𝘦 𝘺𝘰𝘶𝘵𝘶𝘣𝘦.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘺𝘵𝘮𝘱3𝘥𝘰𝘤 𝘩𝘵𝘵𝘱𝘴://𝘺𝘰𝘶𝘵𝘶.𝘣𝘦/-0𝘝𝘙𝘳𝘯𝘑𝘹7𝘶8?𝘴𝘪=𝘦𝘜8𝘵8𝘜9𝘵8𝘳𝘷2𝘊𝘣𝘚7🥖`);

let pene = await(await fetch(`https://delirius-apiofc.vercel.app/download/ytmp4?url=${args[0]}`)).json();

let texto = `> 𝗥𝗲𝘀𝘂𝗹𝘁𝗮𝗱𝗼 𝗗𝗲 ${pene.data.title}\n\n> Autor:* ${pene.data.author}\n> Duración:* ${pene.data.duration}\n> Comentarios:* ${pene.data.comments}\n> Vistas:* ${pene.data.views}\n> ${dev}`

m.react('🕒')
conn.sendMessage(m.chat, { image: { url: pene.data.image }, caption: texto }, { quoted: m });
m.react('✅');

if (command == 'ytmp3doc' || command == 'mp3doc' || command == 'ytadoc') {
let api = await(await fetch(`https://api.neoxr.eu/api/youtube?url=${args[0]}&type=audio&quality=128kbps&apikey=GataDios`)).json();

if (!api?.data.url) return m.reply('No Se  Encontraron Resultados');

await conn.sendMessage(m.chat, { document: { url: api.data.url }, mimetype: 'audio/mpeg', fileName: `${pene.data.title}.mp3` }, { quoted: m });
 }

if (command == 'ytmp4doc' || command == 'mp4doc' || command == 'ytvdoc') {
let video = await (await fetch(`https://api.agungny.my.id/api/youtube-video?url=${args[0]}`)).json();

// let link = video?.result.result.download;

let data = await fg.ytmp4(args[0]);
let url = data.dl_url;

if (!url) return m.reply('No Hubo Resultados');

await conn.sendMessage(m.chat, { document: { url: url }, fileName: `${pene.data.title}.mp4`, caption: `> ${wm}`, mimetype: 'video/mp4' }, { quoted: m })    
   }
}

handler.help = ['ytmp3doc', 'ytmp4doc'];
handler.tag = ['descargas'];
handler.command = ['ytmp3doc', 'mp3doc', 'ytmp4doc', 'mp4doc', 'ytadoc', 'ytvdoc'];

export default handler;
