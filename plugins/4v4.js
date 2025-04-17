let equipo = Array(4).fill(''); // 4 jugadores titulares
let suplentes = Array(2).fill(''); // 2 suplentes
let hora = '';
let modalidad = '';
let ultimoMensajeLista = null;

const handler = async (m, { conn, args, command, usedPrefix }) => {
    // Función para calcular horas MX/CO
    const calcularHoras = (horaInput) => {
        if (!horaInput) return { mx: '', co: '' };
        
        try {
            // Parsear hora (formato 12h o 24h)
            let [time, period] = horaInput.replace(/\./g, ':').split(/\s+/);
            let [hours, minutes] = time.split(':').map(Number);
            
            // Convertir a 24h si es necesario
            if (period?.toUpperCase() === 'PM' && hours < 12) hours += 12;
            if (period?.toUpperCase() === 'AM' && hours === 12) hours = 0;
            
            // Ajustar horas (Colombia +1h respecto a México)
            let mxHours = hours % 24;
            let coHours = (hours + 1) % 24;
            
            // Formatear a 12h para mostrar
            const format12h = (h) => {
                if (h === 0) return '12:00 AM';
                if (h < 12) return `${h}:${minutes.toString().padStart(2, '0')} AM`;
                if (h === 12) return `12:${minutes.toString().padStart(2, '0')} PM`;
                return `${h-12}:${minutes.toString().padStart(2, '0')} PM`;
            };
            
            return {
                mx: format12h(mxHours),
                co: format12h(coHours)
            };
        } catch (e) {
            console.error('Error calculando horas:', e);
            return { mx: horaInput, co: horaInput };
        }
    };

    // Eliminar mensaje anterior
    const eliminarMensajeAnterior = async () => {
        if (ultimoMensajeLista) {
            try {
                await conn.sendMessage(m.chat, { delete: ultimoMensajeLista.key });
            } catch (e) {
                console.error('Error eliminando mensaje anterior:', e);
            }
        }
    };

    // Enviar nueva lista
    const enviarLista = async (mensajeAdicional = '') => {
        const horas = calcularHoras(hora);
        const texto = `
──────⚔──────╮
┇➤ 4 𝐕𝐄𝐑𝐒𝐔𝐒 4
╰──────⚔──────╯

╭──────────────╮
┇➤ ⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎: ${hora || 'Por definir'}
┇➤ 🇲🇽 𝐌𝐄𝐗 : ${horas.mx}
┇➤ 🇨🇴 𝐂𝐎𝐋 : ${horas.co}  

┇➤ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: ${modalidad || 'Por definir'}
┇➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:  
┇➥ 𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔  
┇➥ 👨🏻‍💻 ➤ ${equipo[0] || 'Vacante'}
┇➥ 👨🏻‍💻 ➤ ${equipo[1] || 'Vacante'}  
┇➥ 👨🏻‍💻 ➤ ${equipo[2] || 'Vacante'}
┇➥ 👨🏻‍💻 ➤ ${equipo[3] || 'Vacante'}  

┇➥ ʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄:  
┇➥ 👨🏻‍💼 ➤ ${suplentes[0] || 'Vacante'}
┇➥ 👨🏻‍💼 ➤ ${suplentes[1] || 'Vacante'}  
╰──────────────╯

➤ 𝘽𝙊𝙇𝙄𝙇𝙇𝙊 𝘽𝙊𝙏 / 𝙈𝙀𝙇𝘿𝙀𝙓𝙕𝙕
`.trim();

        await eliminarMensajeAnterior();
        
        const buttons = [
            { buttonId: `${usedPrefix}4vs4 anotar`, buttonText: { displayText: "✏️ Anotarse (Titular)" }, type: 1 },
            { buttonId: `${usedPrefix}4vs4 suplente`, buttonText: { displayText: "🔄 Anotarse (Suplente)" }, type: 1 },
            { buttonId: `${usedPrefix}4vs4 limpiar`, buttonText: { displayText: "🗑 Limpiar Lista" }, type: 1 },
        ];

        const nuevoMensaje = await conn.sendMessage(
            m.chat,
            {
                text: mensajeAdicional ? `${mensajeAdicional}\n\n${texto}` : texto,
                buttons,
            },
            { quoted: m }
        );

        ultimoMensajeLista = nuevoMensaje;
    };

    // Comando sin argumentos
    if (!args[0]) {
        const instrucciones = `
──────⚔──────╮
┇➤ CÓMO USAR EL COMANDO
╰──────⚔──────╯

Ejemplo:
*${usedPrefix}4vs4 21:00 CLK*
o:
*${usedPrefix}4vs4 9:00 PM INFINITO*

Luego usa los botones para anotarte.
`.trim();
        await conn.sendMessage(m.chat, { text: instrucciones }, { quoted: m });
        return;
    }

    // Establecer hora y modalidad
    if (args.length >= 2 && !['anotar', 'suplente', 'limpiar'].includes(args[0].toLowerCase())) {
        const timeArg = args[0].replace(/\./g, ':');
        let horaTemp = timeArg;
        
        if (args[1] && ['AM', 'PM'].includes(args[1].toUpperCase())) {
            horaTemp += ' ' + args[1].toUpperCase();
            modalidad = args.slice(2).join(' ').toUpperCase();
        } else {
            modalidad = args.slice(1).join(' ').toUpperCase();
        }
        
        if (/(\d{1,2}:\d{2}|\d{1,2})\s*(AM|PM)?$/i.test(horaTemp)) {
            hora = horaTemp;
            await enviarLista(`⏰ Hora establecida: ${hora}\n🎮 Modalidad: ${modalidad}`);
        } else {
            await m.reply('❌ Formato de hora incorrecto. Usa:\n- 9:00 PM (12h)\n- 21:00 (24h)');
        }
        return;
    }

    // Anotarse como titular
    if (args[0].toLowerCase() === 'anotar') {
        const nombre = '@' + (m.pushName || m.sender.split('@')[0]);
        
        if (equipo.includes(nombre) || suplentes.includes(nombre)) {
            await m.reply(`❌ ${nombre} ya estás anotado.`);
            return;
        }
        
        const index = equipo.indexOf('');
        if (index !== -1) {
            equipo[index] = nombre;
            await enviarLista(`✅ ${nombre} anotado como TITULAR (Posición ${index + 1})`);
        } else {
            await m.reply(`📢 ${nombre}, equipo lleno. Usa *${usedPrefix}4vs4 suplente*`);
        }
        return;
    }

    // Anotarse como suplente
    if (args[0].toLowerCase() === 'suplente') {
        const nombre = '@' + (m.pushName || m.sender.split('@')[0]);
        
        if (equipo.includes(nombre) || suplentes.includes(nombre)) {
            await m.reply(`❌ ${nombre} ya estás anotado.`);
            return;
        }
        
        const index = suplentes.indexOf('');
        if (index !== -1) {
            suplentes[index] = nombre;
            await enviarLista(`🔄 ${nombre} anotado como SUPLENTE (Posición ${index + 1})`);
        } else {
            await m.reply(`📢 ${nombre}, suplentes llenos.`);
        }
        return;
    }

    // Limpiar lista
    if (args[0].toLowerCase() === 'limpiar') {
        equipo = Array(4).fill('');
        suplentes = Array(2).fill('');
        await enviarLista('🧹 Lista limpiada');
        return;
    }
}

handler.command = /^4vs4$/i;
handler.help = ['4vs4 [hora] [modalidad]'];
handler.tags = ['freefire'];
handler.group = true;
handler.admin = true;

export default handler;
