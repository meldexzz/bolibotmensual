let handler = async (m, { conn }) => {
    let chat = global.db.data.chats[m.chat]
    if (chat.setpromos) {
        let promos = chat.setpromos;
        await conn.reply(m.chat, promos, m);
    } else {
        m.reply(`𝙉𝙤 𝙨𝙚 𝙝𝙖 𝙚𝙨𝙩𝙖𝙗𝙡𝙚𝙘𝙞𝙙𝙤 𝙪𝙣 𝙘𝙖𝙩á𝙡𝙤𝙜𝙤 𝙥𝙖𝙧𝙖 𝙋𝙧𝙤𝙢𝙤𝙨, 𝙪𝙩𝙞𝙡𝙞𝙯𝙖 .𝙨𝙚𝙩𝙥𝙧𝙤𝙢𝙤𝙨 𝙥𝙖𝙧𝙖 𝙚𝙨𝙩𝙖𝙗𝙡𝙚𝙘𝙚𝙧 𝙪𝙣𝙤.`);
    }
}
handler.command = ['promos'];
handler.group = true;
export default handler;
