const handler = async (m, { conn, args }) => {
  if (args.length < 2) {
    return await conn.sendMessage(m.chat, { text: '❌ Debes escribir el horario y la modalidad. Ejemplo:\n\n.4vs4 23:45 clk' });
  }

  let horaMex = args[0]; // Hora ingresada (México)
  let modalidad = args[1].toUpperCase(); // Modalidad ingresada en mayúsculas

  // Validar formato de hora (HH:MM)
  if (!/^\d{1,2}:\d{2}$/.test(horaMex)) {
    return await conn.sendMessage(m.chat, { text: '⚠️ Formato de hora inválido. Usa HH:MM. Ejemplo:\n\n.4vs4 23:45 clk' });
  }

  // Convertir hora de México a Colombia (-1 hora de diferencia)
  let [horas, minutos] = horaMex.split(':').map(Number);
  let horaCol = (horas - 1 + 24) % 24; // Ajuste para que no haya valores negativos

  // Formatear la hora (asegurar que siempre tenga 2 dígitos)
  let horaColStr = `${horaCol.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;

  // Mensaje actualizado con la hora y modalidad
  let lista = `
╭──────⚔──────╮
┇➤ 4 𝐕𝐄𝐑𝐒𝐔𝐒 4
╰──────⚔──────╯

╭──────────────╮
┇➤ ⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎  
┇➤ 🇲🇽 𝐌𝐄𝐗 : ${horaMex}  
┇➤ 🇨🇴 𝐂𝐎𝐋 : ${horaColStr}  

┇➤ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: ${modalidad}  
┇➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:  
┇➥ 𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔  
┇➥ 👨🏻‍💻 ➤  
┇➥ 👨🏻‍💻 ➤  
┇➥ 👨🏻‍💻 ➤  
┇➥ 👨🏻‍💻 ➤  

┇➥ ʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄:  
┇➥ 👨🏻‍💼 ➤  
┇➥ 👨🏻‍💼 ➤  
╰─────────────

➤ 𝘽𝙊𝙇𝙄𝙇𝙇𝙊 𝘽𝙊𝙏 / 𝙈𝙀𝙇𝘿𝙀𝙓𝙕𝙕 / 𝙅𝙊𝙎𝙎 🥖
  `.trim();

  await conn.sendMessage(m.chat, { text: lista });
};

handler.command = /^(4vs4)$/i;
export default handler;

