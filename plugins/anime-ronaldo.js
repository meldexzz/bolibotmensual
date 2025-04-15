import axios from "axios";

let handler = async (m, { conn, usedPrefix, command }) => {
    let cristiano = (
        await axios.get(`https://raw.githubusercontent.com/davidprospero123/api-anime/main/BOT-JSON/CristianoRonaldo.json`)
    ).data;

    let ronaldo = cristiano[Math.floor(Math.random() * cristiano.length)];

    const buttons = [
        {
            buttonId: `${usedPrefix + command}`,
            buttonText: { displayText: "𝘝𝘦𝘳 𝘮𝘢𝘴 𝘥𝘦 𝘔𝘳. 𝘊𝘩𝘢𝘮𝘱𝘪𝘰𝘯𝘴.🏆" },
            type: 1
        }
    ];

    await conn.sendMessage(
        m.chat,
        {
            image: { url: ronaldo },
            caption: "> ¡𝘌𝘓 𝘉𝘐𝘊𝘏𝘖𝘖𝘖𝘖𝘖𝘖𝘖!.🏆",
            buttons: buttons,
            viewOnce: true
        },
        { quoted: m }
    );
};

handler.help = ["cr7"];
handler.tags = ["anime"];
handler.command = /^(ronaldo|cr7)$/i;

export default handler;
