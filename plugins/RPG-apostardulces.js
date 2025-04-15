
let handler = async (m, { conn, args }) => {
    // Verifica que el usuario ha proporcionado una cantidad de dulces y un usuario
    if (isNaN(args[0]) || !m.mentionedJidList[0]) {
        return m.reply("> 𝘗𝘰𝘳 𝘧𝘢𝘷𝘰𝘳, 𝘦𝘴𝘱𝘦𝘤𝘪𝘧𝘪𝘤𝘢 𝘭𝘢 𝘤𝘢𝘯𝘵𝘪𝘥𝘢𝘥 𝘥𝘦 𝘥𝘶𝘭𝘤𝘦𝘴 𝘲𝘶𝘦 𝘥𝘦𝘴𝘦𝘢𝘴 𝘢𝘱𝘰𝘴𝘵𝘢𝘳 𝘺 𝘮𝘦𝘯𝘤𝘪𝘰𝘯𝘢 𝘢 𝘶𝘯 𝘶𝘴𝘶𝘢𝘳𝘪𝘰.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘢𝘱𝘰𝘴𝘵𝘢𝘳𝘥𝘶𝘭𝘤𝘦𝘴 <𝘤𝘢𝘯𝘵𝘪𝘥𝘢𝘥> @𝘶𝘴𝘶𝘢𝘳𝘪𝘰. 🥖 ");
    }

    let apuesta = parseInt(args[0]);
    let rival = m.mentionedJidList[0]; // El usuario mencionado

    // Verifica si el usuario tiene suficientes dulces
    let userDulces = global.db.data.users[m.sender].dulces || 1; // Cambia esto según cómo almacenes los dulces
    if (userDulces < apuesta) {
        return m.reply(`𝘕𝘰 𝘵𝘪𝘦𝘯𝘦𝘴 𝘴𝘶𝘧𝘪𝘤𝘪𝘦𝘯𝘵𝘦𝘴 𝘥𝘶𝘭𝘤𝘦𝘴. 𝘛𝘪𝘦𝘯𝘦𝘴: ${userDulces} 𝘥𝘶𝘭𝘤𝘦𝘴.🥖 `);
    
    // Verifica si el rival tiene suficientes dulces
    let rivalDulces = global.db.data.users[rival]?.dulces || 1; // Asegúrate de que el rival tenga la propiedad 'dulces'
    if (rivalDulces < apuesta) {
        return m.reply(`𝘌𝘭 𝘶𝘴𝘶𝘢𝘳𝘪𝘰 𝘮𝘦𝘯𝘤𝘪𝘰𝘯𝘢𝘥𝘰 𝘯𝘰 𝘵𝘪𝘦𝘯𝘦 𝘴𝘶𝘧𝘪𝘤𝘪𝘦𝘯𝘵𝘦𝘴 𝘥𝘶𝘭𝘤𝘦𝘴.🥖. 𝘛𝘪𝘦𝘯𝘦 ${rivalDulces} dulces.🥖`);
    }

    // Resta los dulces apostados del usuario y del rival
    global.db.data.users[m.sender].dulces -= apuesta;
    global.db.data.users[rival].dulces -= apuesta;

    // Selecciona aleatoriamente un ganador
    let participantes = [m.sender, rival];
    let ganador = participantes[Math.floor(Math.random() * participantes.length)];

    // El ganador recibe los dulces apostados
    global.db.data.users[ganador].dulces += apuesta * 2; // El ganador recibe el total de la apuesta

    // Mensaje de resultado
    await conn.sendMessage(m.chat, {
        text: `🎉 ¡Felicidades! ${ganador} ha ganado ${apuesta * 2} dulces. 🎉`
    }, { quoted: m });
};

handler.help = ['apostardulces <cantidad> @usuario'];
handler.tags = ['juegos'];
handler.command = ['apostardulces'];

export default handler;
