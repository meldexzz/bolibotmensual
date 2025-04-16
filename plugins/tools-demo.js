import { randomBytes } from "crypto"
import axios from "axios"

let handler = async (m, { conn, text }) => {
    if (!text) throw '> 𝘏𝘢𝘣𝘭𝘢 𝘤𝘰𝘯 𝘋𝘌𝘔𝘖, ¡𝘗𝘳𝘦𝘨ú𝘯𝘵𝘢𝘭𝘦 𝘤𝘶𝘢𝘭𝘲𝘶𝘪𝘦𝘳 𝘤𝘰𝘴𝘢!.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰 .𝘥𝘦𝘮𝘰 ¿𝘘𝘶é 𝘩𝘢𝘤𝘦𝘴?🥖';
    try {
        conn.reply(m.chat, m);
        let data = await chatGpt(text)
        await conn.sendMessage(m.chat, { text: data }, { quoted: m })
    } catch (err) {
        m.reply('error cik:/ ' + err);
    }
}

handler.command = handler.help = ['demo'];
handler.estrellas = 3;
handler.tags = ['tools'];

export default handler;

async function chatGpt(query){
    try {
        const { id_ }= (await axios.post("https://chat.chatgptdemo.net/new_chat",{user_id: "crqryjoto2h3nlzsg"},{headers:{
            "Content-Type": "application/json",
        }})).data

        const json = {"question":query,"chat_id": id_,"timestamp":new Date().getTime()}

        const { data } = await axios.post("https://chat.chatgptdemo.net/chat_api_stream",json,{headers:{
            "Content-Type": "application/json",
        }})
        const cek = data.split("data: ")

        let res = []

        for (let i=1; i < cek.length; i++){
            if (cek[i].trim().length > 0){
                res.push(JSON.parse(cek[i].trim()))
            }
        }

        return res.map((a) => a.choices[0].delta.content).join("")

    } catch (error) {
        console.error("Error parsing JSON:",error)
        return "404"
    }
}
