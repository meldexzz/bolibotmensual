let equipo = Array(4).fill(''); // 4 jugadores titulares
let suplentes = Array(2).fill(''); // 2 suplentes
let hora = '';
let modalidad = '';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    // Procesar hora y modalidad si se proporcionan
    if (args.length >= 2 && !['anotar', 'suplente', 'limpiar'].includes(args[0].toLowerCase())) {
        const timeArg = args[0];
        if (/(\d{1,2}:\d{2})|(\d{1,2}\s*(AM|PM))/i.test(timeArg)) {
            hora = timeArg + (args[1] && ['AM', 'PM'].includes(args[1].toUpperCase()) ? ' ' + args[1].toUpperCase() : '';
            const modalidadStartIndex = ['AM', 'PM'].includes(args[1]?.toUpperCase()) ? 2 : 1;
            modalidad = args.slice(modalidadStartIndex).join(' ').toUpperCase();
        }
    }

    // Mostrar lista
    if (!args[0] || (args.length >= 2 && !['anotar', 'suplente', 'limpiar'].includes(args[0].toLowerCase()))) {
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

        await conn.sendMessage(
            m.chat,
            {
                text: texto,
                buttons,
                viewOnce: true,
            },
            { quoted: m }
        );
        return;
    }

    // Anotarse como titular
    if (args[0].toLowerCase() === 'anotar') {
        const nombre = m.pushName || 'Usuario';
        
        // Verificar si ya está anotado
        if (equipo.includes(nombre) || suplentes.includes(nombre)) {
            await m.reply('❗Ya estás anotado en la lista.');
            return;
        }
        
        // Buscar primer espacio vacío en equipo
        const index = equipo.indexOf('');
        
        if (index !== -1) {
            equipo[index] = nombre;
            await m.reply(`✅ *${nombre}* ha sido anotado como titular.\nPosición: ${index + 1}`);
        } else {
            // Si equipo está lleno, ofrecer suplente
            await m.reply('El equipo titular está completo. ¿Quieres anotarte como suplente? Usa *.4vs4 suplente*');
        }
        return;
    }

    // Anotarse como suplente
    if (args[0].toLowerCase() === 'suplente') {
        const nombre = m.pushName || 'Usuario';
        
        if (equipo.includes(nombre) || suplentes.includes(nombre)) {
            await m.reply('❗Ya estás anotado en la lista.');
            return;
        }
        
        const index = suplentes.indexOf('');
        
        if (index !== -1) {
            suplentes[index] = nombre;
            await m.reply(`🔄 *${nombre}* ha sido anotado como suplente.\nPosición suplente: ${index + 1}`);
        } else {
            await m.reply('Los suplentes también están completos. Espera a que haya vacantes.');
        }
        return;
    }

    // Limpiar lista
    if (args[0].toLowerCase() === 'limpiar') {
        equipo = Array(4).fill('');
        suplentes = Array(2).fill('');
        await m.reply('🧹 Lista limpiada completamente. Todos los puestos están vacantes ahora.');
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
