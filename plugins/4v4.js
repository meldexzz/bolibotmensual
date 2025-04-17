let equipo = Array(4).fill(''); // 4 jugadores titulares
let suplentes = Array(2).fill(''); // 2 suplentes
let hora = '';
let modalidad = '';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    // Función para enviar la lista actualizada
    const enviarLista = async (mensajeAdicional = '') => {
        const texto = `
𝟒 𝐕𝐄𝐑𝐒𝐔𝐒 𝟒

⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎: ${hora || 'Por definir'} 
🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : 
🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 :                

➥ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: ${modalidad || 'Por definir'}
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
            {
                buttonId: `${usedPrefix}4vs4 anotar`,
                buttonText: { displayText: "✏️ Anotarse (Titular)" },
                type: 1,
            },
            {
                buttonId: `${usedPrefix}4vs4 suplente`,
                buttonText: { displayText: "🔄 Anotarse (Suplente)" },
                type: 1,
            },
            {
                buttonId: `${usedPrefix}4vs4 limpiar`,
                buttonText: { displayText: "🗑 Limpiar Lista" },
                type: 1,
            },
        ];

        // Eliminar el mensaje anterior si existe
        try {
            await conn.sendMessage(
                m.chat,
                {
                    text: mensajeAdicional ? `${mensajeAdicional}\n\n${texto}` : texto,
                    buttons,
                    viewOnce: true,
                },
                { quoted: m }
            );
        } catch (e) {
            console.error('Error al enviar mensaje:', e);
        }
    };

    // Mostrar instrucciones si no hay argumentos
    if (!args[0]) {
        const instrucciones = `
⚠️ *¿CÓMO USAR EL COMANDO?* ⚠️

1️⃣ *Para crear la lista con hora y modalidad:*
   Ejemplo: *${usedPrefix}4vs4 21:00 CLK*
   o: *${usedPrefix}4vs4 9:00 PM INFINITO*

*Una vez establecida la hora y modalidad, usa los botones para anotarte.*
        `.trim();
        await conn.sendMessage(m.chat, { text: instrucciones }, { quoted: m });
        return;
    }

    // Procesar hora y modalidad
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
            await enviarLista(`⏰ *Hora establecida:* ${hora}\n🎮 *Modalidad:* ${modalidad}`);
        } else {
            await m.reply('❌ *Formato de hora incorrecto.* Usa:\n- *9:00 PM* (12h)\n- *21:00* (24h)');
        }
        return;
    }

    // Anotarse como titular
    if (args[0].toLowerCase() === 'anotar') {
        const nombre = '@' + (m.pushName || m.sender.split('@')[0]);
        
        if (equipo.includes(nombre) || suplentes.includes(nombre)) {
            await m.reply(`❌ *${nombre}* ya estás anotado en la lista.`);
            return;
        }
        
        const index = equipo.indexOf('');
        if (index !== -1) {
            equipo[index] = nombre;
            await enviarLista(`✅ *${nombre}* te has anotado como *TITULAR* (Posición ${index + 1})`);
        } else {
            await m.reply(`📢 *${nombre}*, el equipo titular está completo. ¿Quieres anotarte como suplente? Usa *${usedPrefix}4vs4 suplente*`);
        }
        return;
    }

    // Anotarse como suplente
    if (args[0].toLowerCase() === 'suplente') {
        const nombre = '@' + (m.pushName || m.sender.split('@')[0]);
        
        if (equipo.includes(nombre) || suplentes.includes(nombre)) {
            await m.reply(`❌ *${nombre}* ya estás anotado en la lista.`);
            return;
        }
        
        const index = suplentes.indexOf('');
        if (index !== -1) {
            suplentes[index] = nombre;
            await enviarLista(`🔄 *${nombre}* te has anotado como *SUPLENTE* (Posición ${index + 1})`);
        } else {
            await m.reply(`📢 *${nombre}*, los suplentes también están completos. Espera a que haya vacantes.`);
        }
        return;
    }

    // Limpiar lista
    if (args[0].toLowerCase() === 'limpiar') {
        equipo = Array(4).fill('');
        suplentes = Array(2).fill('');
        await enviarLista('🧹 *Lista limpiada completamente.* Todos los puestos están vacantes ahora.');
        return;
    }
}

handler.command = /^4vs4$/i;
handler.help = [
    '4vs4 [hora] [modalidad] - Establece hora y modalidad',
    '4vs4 anotar - Anotarse como titular',
    '4vs4 suplente - Anotarse como suplente',
    '4vs4 limpiar - Vaciar todas las posiciones'
];
handler.tags = ['freefire'];
handler.group = true;
handler.admin = true;

export default handler;
