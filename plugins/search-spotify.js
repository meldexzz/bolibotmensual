/*
- By WillZek 
- https://github.com/WillZek
- 🌃 Moon Force Team
- https://whatsapp.com/channel/0029Vb4Dnh611ulGUbu7Xg1q
*/

// SPOTIFY - DOWNLOADER 🌟

import fetch from 'node-fetch';

let MF = async (m, { conn, args, command, usedPrefix }) => {

if (!args[0]) return m.reply(`> 𝘐𝘯𝘨𝘳𝘦𝘴𝘦 𝘶𝘯 𝘭𝘪𝘯𝘬 𝘥𝘦 𝘚𝘱𝘰𝘵𝘪𝘧𝘺.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘴𝘱𝘰𝘵𝘪𝘧𝘺𝘥𝘭 𝘩𝘵𝘵𝘱𝘴://𝘰𝘱𝘦𝘯.𝘴𝘱𝘰𝘵𝘪𝘧𝘺.𝘤𝘰𝘮/𝘵𝘳𝘢𝘤𝘬/0𝘫𝘏15𝘠9𝘻2𝘌𝘱𝘸𝘛𝘞𝘙𝘘𝘐11𝘹𝘣𝘫.🥖`);

let api = await (await fetch(`https://archive-ui.tanakadomp.biz.id/download/spotify?url=${args[0]}`)).json();

let force = api.result.data;
let imagen = force.image;

let moon = `> 𝘛𝘪𝘵𝘶𝘭𝘰: ${force.title}\n\n> 𝘗𝘰𝘸𝘦𝘳 𝘉𝘺 𝘉𝘰𝘭𝘪𝘭𝘭𝘰𝘉𝘰𝘵.🥖`;

conn.sendFile(m.chat, imagen, 'MoonForce.jpg', moon, m, null);

conn.sendMessage(m.chat, { audio: { url: force.download }, mimetype: 'audio/mpeg' }, { quoted: m });
}

MF.command = ['spotifydl', 'spdl'];

export default MF;
