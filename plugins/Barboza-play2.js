import fetch from "node-fetch"
import yts from 'yt-search'
import axios from "axios"

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `> 𝘐𝘯𝘨𝘳𝘦𝘴𝘢 𝘦𝘭 𝘯𝘰𝘮𝘣𝘳𝘦 𝘥𝘦 𝘭𝘢 𝘤𝘢𝘯𝘤𝘪ó𝘯.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘱𝘭𝘢𝘺 𝘣𝘰𝘭𝘪𝘭𝘭𝘰𝘴 𝘳𝘦𝘣𝘦𝘭𝘥𝘦𝘴.🥖`, m)
    }

    const search = await yts(text)
    if (!search.all || search.all.length === 0) {
      return m.reply('𝘕𝘰 𝘴𝘦 𝘦𝘯𝘤𝘰𝘯𝘵𝘳𝘢𝘳𝘰𝘯 𝘳𝘦𝘴𝘶𝘭𝘵𝘢𝘥𝘰𝘴.🥖')
    }

    const videoInfo = search.all[0]
    if (!videoInfo) {
      return m.reply('𝘕𝘰 𝘴𝘦 𝘦𝘯𝘤𝘰𝘯𝘵𝘳𝘢𝘳𝘰𝘯 𝘳𝘦𝘴𝘶𝘭𝘵𝘢𝘥𝘰𝘴.🥖')
    }

    const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo

    if (!title || !thumbnail || !timestamp || !views || !ago || !url || !author) {
      return m.reply('𝘐𝘯𝘧𝘰𝘳𝘮𝘢𝘤𝘪ó𝘯 𝘪𝘯𝘤𝘰𝘳𝘳𝘦𝘤𝘵𝘢 𝘥𝘦𝘭 𝘷𝘪𝘥𝘦𝘰.🥖')
    }

    const vistas = formatViews(views)
    const canal = author.name ? author.name : 'Desconocido'
    const infoMessage = `𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙣𝙙𝙤 *<${title || '𝘿𝙚𝙨𝙘𝙤𝙣𝙤𝙘𝙞𝙙𝙤'}>*\n\n>  𝘊𝘢𝘯𝘢𝘭 » *${canal}*\n> 𝘝𝘪𝘴𝘵𝘢𝘴 » *${vistas || '𝘿𝙚𝙨𝙘𝙤𝙣𝙤𝙘𝙞𝙙𝙤'}*\n> 𝘋𝘶𝘳𝘢𝘤𝘪ó𝘯 » *${timestamp || '𝘿𝙚𝙨𝙘𝙤𝙣𝙤𝙘𝙞𝙙𝙤'}*\n> 𝘗𝘶𝘣𝘭𝘪𝘤𝘢𝘤𝘪ó𝘯 » *${ago || '𝘿𝙚𝙨𝙘𝙤𝙣𝙤𝙘𝙞𝙙𝙤'}*\n> 𝘓𝘪𝘯𝘬 » ${url}`

    const thumb = (await conn.getFile(thumbnail))?.data

    const JT = {
      contextInfo: {
        externalAdReply: {
          title: botname,
          body: dev,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: false,
        },
      },
    }

    await conn.reply(m.chat, infoMessage, m, JT)

    if (command === 'play' || command === 'yta' || command === 'ytmp3') {
      try {
        const api = await (await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`)).json()
        const resulta = api.result
        const result = resulta.download.url

        if (!result) throw new Error('𝘌𝘯𝘭𝘢𝘤𝘦 𝘯𝘰 𝘨𝘦𝘯𝘦𝘳𝘢𝘥𝘰 𝘤𝘰𝘳𝘳𝘦𝘤𝘵𝘢𝘮𝘦𝘯𝘵𝘦.🥖')

        await conn.sendMessage(m.chat, { audio: { url: result }, fileName: `${api.result.title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })
      } catch (e) {
        return conn.reply(m.chat, '> 𝘖𝘤𝘶𝘳𝘳𝘪ó 𝘶𝘯 𝘦𝘳𝘳𝘰𝘳, 𝘳𝘢𝘻ó𝘯:\n\n𝘈𝘳𝘤𝘩𝘪𝘷𝘰 𝘮𝘶𝘺 𝘱𝘦𝘴𝘢𝘥𝘰 𝘰 𝘴𝘪𝘯 𝘦𝘹𝘪𝘴𝘵𝘦𝘯𝘤𝘪𝘢𝘴.🥖', m)
      }
    } else if (command === 'play2' || command === 'ytv' || command === 'ytmp4') {
      try {
        const response = await fetch(`https://api.vreden.my.id/api/ytmp4?url=${url}`)
        const json = await response.json()
        const resultad = json.result
        const resultado = resultad.download.url

        if (!resultad || !resultado) throw new Error('𝘌𝘯𝘭𝘢𝘤𝘦 𝘯𝘰 𝘨𝘦𝘯𝘦𝘳𝘢𝘥𝘰 𝘤𝘰𝘳𝘳𝘦𝘤𝘵𝘢𝘮𝘦𝘯𝘵𝘦.🥖')

        await conn.sendMessage(m.chat, { video: { url: resultado }, fileName: resultad.title, mimetype: 'video/mp4', caption: title }, { quoted: m })
      } catch (e) {
        return conn.reply(m.chat, '> 𝘖𝘤𝘶𝘳𝘳𝘪ó 𝘶𝘯 𝘦𝘳𝘳𝘰𝘳, 𝘳𝘢𝘻ó𝘯:\n\n𝘈𝘳𝘤𝘩𝘪𝘷𝘰 𝘮𝘶𝘺 𝘱𝘦𝘴𝘢𝘥𝘰 𝘰 𝘴𝘪𝘯 𝘦𝘹𝘪𝘴𝘵𝘦𝘯𝘤𝘪𝘢𝘴.🥖', m)
      }
    } else {
      return conn.reply(m.chat, '𝘊𝘰𝘮𝘢𝘯𝘥𝘰 𝘯𝘰 𝘳𝘦𝘤𝘰𝘯𝘰𝘤𝘪𝘥𝘰.🥖', m)
    }

  } catch (error) {
    return m.reply(`𝘖𝘤𝘶𝘳𝘳𝘪ó 𝘶𝘯 𝘦𝘳𝘳𝘰𝘳, 𝘳𝘢𝘻ó𝘯: ${error}`)
  }
}

handler.command = handler.help = ['yta', 'ytmp3', 'play2', 'ytv', 'ytmp4']
handler.tags = ['descargas']
handler.group = true

export default handler

function formatViews(views) {
  if (views === undefined) {
    return "No disponible"
  }

  if (views >= 1_000_000_000) {
    return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`
  } else if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`
  } else if (views >= 1_000) {
    return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`
  }
  return views.toString()
}
