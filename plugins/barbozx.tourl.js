import fs from "fs"
import fetch from "node-fetch"
import FormData from "form-data"

let handler = async m => {
  try {
    const q = m.quoted || m
    const mime = q.mediaType || ""    
    if (!/image|video|audio|sticker|document/.test(mime)) 
      throw "> 𝘙𝘦𝘴𝘱𝘰𝘯𝘥𝘦 𝘢 𝘶𝘯𝘢 𝘪𝘮𝘢𝘨𝘦𝘯 / 𝘷í𝘥𝘦𝘰 / 𝘢𝘶𝘥𝘪𝘰 ( 𝘯𝘰𝘳𝘮𝘢𝘭 𝘰 𝘥𝘰𝘤𝘶𝘮𝘦𝘯𝘵𝘰 ).🥖"
    const media = await q.download(true)
    const fileSizeInBytes = fs.statSync(media).size    
    if (fileSizeInBytes === 0) {
      await m.reply("> 𝘈𝘳𝘤𝘩𝘪𝘷𝘰 𝘥𝘦𝘮𝘢𝘴𝘪𝘢𝘥𝘰 𝘭𝘪𝘨𝘦𝘳𝘰.🥖")
      await fs.promises.unlink(media)
      return
    }   
    if (fileSizeInBytes > 1073741824) {
      await m.reply("> 𝘌𝘭 𝘢𝘳𝘤𝘩𝘪𝘷𝘰 𝘴𝘶𝘱𝘦𝘳𝘢 1𝘎𝘉.🥖")
      await fs.promises.unlink(media)
      return
    }    
    const { files } = await uploadUguu(media)
    const caption = `> 𝘈𝘲𝘶í 𝘵𝘪𝘦𝘯𝘦𝘴 𝘭𝘢 𝘜𝘙𝘓 𝘥𝘦 𝘵𝘶 𝘢𝘳𝘤𝘩𝘪𝘷𝘰:\n${files[0]?.url} 🥖`
    await m.reply(caption)
  } catch (e) {
    await m.reply(`${e}`)
  }
}

handler.help = ["tourl2", "tourl"]
handler.tags = ["tools"]
handler.command = /^(tourl2|tourl)$/i
export default handler

async function uploadUguu(path) {
  try {
    const form = new FormData()
    form.append("files[]", fs.createReadStream(path))   
    const res = await fetch("https://uguu.se/upload.php", {
      method: "POST",
      headers: form.getHeaders(),
      body: form
    })    
    const json = await res.json()
    await fs.promises.unlink(path)   
    return json
  } catch (e) {
    await fs.promises.unlink(path)
    throw "Upload failed"
  }
}
