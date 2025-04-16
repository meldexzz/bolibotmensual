import { toAudio } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
if (!/video|audio/.test(mime)) throw `> 𝘙𝘦𝘴𝘱𝘰𝘯𝘥𝘦 𝘢𝘭 "𝘝𝘪𝘥𝘦𝘰" 𝘰 "𝘕𝘰𝘵𝘢 𝘥𝘦 𝘝𝘰𝘻" 𝘲𝘶𝘦 𝘥𝘦𝘴𝘦𝘢 𝘤𝘰𝘯𝘷𝘦𝘳𝘵𝘪𝘳 𝘢 𝘮𝘱3.🥖`
try {
let media = await q.download?.()
if (!media) return null
let audio = await toAudio(media, 'mp4')
if (!audio.data) return null
await conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, null, { mimetype: 'audio/mp4' })
} catch {
}}
handler.help = ['tomp3']
handler.tags = ['tools']
handler.command = ['tomp3', 'toaudio'] 


export default handler
