import axios from "axios";
import FormData from "form-data";
import cheerio from "cheerio";

let handler = async (m, { conn, usedPrefix, command, text, args }) => {
  if (!text) return conn.reply(m.chat, '> 𝘐𝘯𝘨𝘳𝘦𝘴𝘢 𝘦𝘭 𝘭𝘪𝘯𝘬 𝘥𝘦𝘭 𝘵𝘪𝘬𝘵𝘰𝘬.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘵𝘪𝘬𝘵𝘰𝘬2 𝘩𝘵𝘵𝘱𝘴://𝘸𝘸𝘸.𝘵𝘪𝘬𝘵𝘰𝘬.𝘤𝘰𝘮/@𝘯𝘰𝘵𝘢𝘴𝘺𝘭𝘦𝘵𝘳𝘢𝘴99/𝘷𝘪𝘥𝘦𝘰/7304018793800535301?𝘪𝘴_𝘧𝘳𝘰𝘮_𝘸𝘦𝘣𝘢𝘱𝘱=1&𝘴𝘦𝘯𝘥𝘦𝘳_𝘥𝘦𝘷𝘪𝘤𝘦=𝘱𝘤', m)
    try {
let data = await tiktokdl(text)
console.log(data)
  let start = Date.now();
  let sp = (Date.now() - start) + 'ms'
  let cap = `> 𝘛𝘪𝘬𝘛𝘰𝘬 𝘤𝘢𝘭𝘪𝘥𝘢𝘥 𝘯𝘰𝘳𝘮𝘢𝘭.🥖`
  let capp = `> 𝘛𝘪𝘬𝘛𝘰𝘬 𝘤𝘢𝘭𝘪𝘥𝘢𝘥 𝘏𝘋.🥖`
  await m.react('🕓');
  await conn.sendMessage(m.chat, {
                    video: {
                        url: data.server1.url
                    },
                    caption: cap
                }, {
                    quoted: m
                })
await conn.sendMessage(m.chat, {
                    video: {
                        url: data.serverHD.url
                    },
                    caption: capp
                }, {
                    quoted: m
                })
await m.react('✅')
  } catch {
    await m.react('✖️')
  }
}
handler.help = ['tiktok2 *<link>*']
//handler.yenes = 2
handler.tags = ['descargas']
handler.command = /^(tiktok2)$/i;

export default handler

async function tiktokdl(url) {
    let result = {};
    let form = new FormData();
    form.append("q", url);
    form.append("lang", "id");

    try {
        let { data } = await axios("https://savetik.co/api/ajaxSearch", {
            method: "post",
            data: form,
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "User-Agent": "PostmanRuntime/7.32.2"
            }
        });

        let $ = cheerio.load(data.data);

        result.status = true;
        result.caption = $("div.video-data > div > .tik-left > div > .content > div > h3").text();
        result.server1 = {
            quality: "MEDIUM",
            url: $("div.video-data > div > .tik-right > div > p:nth-child(1) > a").attr("href")
        };
        result.serverHD = {
            quality: $("div.video-data > div > .tik-right > div > p:nth-child(3) > a").text().split("MP4 ")[1],
            url: $("div.video-data > div > .tik-right > div > p:nth-child(3) > a").attr("href")
        };
        result.audio = $("div.video-data > div > .tik-right > div > p:nth-child(4) > a").attr("href");

    } catch (error) {
        result.status = false;
        result.message = error;
        console.log(result);
    }

    return result;
}
