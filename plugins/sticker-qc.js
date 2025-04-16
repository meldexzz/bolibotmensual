import { sticker } from '../lib/sticker.js'
import axios from 'axios'

const handler = async (m, { conn, args }) => {
    let text;
    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else throw "> 𝘐𝘯𝘨𝘳𝘦𝘴𝘢 𝘶𝘯 𝘵𝘦𝘹𝘵𝘰 𝘱𝘢𝘳𝘢 𝘵𝘳𝘢𝘯𝘴𝘧𝘰𝘳𝘮𝘢𝘳𝘭𝘰 𝘦𝘯 𝘲𝘶𝘰𝘵𝘭𝘺.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘲𝘤 𝘩𝘰𝘭𝘢 𝘣𝘰𝘭𝘪𝘭𝘭𝘰𝘴.🥖";
   if (!text) return conn.reply(m.chat, '> 𝘐𝘯𝘨𝘳𝘦𝘴𝘢 𝘶𝘯 𝘵𝘦𝘹𝘵𝘰 𝘱𝘢𝘳𝘢 𝘵𝘳𝘢𝘯𝘴𝘧𝘰𝘳𝘮𝘢𝘳𝘭𝘰 𝘦𝘯 𝘲𝘶𝘰𝘵𝘭𝘺. 𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘲𝘤 𝘩𝘰𝘭𝘢 𝘣𝘰𝘭𝘪𝘭𝘭𝘰𝘴.🥖', m)
   if (text.length > 30) return conn.reply(m.chat, '> 𝘓𝘪𝘮𝘪𝘵𝘦 𝘥𝘦 30 𝘤𝘢𝘳𝘢𝘤𝘵𝘦𝘳𝘦𝘴 𝘦𝘹𝘤𝘦𝘥𝘪𝘥𝘰.🥖', m)

    const randomColor = ['#000000'];

    const apiColor = randomColor[Math.floor(Math.random() * randomColor.length)];

    const pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/320b066dc81928b782c7b.png');

    const obj = {
        "type": "quote",
        "format": "png",
        "backgroundColor": apiColor,
        "width": 512,
        "height": 768,
        "scale": 2,
        "messages": [{
            "entities": [],
            "avatar": true,
            "from": {
                "id": 1,
                "name": m.name,
                "photo": {
                    "url": pp
                }
            },
            "text": text,
            "replyMessage": {}
        }]
    };

    const json = await axios.post('https://btzqc.betabotz.eu.org/generate', obj, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const buffer = Buffer.from(json.data.result.image, 'base64');
    const stiker = await sticker(buffer, false, global.stickpack, global.stickauth);
    if (stiker) return conn.sendFile(m.chat, stiker, 'Quotely.webp', '', m);
}

handler.help = ['quotly *<texto>*']
handler.tags = ['sticker']
handler.command = ['quotly', 'qc']

export default handler
