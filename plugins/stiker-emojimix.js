import MessageType from '@whiskeysockets/baileys'
import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'
import fs from "fs"
const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
fetch(url, options)
.then(response => response.json())
.then(json => {
resolve(json)
})
.catch((err) => {
reject(err)
})})
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (!args[0]) return m.reply(`> ¿𝘘𝘶𝘪𝘦𝘳𝘦𝘴 𝘤𝘳𝘦𝘢𝘳 𝘶𝘯 𝘦𝘮𝘰𝘫𝘪, 𝘢 𝘣𝘢𝘴𝘦 𝘥𝘦 𝘥𝘰𝘴?. 𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘦𝘮𝘰𝘫𝘪𝘮𝘪𝘹 😀 + 😉.`)
let [emoji, emoji2] = text.split`+`
let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji)}_${encodeURIComponent(emoji2)}`)
for (let res of anu.results) {
let stiker = await sticker(false, res.url, global.packname, global.author)
conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
}}
handler.help = ['emojimix *<emoji+emoji>*']
handler.tags = ['sticker']
handler.command = ['emojimix'] 

export default handler
