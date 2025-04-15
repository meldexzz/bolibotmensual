const handler = async (m, { conn, args }) => {
  if (args.length < 3) {
    return await conn.sendMessage(m.chat, { text: '❌ Debes escribir la cantidad de salas, los mapas y la hora. Ejemplo:\n\n.scrim 3 bermuda,purgatorio 23:45' });
  }

  let cantidadSalas = args[0]; // Cantidad de salas
  let mapas = args[1].toLowerCase().split(','); // Mapas ingresados
  let horaMex = args[2]; // Hora ingresada (México)

  // Validar formato de hora (HH:MM)
  if (!/^\d{1,2}:\d{2}$/.test(horaMex)) {
    return await conn.sendMessage(m.chat, { text: '⚠️ Formato de hora inválido. Usa HH:MM. Ejemplo:\n\n.scrim 3 bermuda,purgatorio 23:45' });
  }

  // Convertir hora de México a Colombia (-1 hora de diferencia)
  let [horas, minutos] = horaMex.split(':').map(Number);
  let horaCol = (horas - 1 + 24) % 24; // Ajuste para que no haya valores negativos

  // Formatear la hora (asegurar que siempre tenga 2 dígitos)
  let horaColStr = `${horaCol.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;

  // Mensaje actualizado con la cantidad de salas, mapas, hora y demás
  let lista = `
╭──────⚔──────╮
┇➤ 𝙎𝙘𝙧𝙞𝙢   
╰──────⚔──────╯

╭──────────────╮
┇➤ ⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎  
┇➤ 🇲🇽 𝐌𝐄𝐗 : ${horaMex}  
┇➤ 🇨🇴 𝐂𝐎𝐋 : ${horaColStr}  

┇➤ 𝘾𝘼𝙉𝙏𝙄𝘿𝘼𝘿 𝘿𝙀 𝙎𝘼𝙇𝘼𝙎: ${cantidadSalas}  
┇➤ 𝙈𝘼𝙋𝘼𝙎: ${mapas.join(', ').toUpperCase()}  

🌟 *Recuerden tener los mapas descargados, si no lo hacen, podrían ser baneados.* 🌟

┇➤ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: Scrim  
┇➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:  
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

handler.command = /^(scrim)$/i;
export default handler;
