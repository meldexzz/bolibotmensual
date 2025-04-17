let equipo = Array(4).fill(''); // 4 jugadores titulares
let suplentes = Array(2).fill(''); // 2 suplentes
let hora = '';
let modalidad = '';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    // Si solo ponen .4vs4 sin argumentos, mostrar instrucciones
    if (!args[0]) {
        const instrucciones = `
⚠️ *¿CÓMO USAR EL COMANDO?* ⚠️

1️⃣ *Para crear la lista con hora y modalidad:*
   Ejemplo: *${usedPrefix}4vs4 21:00 CLK*
   o: *${usedPrefix}4vs4 9:00 PM INFINITO*

2️⃣ *Botones disponibles:*
   - ✏️ *Anotarse (Titular)*: Te agrega al equipo principal.
   - 🔄 *Anotarse (Suplente)*: Te agrega como suplente.
   - 🗑 *Limpiar Lista*: Borra todos los jugadores.

*Una vez establecida la hora y modalidad, la lista se actualizará automáticamente.*
        `.trim();

        await conn.sendMessage(
            m.chat,
            { text: instrucciones },
            { quoted: m }
        );
        return;
    }

    // Procesar hora y modalidad si se proporcionan
    if (args.length >= 2 && !['anotar', 'suplente', 'limpiar'].includes(args[0].toLowerCase())) {
        const timeArg = args[0];
        let horaTemp = timeArg;
        
        if (args[1] && ['AM', 'PM'].includes(args[1].toUpperCase())) {
            horaTemp += ' ' + args[1].toUpperCase();
            modalidad = args.slice(2).join(' ').toUpperCase();
        } else {
            modalidad = args.slice(1).join(' ').toUpperCase();
        }
        
        if (/(\d{1,2}:\d{2}|\d{1,2})\s*(AM|PM)?$/i.test(horaTemp)) {
            hora = horaTemp;
            await m.reply(`⏰ *Hora establecida:* ${hora}\n🎮 *Modalidad:* ${modalidad}\n\n*¡Lista actualizada!*`);
        } else {
            await m.reply('❌ *Formato de hora incorrecto.* Usa:\n- *9:00 PM* (12h)\n- *21:00* (24h)');
            return;
        }
    }

    // Mostrar lista después de establecer hora/modalidad
    if (args.length >= 2 && !['anotar', 'suplente', 'limpiar'].includes(args[0].toLowerCase())) {
        const texto = `
𝟒 𝐕𝐄𝐑𝐒𝐔𝐒 𝟒

⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎: ${hora} 
🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : 
🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 :                

➥ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: ${modalidad}
➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:

      𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 1
    
    👑 ┇ ${equipo[0] || 'Vacante'}
    🥷🏻 ┇ ${equipo[1] || 'Vacante'}  
    🥷🏻 ┇ ${equipo[2] || 'Vacante'}
    🥷🏻 ┇ ${equipo[3] || 'Vacante'}  
    
    ʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:
    🥷🏻 ┇ ${suplentes[0] || 'Vacante'}
    🥷🏻 ┇ ${suplentes[1] || 'Vacante'}
        `.trim();

        const buttons = [
            { buttonId: `${usedPrefix}4vs4 anotar`, buttonText: { displayText: "✏️ Anotarse (Titular)" }, type: 1 },
            { buttonId: `${usedPrefix}4vs4 suplente`, buttonText: { displayText: "🔄 Anotarse (Suplente)" }, type: 1 },
            { buttonId: `${usedPrefix}4vs4 limpiar`, buttonText: { displayText: "🗑 Limpiar Lista" }, type: 1 },
        ];

        await conn.sendMessage(
            m.chat,
            { text: texto, buttons, viewOnce: true },
            { quoted: m }
        );
        return;
    }

    // Resto del código (anotar, suplente, limpiar) se mantiene igual...
    // ... [Aquí va el resto de tu código original] ...
};

handler.command = /^4vs4$/i;
export default handler;
