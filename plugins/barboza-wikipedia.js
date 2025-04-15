import axios from 'axios';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
async function wikipedia(querry) {
try {
const link = await axios.get(`https://es.wikipedia.org/wiki/${querry}`);
const $ = cheerio.load(link.data);
const judul = $('#firstHeading').text().trim();
const thumb = $('#mw-content-text').find('div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img').attr('src') || `//i.ibb.co/nzqPBpC/http-error-404-not-found.png`;
const isi = [];
$('#mw-content-text > div.mw-parser-output').each(function(rayy, Ra) {
const penjelasan = $(Ra).find('p').text().trim();
isi.push(penjelasan)});
for (const i of isi) {
const data = {status: link.status,
result: {judul: judul,
thumb: 'https:' + thumb,
isi: i}};
return data;
}} catch (err) {
const notFond = {status: link.status,
Pesan: eror};
return notFond;
}}
const handler = async (m, {conn, text, usedPrefix, command}) => {
if (!text) throw `> 𝘐𝘯𝘨𝘳𝘦𝘴𝘢 𝘭𝘢 𝘱𝘢𝘭𝘢𝘣𝘳𝘢 𝘤𝘭𝘢𝘷𝘦 𝘥𝘦 𝘭𝘰 𝘲𝘶𝘦 𝘥𝘦𝘴𝘦𝘢𝘴 𝘣𝘶𝘴𝘤𝘢𝘳.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘸𝘪𝘬𝘪𝘱𝘦𝘥𝘪𝘢 𝘣𝘰𝘭𝘪𝘭𝘭𝘰𝘴.🥖`;
wikipedia(`${text}`).then((res) => {
m.reply(`𝘈𝘲𝘶í 𝘵𝘪𝘦𝘯𝘦𝘴 𝘭𝘢 𝘪𝘯𝘧𝘰𝘳𝘮𝘢𝘤𝘪ó𝘯 𝘲𝘶𝘦 𝘦𝘯𝘤𝘰𝘯𝘵𝘳é.\n\n` + res.result.isi)}).catch(() => {
m.reply('> 𝘕𝘖 𝘴𝘦 𝘦𝘯𝘤𝘰𝘯𝘵𝘳𝘢𝘳𝘰𝘯 𝘳𝘦𝘴𝘶𝘭𝘵𝘢𝘥𝘰𝘴, 𝘱𝘳𝘶𝘦𝘣𝘢 𝘤𝘰𝘯 𝘦𝘴𝘤𝘳𝘪𝘣𝘪𝘳 𝘤𝘰𝘳𝘳𝘦𝘤𝘵𝘢𝘮𝘦𝘯𝘵𝘦 𝘦𝘭 𝘤𝘰𝘮𝘢𝘯𝘥𝘰.');
});
};
handler.help = ['wikipedia'].map((v) => v + ' <apa>');
handler.tags = ['buscadores'];
handler.command = /^(wiki|wikipedia)$/i;
export default handler;
