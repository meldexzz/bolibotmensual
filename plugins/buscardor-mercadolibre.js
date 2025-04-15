import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { conn, text, usedPrefix, command }) => {
try {
if (!text) throw conn.reply(m.chat, `𝘌𝘴𝘤𝘳𝘪𝘣𝘦 𝘭𝘰 𝘲𝘶𝘦 𝘥𝘦𝘴𝘦𝘢𝘴 𝘣𝘶𝘴𝘤𝘢𝘳 𝘦𝘯 𝘮𝘦𝘳𝘤𝘢𝘥𝘰 𝘭𝘪𝘣𝘳𝘦.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘔𝘦𝘳𝘤𝘢𝘥𝘰𝘓𝘪𝘣𝘳𝘦 𝘕𝘶𝘵𝘦𝘭𝘭𝘢 𝘱𝘢𝘳𝘢 𝘣𝘰𝘭𝘪𝘭𝘭𝘰.🥖`, m);
let res = await mercado(text);
let libre = '> 𝘔𝘦𝘳𝘤𝘢𝘥𝘰 𝘓𝘪𝘣𝘳𝘦 / 𝘉𝘖𝘓𝘐𝘓𝘓𝘖𝘉𝘖𝘛.🥖`\n\n';
const limit = 15;
for (let i = 0; i < limit && i < res.length; i++) {
let link = res[i].link.length > 30 ? res[i].link.substring(0, 30) + '...' : res[i].link;
libre += `> 𝘕𝘰𝘮𝘣𝘳𝘦: ${res[i].title}\n> 𝘌𝘴𝘵𝘢𝘥𝘰: ${res[i].state}\n> 𝘓𝘪𝘯𝘬: ${res[i].link}\n`;
libre += '\n' + '••••••••••••••••••••••••' + '\n';
}
conn.reply(m.chat, libre, m)
} catch (error) {
}};
handler.help = ['mercadolibre <búsqueda>']
handler.tags = ['buscador']
handler.command = ['mercadolibre']
handler.estrellas = 2
export default handler;

async function mercado(query) {
try {
const url = `https://listado.mercadolibre.com.pe/${query}`;
const response = await axios.get(url);
const html = response.data;
const $ = cheerio.load(html);
const results = $('.ui-search-layout__item').map((i, element) => {
const title = $(element).find('.ui-search-item__title').text();
const state = $(element).find('.ui-search-item__group__element').last().text().trim();
const link = $(element).find('a').attr('href');
return {
title,
state,
link
};
}).get();
return results;
} catch (error) {
}}
