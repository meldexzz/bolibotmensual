var handler = async (m, { conn, participants, groupMetadata, args, text }) => {

    const pp = '/home/container/freefire/vv2.jpg';

    const groupAdmins = participants.filter(p => p.admin);

    const listaAdmins = groupAdmins.map((v, i) => ``).join('\n');

    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

    let texto = `𝙍𝙀𝙂𝙇𝘼𝙎 𝙑𝙄𝙑𝙄𝘿𝙊𝙎.🥖`.trim();

    conn.sendFile(m.chat, pp, 'error.jpg', texto, m, true, { mentions: [...groupAdmins.map(v => v.id), owner] });

}

handler.tags = ['ffvs']

handler.command = /^(vv2|vividos)$/i

handler.admin = true

handler.group = true

export default handler