let handler = async (m, { isPrems, conn }) => {
let time = global.db.data.users[m.sender].lastcofre + 0 // 36000000 10 Horas //86400000 24 Horas
if (new Date - global.db.data.users[m.sender].lastcofre < 0) throw `[❗𝐈𝐍𝐅𝐎❗] 𝚈𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚂𝚃𝙴 𝚃𝚄 𝙲𝙾𝙵𝚁𝙴\𝚗𝚅𝚄𝙴𝙻𝚅𝙴 𝙴𝙽 *${msToTime(time - new Date())}* 𝙿𝙰𝚁𝙰 𝚅𝙾𝙻𝚅𝙴𝚁 𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚁`

let img = 'https://i.ibb.co/J55dPST/garena-free-fire-logo-rosj9f102kpok60v.jpg' 
let texto = `╔═══════════════╗
┇➤𝙁𝙍𝙀𝙀 𝙁𝙄𝙍𝙀 𝙓 𝘽𝙊𝙇𝙄𝙇𝙇𝙊 𝘽𝙊𝙏 🥖 
╚═══════════════╝

▸▸𝘾𝙊𝙈𝘼𝙉𝘿𝙊𝙎 𝘿𝙄𝙎𝙋𝙊𝙉𝙄𝘽𝙇𝙀𝙎◂◂

▸▸ 𝙈𝘼𝙋𝘼𝙎 ◂◂
│┊➺ 🌴.𝘣𝘦𝘳𝘮𝘶𝘥𝘢
│┊➺ 🌴.𝘱𝘶𝘳𝘨𝘢𝘵𝘰𝘳𝘪𝘰   
│┊➺ 🌴.𝘕𝘦𝘹𝘵𝘦𝘳𝘳𝘢
│┊➺ 🌴.𝘬𝘢𝘭𝘢𝘩𝘢𝘳𝘪 
│┊➺ 🌴.𝘈𝘭𝘱𝘦𝘴
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙  
▸▸ 𝙍𝙀𝙂𝙇𝘼𝙎 ◂◂
│┊➺ 📜.𝘤𝘭𝘬
│┊➺ 📜.𝘪𝘯𝘧𝘪𝘯𝘪𝘵𝘰
│┊➺ 📜.𝘷𝘷2
│┊➺ 📜.𝘭𝘪𝘥𝘦𝘳𝘦𝘴
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙  
▸▸ 𝙇𝙄𝙎𝙏𝘼𝙎 ◂◂
│┊➺ 🛡️.4𝘷𝘴4   
│┊➺ 🛡️.6𝘷𝘴6 
│┊➺ 🛡️.8𝘷𝘴8   
│┊➺ 🛡️.12𝘷𝘴12   
│┊➺ 🛡️.16𝘷𝘴16   
│┊➺ 🛡️.20𝘷𝘴20   
│┊➺ 🛡️.24𝘷𝘴24   
│┊➺ 🛡️.𝘴𝘤𝘳𝘪𝘮 
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙  

▸▸ 𝙍𝙐𝙇𝙀𝙏𝘼𝙎 ◂◂
│┊➺ 👨🏻‍💻.𝘥𝘰𝘯𝘢𝘳𝘴𝘢𝘭𝘢   
│┊➺ 👨🏻‍💻.𝘳𝘰𝘵𝘢𝘳𝘮𝘰𝘤𝘩𝘪𝘭𝘢 🦸‍♂️   
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙

➤  𝘽𝙊𝙇𝙄𝙇𝙇𝙊 𝘽𝙊𝙏 / 𝙈𝙀𝙇𝘿𝙀𝙓𝙕𝙕 🥖  
`

const fkontak = {
        "key": {
    "participants":"0@s.whatsapp.net",
                "remoteJid": "status@broadcast",
                "fromMe": false,
                "id": "Halo"
        },
        "message": {
                "contactMessage": {
                        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
        },
        "participant": "0@s.whatsapp.net"
}
await conn.sendFile(m.chat, img, 'img.jpg', texto, fkontak)
global.db.data.users[m.sender].lastcofre = new Date * 1
}
handler.help = ['freefire']
handler.tags = ['freefire' ,'main'] 
handler.command = ['freefire', 'menufreefire'] 

export default handler
