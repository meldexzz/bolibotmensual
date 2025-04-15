
// YAHOO SEARCH ✨

import fetch from 'node-fetch';

let MF = async(m, { conn, args }) => {

if (!args[0]) return conn.reply(m.chat, '> 𝘐𝘯𝘨𝘳𝘦𝘴𝘦 𝘶𝘯 𝘵𝘦𝘹𝘵𝘰 𝘱𝘢𝘳𝘢 𝘣𝘶𝘴𝘤𝘢𝘳 𝘦𝘯 𝘺𝘢𝘩𝘰𝘰!.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘺𝘢𝘩𝘰𝘰𝘴𝘦𝘢𝘳𝘤𝘩 𝘣𝘰𝘭𝘪𝘭𝘭𝘰𝘴.🥖', m);

try {
let api = await (await fetch(`https://archive-ui.tanakadomp.biz.id/search/yahoosearch?q=${args[0]}`)).json();

let moon = `> 𝘠𝘈𝘏𝘖𝘖! / 𝘉𝘖𝘓𝘐𝘓𝘓𝘖𝘉𝘖𝘛.🥖.`
for (let i = 0; i < (5 <= api.result.length ? 5 : api.result.length); i++) {

let force = api.result[i];

moon += `\n\n`
moon += `> 𝘛𝘪𝘵𝘶𝘭𝘰: ${force.title}\n`
moon += `> 𝘌𝘯𝘭𝘢𝘤𝘦: ${force.link}\n\n`
moon += `> 𝘌𝘯𝘭𝘢𝘤𝘦: ${force.snippet}\n`
moon += ``
}

conn.sendMessage(m.chat, { text: moon }, { quoted: m });

} catch (e) {
m.reply(`𝘌𝘳𝘳𝘰𝘳 𝘦𝘯 𝘭𝘢 𝘈𝘗𝘐.🥖`);
m.react('✖️');
}}

MF.command = ['yahoosearch', 'yahoos'];

export default MF;
