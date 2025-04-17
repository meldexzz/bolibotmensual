let equipo = Array(4).fill(''); // 4 jugadores titulares
let suplentes = Array(2).fill(''); // 2 suplentes
let horaMex = '';
let modalidad = '';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    // Función para calcular hora Colombia (1 hora adelante de México)
    const calcularHoraCol = (horaMex) => {
        if (!horaMex) return 'Por definir';
        
        // Extraer horas y minutos
        const [time, period] = horaMex.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        
        // Si es formato 12 horas con PM (excepto 12 PM)
        if (period === 'PM' && hours !== 12) hours += 12;
        // Si es formato 12 horas con AM y es 12 AM
        if (period === 'AM' && hours === 12) hours = 0;
        
        // Sumar 1 hora para Colombia
        let hoursCol = hours + 1;
        if (hoursCol >= 24) hoursCol -= 24;
        
        // Convertir de nuevo a formato 12 horas si es necesario
        if (horaMex.includes('AM') || horaMex.includes('PM')) {
            let periodCol = 'AM';
            if (hoursCol >= 12) {
                periodCol = 'PM';
                if (hoursCol > 12) hoursCol -= 12;
            }
            if (hoursCol === 0) hoursCol = 12; // 12 AM
            return `${hoursCol}:${minutes.toString().padStart(2, '0')} ${periodCol}`;
        } else {
            // Formato 24 horas
            return `${hoursCol.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        }
    };

    // Función para enviar la lista actualizada (sin mensajes adicionales)
    const enviarLista = async () => {
        const horaColStr = calcularHoraCol(horaMex);
        const texto = `
──────⚔──────╮
┇➤ 4 𝐕𝐄𝐑𝐒𝐔𝐒 4
╰──────⚔──────╯

╭──────────────╮
┇➤ ⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎  
┇➤ 🇲🇽 𝐌𝐄𝐗 : ${horaMex || 'Por definir'}  
┇➤ 🇨🇴 𝐂𝐎𝐋 : ${horaColStr}  

┇➤ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: ${modalidad || 'Por definir'}  
┇➥ 𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔:  
┇➥ 👨🏻‍💻 ➤ ${equipo[0] || ''}
┇➥ 👨🏻‍💻 ➤ ${equipo[1] || ''}  
┇➥ 👨🏻‍💻 ➤ ${equipo[2] || ''}
┇➥ 👨🏻‍💻 ➤ ${equipo[3] || ''}  

┇➥ ʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄:  
┇➥ 👨🏻‍💼 ➤ ${suplentes[0] || ''}
┇➥ 👨🏻‍💼 ➤ ${suplentes[1] || ''}
╰─────────────╯

> 𝘽𝙊𝙇𝙄𝙇𝙇𝙊𝘽𝙊𝙏 / 𝙈𝙀𝙇𝘿𝙀𝙓𝙕𝙕.🥖`.trim();

        const buttons = [
            {
                buttonId: `${usedPrefix}4vs4 anotar`,
                buttonText: { displayText: "𝘑𝘶𝘨𝘢𝘥𝘰𝘳.🥖" },
                type: 1,
            },
            {
                buttonId: `${usedPrefix}4vs4 suplente`,
                buttonText: { displayText: "𝘚𝘶𝘱𝘭𝘦𝘯𝘵𝘦.🔄" },
                type: 1,
            },
            {
                buttonId: `${usedPrefix}4vs4 limpiar`,
                buttonText: { displayText: "𝘓𝘪𝘮𝘱𝘪𝘢𝘳 𝘭𝘪𝘴𝘵𝘢.🗑" },
                type: 1,
            },
        ];

        try {
            await conn.sendMessage(
                m.chat,
                {
                    text: texto,
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
> ¿𝘊ó𝘮𝘰 𝘶𝘴𝘢𝘳 𝘦𝘭 𝘤𝘰𝘮𝘢𝘯𝘥𝘰?
▸ 𝘗𝘢𝘳𝘢 𝘤𝘳𝘦𝘢𝘳 𝘭𝘢 𝘭𝘪𝘴𝘵𝘢 𝘤𝘰𝘯 𝘩𝘰𝘳𝘢 𝘺 𝘮𝘰𝘥𝘢𝘭𝘪𝘥𝘢𝘥:
▸ 𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .4𝘷𝘴4 21:00 𝘊𝘓𝘒 / 4𝘷𝘴4 9:00 𝘊𝘓𝘒
▸ 𝘜𝘯𝘢 𝘷𝘦𝘻 𝘦𝘴𝘵𝘢𝘣𝘭𝘦𝘤𝘪𝘥𝘢 𝘭𝘢 𝘩𝘰𝘳𝘢 𝘺 𝘮𝘰𝘥𝘢𝘭𝘪𝘥𝘢𝘥, 𝘶𝘴𝘢 𝘭𝘰𝘴 𝘣𝘰𝘵𝘰𝘯𝘦𝘴 𝘱𝘢𝘳𝘢 𝘢𝘯𝘰𝘵𝘢𝘳𝘵𝘦. 🥖
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
            horaMex = horaTemp;
            await m.reply(`⏰ *Hora establecida:* ${horaMex}\n🎮 *Modalidad:* ${modalidad}`);
            await enviarLista();
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
            await m.reply(`✅ *${nombre}* te has anotado como *TITULAR* (Posición ${index + 1})`);
            await enviarLista();
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
            await m.reply(`🔄 *${nombre}* te has anotado como *SUPLENTE* (Posición ${index + 1})`);
            await enviarLista();
        } else {
            await m.reply(`📢 *${nombre}*, los suplentes también están completos. Espera a que haya vacantes.`);
        }
        return;
    }

    // Limpiar lista
    if (args[0].toLowerCase() === 'limpiar') {
        equipo = Array(4).fill('');
        suplentes = Array(2).fill('');
        await m.reply('🧹 *Lista limpiada completamente.* Todos los puestos están vacantes ahora.');
        await enviarLista();
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
