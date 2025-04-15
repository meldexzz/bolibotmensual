/* Imagen Search By WillZek 
- Free Codes Titan 
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S
*/

import fetch from 'node-fetch';

let handler = async(m, { conn, text, usedPrefix, command }) => {

if (!text) return m.reply('> 𝘐𝘯𝘨𝘳𝘦𝘴𝘢 𝘶𝘯 𝘵𝘦𝘹𝘵𝘰 𝘱𝘢𝘳𝘢 𝘣𝘶𝘴𝘤𝘢𝘳 𝘶𝘯𝘢 𝘪𝘮𝘢𝘨𝘦𝘯.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘨𝘰𝘰𝘨𝘭𝘦 𝘣𝘰𝘭𝘪𝘭𝘭𝘰𝘴.🥖');

try {
let api = `https://api.dorratz.com/v3/ai-image?prompt=${text}`;
let response = await fetch(api);
let json = await response.json();
let res = json.data;

m.react('🕑');
let txt = `> 𝘙𝘦𝘴𝘶𝘭𝘵𝘢𝘥𝘰 𝘥𝘦: ${text}`;
let img = res.image_link;
let link = img;

await conn.sendMessage(m.chat, { image: { url: link }, caption: txt }, {quoted: fkontak});   
m.react('✅');

} catch (e) {
m.reply(`Error: ${e.message}`);
m.react('✖️');
 }
}

handler.command = ['imagen', 'image'];

export default handler;
