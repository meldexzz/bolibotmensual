var handler = async (m, { conn, participants, groupMetadata, args, text }) => {

    const pp = '/home/container/freefire/inf.jpg';

    const groupAdmins = participants.filter(p => p.admin);

    const listaAdmins = groupAdmins.map((v, i) => ``).join('\n');

    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

    let texto = `𝙍𝙀𝙂𝙇𝘼𝙎 𝙄𝙉𝙁𝙄𝙉𝙄𝙏𝙊.🥖`.trim();

    conn.sendFile(m.chat, pp, 'error.jpg', texto, m, true, { mentions: [...groupAdmins.map(v => v.id), owner] });

}

handler.tags = ['ffvs']

handler.command = /^inf$/i

handler.admin = true

handler.group = true

export default handler