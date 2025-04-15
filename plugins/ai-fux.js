/* 
- Flux Ai Imagen By Angel-OFC 
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
import axios from "axios";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat,`> 𝘍𝘰𝘳𝘮𝘢 𝘤𝘰𝘳𝘳𝘦𝘤𝘵𝘢 𝘥𝘦 𝘶𝘴𝘢𝘳 𝘦𝘭 𝘤𝘰𝘮𝘢𝘯𝘥𝘰: \n\n.𝘧𝘭𝘶𝘹 𝘧𝘭𝘰𝘳𝘦𝘴.🥖`, m, fake)
  await m.react('🕓')

  try {
    const result = await fluximg.create(text);
    if (result && result.imageLink) {
      await m.react('✅')
      await conn.sendMessage(
        m.chat,
        {
          image: { url: result.imageLink },
          caption: `> 𝘙𝘌𝘚𝘜𝘓𝘛𝘈𝘋𝘖𝘚 𝘋𝘌: \ ${text} 🥖`,
        },
        { quoted: m }
      );
    } else {
      throw new Error("𝘕𝘰 𝘴𝘦 𝘱𝘶𝘥𝘰 𝘨𝘦𝘯𝘦𝘳𝘢𝘳 𝘭𝘢 𝘪𝘮𝘢𝘨𝘦𝘯, 𝘪𝘯𝘵𝘦𝘯𝘵𝘢 𝘯𝘶𝘦𝘷𝘢𝘮𝘦𝘯𝘵𝘦.🥖");
    }
  } catch (error) {
    console.error(error);
    conn.reply(
      m.chat,
      "𝘕𝘰 𝘴𝘦 𝘱𝘶𝘥𝘰 𝘨𝘦𝘯𝘦𝘳𝘢𝘳 𝘭𝘢 𝘪𝘮𝘢𝘨𝘦𝘯, 𝘪𝘯𝘵𝘦𝘯𝘵𝘢 𝘯𝘶𝘦𝘷𝘢𝘮𝘦𝘯𝘵𝘦.🥖",
      m
    );
  }
};

handler.help = ["flux *<texto>*"];
handler.tags = ["tools"];
handler.command = ["flux"];

export default handler;

const fluximg = {
  defaultRatio: "2:3", 

  create: async (query) => {
    const config = {
      headers: {
        accept: "*/*",
        authority: "1yjs1yldj7.execute-api.us-east-1.amazonaws.com",
        "user-agent": "Postify/1.0.0",
      },
    };

    try {
      const response = await axios.get(
        `https://1yjs1yldj7.execute-api.us-east-1.amazonaws.com/default/ai_image?prompt=${encodeURIComponent(
          query
        )}&aspect_ratio=${fluximg.defaultRatio}`,
        config
      );
      return {
        imageLink: response.data.image_link,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
