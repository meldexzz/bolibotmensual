import axios from "axios";

let handler = async (m, { conn, usedPrefix, command }) => {
    let res = (await axios.get(`https://raw.githubusercontent.com/davidprospero123/api-anime/main/BOT-JSON/Messi.json`)).data;
    let url = res[Math.floor(Math.random() * res.length)];

    const buttons = [
        {
            buttonId: `${usedPrefix + command}`,
            buttonText: { displayText: "𝘝𝘦𝘳 𝘮𝘢𝘴 𝘥𝘦𝘭 𝘨𝘰𝘢𝘵. 🐐" },
            type: 1
        }
    ];

    await conn.sendMessage(
        m.chat,
        {
            image: { url },
            caption: "> 𝘔𝘦𝘴𝘴𝘪𝘪𝘪𝘪𝘪𝘪𝘪𝘪𝘪.🐐🥖",
            buttons: buttons,
            viewOnce: true
        },
        { quoted: m }
    );
};

handler.help = ['messi'];
handler.tags = ['anime'];
handler.command = /^(messi)$/i;

export default handler;
