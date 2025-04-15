import fetch from "node-fetch"
import yts from 'yt-search'
import axios from "axios"

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `> 𝘐𝘯𝘨𝘳𝘦𝘴𝘢 𝘦𝘭 𝘯𝘰𝘮𝘣𝘳𝘦 𝘥𝘦 𝘭𝘢 𝘮ú𝘴𝘪𝘤𝘢 𝘢 𝘥𝘦𝘴𝘤𝘢𝘳𝘨𝘢𝘳.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘺𝘵𝘢 𝘴𝘢𝘤𝘢 𝘭𝘰𝘴 𝘣𝘰𝘭𝘪𝘭𝘭𝘰𝘴.🥖`, m)
    }

    const search = await yts(text)
    if (!search.all || search.all.length === 0) {
      return m.reply('> 𝘕𝘰 𝘴𝘦 𝘱𝘶𝘥𝘰 𝘰𝘣𝘵𝘦𝘯𝘦𝘳 𝘦𝘭 𝘳𝘦𝘴𝘶𝘭𝘵𝘢𝘥𝘰 𝘱𝘢𝘳𝘢 𝘵𝘶 𝘣ú𝘴𝘲𝘶𝘦𝘥𝘢.🥖')
    }

    const videoInfo = search.all[0]
    if (!videoInfo) {
      return m.reply('> 𝘕𝘰 𝘴𝘦 𝘱𝘶𝘥𝘰 𝘰𝘣𝘵𝘦𝘯𝘦𝘳 𝘦𝘭 𝘳𝘦𝘴𝘶𝘭𝘵𝘢𝘥𝘰 𝘱𝘢𝘳𝘢 𝘵𝘶 𝘣ú𝘴𝘲𝘶𝘦𝘥𝘢.🥖.')
    }

    const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo

    if (!title || !thumbnail || !timestamp || !views || !ago || !url || !author) {
      return m.reply('> 𝘐𝘯𝘧𝘰𝘳𝘮𝘢𝘤𝘪ó𝘯 𝘪𝘯𝘤𝘰𝘮𝘱𝘭𝘦𝘵𝘢 𝘥𝘦𝘭 𝘷𝘪𝘥𝘦𝘰.🥖')
    }

    const vistas = formatViews(views)
    const canal = author.name ? author.name : 'Desconocido'
    const infoMessage = `> 𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢𝘯𝘥𝘰: ${title || '𝘋𝘦𝘴𝘤𝘰𝘯𝘰𝘤𝘪𝘥𝘰'}\n\n> 𝘊𝘢𝘯𝘢𝘭: *${canal}*\n> 𝘝𝘪𝘴𝘵𝘢𝘴: *${vistas || '𝘋𝘦𝘴𝘤𝘰𝘯𝘰𝘤𝘪𝘥𝘰'}*\n> 𝘋𝘶𝘳𝘢𝘤𝘪ó𝘯: *${timestamp || '𝘋𝘦𝘴𝘤𝘰𝘯𝘰𝘤𝘪𝘥𝘰'}*\n> 𝘗𝘶𝘣𝘭𝘪𝘤𝘢𝘤𝘪ó𝘯:  *${ago || '𝘋𝘦𝘴𝘤𝘰𝘯𝘰𝘤𝘪𝘥𝘰'}*\n> 𝘓𝘪𝘯𝘬: ${url}`

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
          renderLargerThumbnail: true,
        },
      },
    }

    await conn.reply(m.chat, infoMessage, m, JT)

    if (command === 'play' || command === 'yta' || command === 'ytmp3') {
      try {
        const api = await (await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`)).json()
        const resulta = api.result
        const result = resulta.download.url

        if (!result) throw new Error('> 𝘕𝘰 𝘴𝘦 𝘨𝘦𝘯𝘦𝘳𝘰 𝘦𝘭 𝘢𝘶𝘥𝘪𝘰 𝘤𝘰𝘳𝘳𝘦𝘤𝘵𝘢𝘮𝘦𝘯𝘵𝘦.🥖')

        await conn.sendMessage(m.chat, { audio: { url: result }, fileName: `${api.result.title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })
      } catch (e) {
        return conn.reply(m.chat, '> 𝘈𝘳𝘤𝘩𝘪𝘷𝘰 𝘥𝘦𝘮𝘢𝘴𝘪𝘢𝘥𝘰 𝘱𝘦𝘴𝘢𝘥𝘰 𝘰 𝘜𝘙𝘓 𝘪𝘯𝘤𝘰𝘳𝘳𝘦𝘤𝘵𝘢.🥖', m)
      }
    } else if (command === 'play2' || command === 'ytv' || command === 'ytmp4') {
      try {
        const response = await fetch(`https://api.vreden.my.id/api/ytmp4?url=${url}`)
        const json = await response.json()
        const resultad = json.result
        const resultado = resultad.download.url

        if (!resultad || !resultado) throw new Error('> 𝘕𝘰 𝘴𝘦 𝘨𝘦𝘯𝘦𝘳𝘰 𝘦𝘭 𝘢𝘶𝘥𝘪𝘰 𝘤𝘰𝘳𝘳𝘦𝘤𝘵𝘢𝘮𝘦𝘯𝘵𝘦.🥖.')

        await conn.sendMessage(m.chat, { video: { url: resultado }, fileName: resultad.title, mimetype: 'video/mp4', caption: title }, { quoted: m })
      } catch (e) {
        return conn.reply(m.chat, '> 𝘈𝘳𝘤𝘩𝘪𝘷𝘰 𝘥𝘦𝘮𝘢𝘴𝘪𝘢𝘥𝘰 𝘱𝘦𝘴𝘢𝘥𝘰 𝘰 𝘜𝘙𝘓 𝘪𝘯𝘤𝘰𝘳𝘳𝘦𝘤𝘵𝘢.🥖', m)
      }
    } else {
      return conn.reply(m.chat, '> 𝘊𝘰𝘮𝘢𝘯𝘥𝘰 𝘯𝘰 𝘳𝘦𝘤𝘰𝘯𝘰𝘤𝘪𝘥𝘰.🥖', m)
    }

  } catch (error) {
    return m.reply(`𝘖𝘤𝘶𝘳𝘳𝘪ó 𝘶𝘯 𝘦𝘳𝘳𝘰𝘳: ${error}`)
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
