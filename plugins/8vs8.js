let escuadra1 = Array(4).fill(''); // Escuadra 1 (4 jugadores)
let escuadra2 = Array(4).fill(''); // Escuadra 2 (4 jugadores)
let suplentes = Array(2).fill(''); // 2 suplentes
let horaMex = '';
let modalidad = '';
let ropa = '';

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
┇➤ 👕 𝐑𝐎𝐏𝐀: ${ropa || 'Por definir'}

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
> ¿𝘊ó𝘮𝘰 𝘶𝘴𝘢𝘳 𝘦𝘭 𝘤𝘰𝘮𝘢𝘯𝘥𝘰?

▸ 𝘗𝘢𝘳𝘢 𝘤𝘳𝘦𝘢𝘳 𝘭𝘢 𝘭𝘪𝘴𝘵𝘢 𝘤𝘰𝘯 𝘩𝘰𝘳𝘢, 𝘮𝘰𝘥𝘢𝘭𝘪𝘥𝘢𝘥 𝘺 𝘳𝘰𝘱𝘢:
▸ .8𝘷𝘴8 21:00 𝘊𝘓𝘒 𝘙𝘰𝘱𝘢:𝘊𝘢𝘮𝘶𝘧𝘭𝘢𝘫𝘦
▸ .8𝘷𝘴8 9:00 𝘗𝘔 𝘊𝘓𝘒 𝘙𝘰𝘱𝘢:𝘝𝘦𝘳𝘥𝘦
▸ 𝘜𝘯𝘢 𝘷𝘦𝘻 𝘦𝘴𝘵𝘢𝘣𝘭𝘦𝘤𝘪𝘥𝘢, 𝘶𝘴𝘢 𝘭𝘰𝘴 𝘣𝘰𝘵𝘰𝘯𝘦𝘴 𝘱𝘢𝘳𝘢 𝘢𝘯𝘰𝘵𝘢𝘳𝘵𝘦. 🥖
        `.trim();
        await conn.sendMessage(m.chat, { text: instrucciones }, { quoted: m });
        return;
    }

    // Procesar hora, modalidad y ropa
    if (args.length >= 2 && !['escuadra1', 'escuadra2', 'suplente', 'limpiar'].includes(args[0].toLowerCase())) {
        const timeArg = args[0];
        let horaTemp = timeArg;
        let ropaIndex = args.findIndex(arg => arg.toLowerCase().startsWith('ropa:'));
        
        if (ropaIndex !== -1) {
            ropa = args.slice(ropaIndex).join(' ').substring(5).trim();
            args = args.slice(0, ropaIndex);
        }
        
        if (args[1] && ['AM', 'PM'].includes(args[1].toUpperCase())) {
            horaTemp += ' ' + args[1].toUpperCase();
            modalidad = args.slice(2).join(' ').toUpperCase();
        } else {
            modalidad = args.slice(1).join(' ').toUpperCase();
        }
        
        if (/(\d{1,2}:\d{2}|\d{1,2})\s*(AM|PM)?$/i.test(horaTemp)) {
            horaMex = horaTemp;
            await m.reply(`> ⏰ _𝘏𝘰𝘳𝘢 𝘦𝘴𝘵𝘢𝘣𝘭𝘦𝘤𝘪𝘥𝘢:_ ${horaMex}\n> 🎮 _𝘔𝘰𝘥𝘢𝘭𝘪𝘥𝘢𝘥:_ ${modalidad}\n> 👕 _𝘙𝘰𝘱𝘢:_ ${ropa || 'Por definir'}`);
            await enviarLista();
        } else {
            await m.reply('> ❌ _𝘍𝘰𝘳𝘮𝘢𝘵𝘰 𝘥𝘦 𝘩𝘰𝘳𝘢 𝘪𝘯𝘤𝘰𝘳𝘳𝘦𝘤𝘵𝘰._ 𝘜𝘴𝘢:\n- _9:00 𝘗𝘔_ (12𝘩)\n- _21:00_ (24𝘩)');
        }
        return;
    }

    // Anotarse en Escuadra 1 (¡PARA TODOS!)
    if (args[0].toLowerCase() === 'escuadra1') {
        const nombre = '@' + (m.pushName || m.sender.split('@')[0]);
        
        if (escuadra1.includes(nombre) || escuadra2.includes(nombre) || suplentes.includes(nombre)) {
            await m.reply(`> ❌ _${nombre}_ 𝘠𝘢 𝘦𝘴𝘵𝘢𝘴 𝘢𝘯𝘰𝘵𝘢𝘥𝘰 𝘦𝘯 𝘭𝘢 𝘭𝘪𝘴𝘵𝘢.🥖`);
            return;
        }
        
        const index = escuadra1.indexOf('');
        if (index !== -1) {
            escuadra1[index] = nombre;
            await m.reply(`> ✅ _${nombre}_ 𝘛𝘦 𝘩𝘢𝘴 𝘢𝘯𝘰𝘵𝘢𝘥𝘰 𝘦𝘯 𝘭𝘢 _𝘌𝘴𝘤𝘶𝘢𝘥𝘳𝘢 1_ (𝘗𝘰𝘴𝘪𝘤𝘪ó𝘯 ${index + 1})`);
            await enviarLista();
        } else {
            await m.reply(`> 📢 _${nombre}_, 𝘭𝘢 _𝘌𝘴𝘤𝘶𝘢𝘥𝘳𝘢 1_ 𝘦𝘴𝘵á 𝘤𝘰𝘮𝘱𝘭𝘦𝘵𝘢. ¿𝘘𝘶𝘪𝘦𝘳𝘦𝘴 𝘶𝘯𝘪𝘳𝘵𝘦 𝘢 𝘭𝘢 _𝘌𝘴𝘤𝘶𝘢𝘥𝘳𝘢 2_?`);
        }
        return;
    }

    // Anotarse en Escuadra 2 (¡PARA TODOS!)
    if (args[0].toLowerCase() === 'escuadra2') {
        const nombre = '@' + (m.pushName || m.sender.split('@')[0]);
        
        if (escuadra1.includes(nombre) || escuadra2.includes(nombre) || suplentes.includes(nombre)) {
            await m.reply(`> ❌ _${nombre}_ 𝘠𝘢 𝘦𝘴𝘵𝘢𝘴 𝘢𝘯𝘰𝘵𝘢𝘥𝘰 𝘦𝘯 𝘭𝘢 𝘭𝘪𝘴𝘵𝘢.🥖`);
            return;
        }
        
        const index = escuadra2.indexOf('');
        if (index !== -1) {
            escuadra2[index] = nombre;
            await m.reply(`> ✅ _${nombre}_ 𝘛𝘦 𝘩𝘢𝘴 𝘢𝘯𝘰𝘵𝘢𝘥𝘰 𝘦𝘯 𝘭𝘢 _𝘌𝘴𝘤𝘶𝘢𝘥𝘳𝘢 2_ (𝘗𝘰𝘴𝘪𝘤𝘪ó𝘯 ${index + 1})`);
            await enviarLista();
        } else {
            await m.reply(`> 📢 _${nombre}_, 𝘭𝘢 _𝘌𝘴𝘤𝘶𝘢𝘥𝘳𝘢 2_ 𝘦𝘴𝘵á 𝘤𝘰𝘮𝘱𝘭𝘦𝘵𝘢. ¿𝘘𝘶𝘪𝘦𝘳𝘦𝘴 𝘢𝘯𝘰𝘵𝘢𝘳𝘵𝘦 𝘤𝘰𝘮𝘰 𝘴𝘶𝘱𝘭𝘦𝘯𝘵𝘦?`);
        }
        return;
    }

    // Anotarse como suplente (¡PARA TODOS!)
    if (args[0].toLowerCase() === 'suplente') {
        const nombre = '@' + (m.pushName || m.sender.split('@')[0]);
        
        if (escuadra1.includes(nombre) || escuadra2.includes(nombre) || suplentes.includes(nombre)) {
            await m.reply(`> ❌ _${nombre}_ 𝘠𝘢 𝘦𝘴𝘵𝘢𝘴 𝘢𝘯𝘰𝘵𝘢𝘥𝘰 𝘦𝘯 𝘭𝘢 𝘭𝘪𝘴𝘵𝘢.🥖`);
            return;
        }
        
        const index = suplentes.indexOf('');
        if (index !== -1) {
            suplentes[index] = nombre;
            await m.reply(`> 🔄 _${nombre}_ 𝘛𝘦 𝘩𝘢𝘴 𝘢𝘯𝘰𝘵𝘢𝘥𝘰 𝘤𝘰𝘮𝘰 _𝘚𝘜𝘗𝘓𝘌𝘕𝘛𝘌_ (𝘗𝘰𝘴𝘪𝘤𝘪ó𝘯 ${index + 1})`);
            await enviarLista();
        } else {
            await m.reply(`> 📢 _${nombre}_, 𝘭𝘰𝘴 _𝘚𝘶𝘱𝘭𝘦𝘯𝘵𝘦𝘴_ 𝘵𝘢𝘮𝘣𝘪é𝘯 𝘦𝘴𝘵á𝘯 𝘤𝘰𝘮𝘱𝘭𝘦𝘵𝘰𝘴.`);
        }
        return;
    }

    // Limpiar lista (¡AHORA PARA TODOS!)
    if (args[0].toLowerCase() === 'limpiar') {
        escuadra1 = Array(4).fill('');
        escuadra2 = Array(4).fill('');
        suplentes = Array(2).fill('');
        ropa = '';
        await m.reply('> 🧹 _𝘓𝘐𝘚𝘛𝘈 𝘓𝘐𝘔𝘗𝘐𝘈𝘋𝘈 𝘊𝘖𝘔𝘗𝘓𝘌𝘛𝘈𝘔𝘌𝘕𝘛𝘌. 𝘛𝘖𝘋𝘖𝘚 𝘓𝘖𝘚 𝘗𝘜𝘌𝘚𝘛𝘖𝘚 𝘌𝘚𝘛𝘈𝘕 𝘝𝘈𝘊𝘐𝘖𝘚._');
        await enviarLista();
        return;
    }
}

handler.command = /^8vs8$/i;
handler.help = [
    '8vs8 [hora] [modalidad] [ropa:color] - Establece hora, modalidad y ropa',
    '8vs8 escuadra1 - Anotarse en Escuadra 1',
    '8vs8 escuadra2 - Anotarse en Escuadra 2',
    '8vs8 suplente - Anotarse como suplente',
    '8vs8 limpiar - Vaciar todas las posiciones'
];
handler.tags = ['freefire'];
handler.group = true;

export default handler;
