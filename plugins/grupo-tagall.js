let countryCodes = {
  '1': '🇺🇸', '52': '🇲🇽', '54': '🇦🇷', '55': '🇧🇷', '57': '🇨🇴',
  '58': '🇻🇪', '591': '🇧🇴', '593': '🇪🇨', '595': '🇵🇾', '598': '🇺🇾',
  '34': '🇪🇸', '39': '🇮🇹', '44': '🇬🇧', '49': '🇩🇪', '33': '🇫🇷',
  '506': '🇨🇷', '507': '🇵🇦', '503': '🇸🇻', '502': '🇬🇹', '505': '🇳🇮',
  '504': '🇭🇳', '809': '🇩🇴', '51': '🇵🇪', '56': '🇨🇱'
};

let handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
  // Verificar que solo administradores o propietarios pueden usar el comando
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  let pesan = args.join` `;
  let oi = `*𝙈𝙚𝙣𝙨𝙖𝙟𝙚:* ${pesan}`;
  let teks = `𝙄𝙉𝙑𝙊𝘾𝘼𝙉𝘿𝙊 𝘽𝙊𝙇𝙄𝙇𝙇𝙊𝙎. 🥖\n\n${oi}\n\n*𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖𝙨:*\n`;

  // Solo se agrega la información de los participantes sin hacer validación de registros
  for (let mem of participants) {
    let num = mem.id.split('@')[0];
    let code = Object.keys(countryCodes).find(c => num.startsWith(c)) || '🌍';
    let flag = countryCodes[code] || '🌍';
    teks += `${flag} @${num}\n`;
  }

  teks += `\n${wm}`;
  conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) });
};

handler.help = ['tagall <mensaje>', 'invocar <mensaje>'];
handler.tags = ['group'];
handler.command = /^(tagall|invocar|invocacion|todos|invocación)$/i;
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
