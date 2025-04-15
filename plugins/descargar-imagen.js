import fetch from 'node-fetch'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('> 𝘐𝘯𝘨𝘳𝘦𝘴𝘢 𝘦𝘭 𝘵𝘦𝘹𝘵𝘰 𝘥𝘦 𝘭𝘰 𝘲𝘶𝘦 𝘥𝘦𝘴𝘦𝘢𝘴 𝘣𝘶𝘴𝘤𝘢𝘳 𝘦𝘯 𝘪𝘮á𝘨𝘦𝘯𝘦𝘴.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘪𝘮𝘢𝘨𝘦𝘯 𝘣𝘰𝘭𝘪𝘭𝘭𝘰.🥖');
    await m.react('🕓');

    try {
        async function createImage(url) {
            const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: conn.waUploadToServer });
            return imageMessage;
        }

        let push = [];
        let api = await fetch(`https://api.diioffc.web.id/api/search/gimage?query=${encodeURIComponent(text)}`);
        let json = await api.json();

        for (let result of json.result) {
            let image = await createImage(result.link);

            push.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: `> 𝘛𝘪𝘵𝘶𝘭𝘰: ${result.title} \n> 𝘋𝘦𝘴𝘤𝘳𝘪𝘱𝘤𝘪ó𝘯: ${result.snippet}`
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '' }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: '',
                    hasMediaAttachment: true,
                    imageMessage: image
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: [
                        {
                            "name": "cta_url",
                            "buttonParamsJson": `{"display_text":"🌐 Ver Imagen","url":"${result.image.contextLink}"}`
                        }
                    ]
                })
            });
        }

        const msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.create({ text: '*`\Resultados de:\`* ' + `${text}` }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: '_\`Imagenes encontradas\`_' }),
                        header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...push] })
                    })
                }
            }
        }, { 'quoted': m });

        await m.react('✅');
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    } catch (error) {
        console.error(error);
    }
}

handler.help = ['imagen *<texto>*']
handler.tags = ['internet', 'dl']
handler.command = /^(image|imagen)$/i

export default handler;


/* import { googleImage } from '@bochilteam/scraper'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let user = global.db.data.users[m.sender]

    if (!text) throw `𝗤𝘂𝗲 𝗯𝘂𝘀𝗰𝗮𝗿? 🤔️\n𝗨𝘀𝗲𝗹𝗼 𝗱𝗲 𝗹𝗮 𝘀𝗶𝗴𝘂𝗶𝗲𝗻𝘁𝗲 𝗺𝗮𝗻𝗲𝗿𝗮\n𝗘𝗷𝗲𝗺𝗽𝗹𝗼:\n*${usedPrefix + command} Loli*`

    const res = await googleImage(text)
    let image = res.getRandom()
    let link = image

    await delay(1000)

    await conn.sendMessage(m.chat, { 
        image: { url: link }, 
        caption: `*🔎 Resultado De: ${text}*`, 
        footer: dev, 
        buttons: [
            {
                buttonId: `${usedPrefix + command} ${text}`,
                buttonText: { displayText: 'Siguiente' }
            }
        ],
        viewOnce: true,
        headerType: 4
    }, { quoted: m })
}

handler.help = ['imagen *<texto>*']
handler.tags = ['internet', 'dl']
handler.command = /^(image|imagen)$/i

export default handler */
