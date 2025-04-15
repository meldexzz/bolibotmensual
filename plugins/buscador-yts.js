import fetch from 'node-fetch';
import yts from "yt-search";
import axios from 'axios';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;
import FormData from "form-data";
import Jimp from "jimp";

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`> 𝘐𝘯𝘨𝘳𝘦𝘴𝘢 𝘦𝘭 𝘯𝘰𝘮𝘣𝘳𝘦 𝘥𝘦𝘭 𝘢𝘳𝘤𝘩𝘪𝘷𝘰 𝘲𝘶𝘦 𝘥𝘦𝘴𝘦𝘢𝘴 𝘥𝘦𝘴𝘤𝘢𝘳𝘨𝘢𝘳.\n\n𝘌𝘫𝘮𝘦𝘱𝘭𝘰: .𝘺𝘵𝘢𝘴𝘦𝘢𝘳𝘤𝘩 𝘣𝘰𝘭𝘪𝘭𝘭𝘰𝘴 𝘨𝘢𝘭𝘢𝘤𝘵𝘪𝘤𝘰𝘴.🥖`);

  await m.react('🕓')

    async function createImage(img) {
        const { imageMessage } = await generateWAMessageContent({
            image: img
        }, {
            upload: conn.waUploadToServer
        });
        return imageMessage;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    let push = [];
    let results = await yts(text);
    let videos = results.videos.slice(0, 9); 
    shuffleArray(videos);

    let i = 1;
    for (let video of videos) {
        let imageUrl = video.thumbnail;
        let imageK = await fetch(imageUrl);
        let imageB = await imageK.buffer();
      let pr = await remini(imageB, "enhance")
        push.push({
            body: proto.Message.InteractiveMessage.Body.fromObject({
                text: `> 𝘛𝘪𝘵𝘶𝘭𝘰: ${video.title}\n> 𝘋𝘶𝘳𝘢𝘤𝘪ó𝘯: ${video.timestamp}\n> 𝘝𝘪𝘴𝘵𝘢𝘴: ${video.views}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
                text: '' 
            }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
                title: ``,
                hasMediaAttachment: true,
                imageMessage: await createImage(pr) 
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [
                    {
                "name": "cta_copy",
                "buttonParamsJson": JSON.stringify({
                "display_text": "> 𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢𝘳 𝘢𝘶𝘥𝘪𝘰.🎧",
                "copy_code": `.ytmp3 ${video.url}`
                })
              },{
                "name": "cta_copy",
                "buttonParamsJson": JSON.stringify({
                "display_text": "𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢𝘳 𝘷𝘪𝘥𝘦𝘰.📹",
                "copy_code": `.ytmp4 ${video.url}`
                })
              }
                ]
            })
        });
    }

    const bot = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: '𝘙𝘦𝘴𝘶𝘭𝘵𝘢𝘥𝘰𝘴 𝘥𝘦:' + `*${text}* 🥖`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: '> 𝘗𝘢𝘳𝘢 𝘥𝘦𝘴𝘤𝘢𝘳𝘨𝘢𝘳, 𝘴𝘰𝘭𝘰 𝘥𝘦𝘴𝘭𝘪𝘻𝘢 𝘴𝘰𝘣𝘳𝘦 𝘭𝘰𝘴 𝘳𝘦𝘴𝘶𝘭𝘵𝘢𝘥𝘰𝘴, 𝘵𝘰𝘤𝘢 𝘦𝘭 𝘣𝘰𝘵ó𝘯 𝘱𝘢𝘳𝘢 𝘤𝘰𝘱𝘪𝘢𝘳, 𝘤𝘰𝘱𝘪𝘢𝘳𝘢𝘴 𝘦𝘭 𝘤𝘰𝘮𝘢𝘯𝘥𝘰, 𝘴𝘰𝘭𝘰 𝘦𝘯𝘷í𝘢𝘭𝘰, 𝘺 𝘭𝘪𝘴𝘵𝘰.🥖 '
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        hasMediaAttachment: false
                    }),
                    carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                        cards: [...push] // Mengisi carousel dengan hasil video
                    })

                })
            }
        }
    }, {
    'quoted': m
  });

    await conn.relayMessage(m.chat, bot.message, { messageId: bot.key.id });
  await m.react('✅')
}

handler.help = ["ytsearch *<texto>*", "yts *<texto>*"];
handler.tags = ["search"];
handler.command = ["ytsearch", "yts"];

export default handler;

async function remini(imageData, operation) {
  return new Promise(async (resolve, reject) => {
    const availableOperations = ["enhance", "recolor", "dehaze"]
    if (availableOperations.includes(operation)) {
      operation = operation
    } else {
      operation = availableOperations[0]
    }
    const baseUrl = "https://inferenceengine.vyro.ai/" + operation + ".vyro"
    const formData = new FormData()
    formData.append("image", Buffer.from(imageData), {filename: "enhance_image_body.jpg", contentType: "image/jpeg"})
    formData.append("model_version", 1, {"Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=utf-8"})
    formData.submit({url: baseUrl, host: "inferenceengine.vyro.ai", path: "/" + operation, protocol: "https:", headers: {"User-Agent": "okhttp/4.9.3", Connection: "Keep-Alive", "Accept-Encoding": "gzip"}},
      function (err, res) {
        if (err) reject(err);
        const chunks = [];
        res.on("data", function (chunk) {chunks.push(chunk)});
        res.on("end", function () {resolve(Buffer.concat(chunks))});
        res.on("error", function (err) {
        reject(err);
        });
      },
    )
  })
}
