let escuadra1 = Array(4).fill(''); // Escuadra 1 (4 jugadores)
let escuadra2 = Array(4).fill(''); // Escuadra 2 (4 jugadores)
let suplentes = Array(2).fill(''); // 2 suplentes
let horaMex = '';
let modalidad = '';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    // Función para calcular hora Colombia (1 hora adelante de México)
    const calcularHoraCol = (horaMex) => {
        if (!horaMex) return 'Por definir';
        
        const [time, period] = horaMex.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        
        let hoursCol = hours + 1;
        if (hoursCol >= 24) hoursCol -= 24;
        
        if (horaMex.includes('AM') || horaMex.includes('PM')) {
            let periodCol = 'AM';
            if (hoursCol >= 12) {
                periodCol = 'PM';
                if (hoursCol > 12) hoursCol -= 12;
            }
            if (hoursCol === 0) hoursCol = 12;
            return `${hoursCol}:${minutes.toString().padStart(2, '0')} ${periodCol}`;
        } else {
            return `${hoursCol.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        }
    };

    // Función para enviar la lista actualizada
    const enviarLista = async () => {
        const horaColStr = calcularHoraCol(horaMex);
        const texto = `
╭──────⚔──────╮
┇➤ 8 𝐕𝐄𝐑𝐒𝐔𝐒 8
╰──────⚔──────╯

╭──────────────╮
┇➤ ⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎  
┇➤ 🇲🇽 𝐌𝐄𝐗 : ${horaMex || 'Por definir'}  
┇➤ 🇨🇴 𝐂𝐎𝐋 : ${horaColStr}  

┇➤ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: ${modalidad || 'Por definir'}  

┇➥ 𝗘𝘀𝗰𝘂𝗮𝗱𝗿𝗮 𝟭:  
┇➥ 👨🏻‍💻 ➤ ${escuadra1[0] || ''}
┇➥ 👨🏻‍💻 ➤ ${escuadra1[1] || ''}  
┇➥ 👨🏻‍💻 ➤ ${escuadra1[2] || ''}
┇➥ 👨🏻‍💻 ➤ ${escuadra1[3] || ''}

┇➥ 𝗘𝘀𝗰𝘂𝗮𝗱𝗿𝗮 𝟮:  
┇➥ 👨🏻‍💻 ➤ ${escuadra2[0] || ''}
┇➥ 👨🏻‍💻 ➤ ${escuadra2[1] || ''}  
┇➥ 👨🏻‍💻 ➤ ${escuadra2[2] || ''}
┇➥ 👨🏻‍💻 ➤ ${escuadra2[3] || ''}

┇➥ ʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄:  
┇➥ 👨🏻‍💼 ➤ ${suplentes[0] || ''}
┇➥ 👨🏻‍💼 ➤ ${suplentes[1] || ''}
╰─────────────╯

> 𝘽𝙊𝙇𝙄𝙇𝙇𝙊𝘽𝙊𝙏 / 𝙈𝙀𝙇𝘿𝙀𝙓𝙕𝙕.🥖`.trim();

        const buttons = [
            {
                buttonId: `${usedPrefix}8vs8 escuadra1`,
                buttonText: { displayText: "𝗘𝘀𝗰𝘂𝗮𝗱𝗿𝗮 𝟭.⚔️" },
                type: 1,
            },
            {
                buttonId: `${usedPrefix}8vs8 escuadra2`,
                buttonText: { displayText: "𝗘𝘀𝗰𝘂𝗮𝗱𝗿𝗮 𝟮.⚔️" },
                type: 1,
            },
            {
                buttonId: `${usedPrefix}8vs8 suplente`,
                buttonText: { displayText: "𝘚𝘶𝘱𝘭𝘦𝘯𝘵𝘦.🔄" },
                type: 1,
            },
            {
                buttonId: `${usedPrefix}8vs8 limpiar`,
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
> ¿Cómo usar el comando?

▸ Para crear la lista con hora y modalidad:
▸ .8vs8 21:00 CLK 
▸ .8vs8 9:00 PM CLK
▸ Una vez establecida la hora y modalidad, usa los botones para anotarte en la escuadra que prefieras. 🥖
        `.trim();
        await conn.sendMessage(m.chat, { text: instrucciones }, { quoted: m });
        return;
    }

    // Procesar hora y modalidad
    if (args.length >= 2 && !['escuadra1', 'escuadra2', 'suplente', 'limpiar'].includes(args[0].toLowerCase())) {
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

    // Anotarse en Escuadra 1
    if (args[0].toLowerCase() === 'escuadra1') {
        const nombre = '@' + (m.pushName || m.sender.split('@')[0]);
        
        if (escuadra1.includes(nombre) || escuadra2.includes(nombre) || suplentes.includes(nombre)) {
            await m.reply(`❌ *${nombre}* ya estás anotado en la lista.`);
            return;
        }
        
        const index = escuadra1.indexOf('');
        if (index !== -1) {
            escuadra1[index] = nombre;
            await m.reply(`✅ *${nombre}* te has anotado en la *Escuadra 1* (Posición ${index + 1})`);
            await enviarLista();
        } else {
            await m.reply(`📢 *${nombre}*, la Escuadra 1 está completa. ¿Quieres unirte a la Escuadra 2?`);
        }
        return;
    }

    // Anotarse en Escuadra 2
    if (args[0].toLowerCase() === 'escuadra2') {
        const nombre = '@' + (m.pushName || m.sender.split('@')[0]);
        
        if (escuadra1.includes(nombre) || escuadra2.includes(nombre) || suplentes.includes(nombre)) {
            await m.reply(`❌ *${nombre}* ya estás anotado en la lista.`);
            return;
        }
        
        const index = escuadra2.indexOf('');
        if (index !== -1) {
            escuadra2[index] = nombre;
            await m.reply(`✅ *${nombre}* te has anotado en la *Escuadra 2* (Posición ${index + 1})`);
            await enviarLista();
        } else {
            await m.reply(`📢 *${nombre}*, la Escuadra 2 está completa. ¿Quieres anotarte como suplente?`);
        }
        return;
    }

    // Anotarse como suplente
    if (args[0].toLowerCase() === 'suplente') {
        const nombre = '@' + (m.pushName || m.sender.split('@')[0]);
        
        if (escuadra1.includes(nombre) || escuadra2.includes(nombre) || suplentes.includes(nombre)) {
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
        escuadra1 = Array(4).fill('');
        escuadra2 = Array(4).fill('');
        suplentes = Array(2).fill('');
        await m.reply('🧹 *Lista limpiada completamente.* Todos los puestos están vacantes ahora.');
        await enviarLista();
        return;
    }
}

handler.command = /^8vs8$/i;
handler.help = [
    '8vs8 [hora] [modalidad] - Establece hora y modalidad',
    '8vs8 escuadra1 - Anotarse en Escuadra 1',
    '8vs8 escuadra2 - Anotarse en Escuadra 2',
    '8vs8 suplente - Anotarse como suplente',
    '8vs8 limpiar - Vaciar todas las posiciones'
];
handler.tags = ['freefire'];
handler.group = true;
handler.admin = true;

export default handler;
