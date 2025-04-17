let equipo = Array(4).fill(''); // 4 titulares
let suplentes = Array(2).fill(''); // 2 suplentes
let hora = '';
let modalidad = '';

const calcularHoras = (horaInput) => {
    if (!horaInput) return { mx: '', co: '' };
    
    try {
        let [time, period] = horaInput.replace(/\./g, ':').split(/\s+/);
        let [hours, minutes = '00'] = time.split(':').map(Number);
        
        if (period?.toUpperCase() === 'PM' && hours < 12) hours += 12;
        if (period?.toUpperCase() === 'AM' && hours === 12) hours = 0;
        
        const mxHours = hours % 24;
        const coHours = (hours + 1) % 24;
        
        const formatHora = (h) => {
            const ampm = h >= 12 ? 'PM' : 'AM';
            const h12 = h % 12 || 12;
            return `${h12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        };
        
        return {
            mx: formatHora(mxHours),
            co: formatHora(coHours)
        };
    } catch (e) {
        console.error('Error calculando horas:', e);
        return { mx: horaInput, co: horaInput };
    }
};

const handler = async (m, { conn, args, command, usedPrefix }) => {
    const enviarLista = async (mensaje = '') => {
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
${equipo.map((j, i) => `┇➥ 👨🏻‍💻 ➤ ${j || `Posición ${i+1} (Vacante)`}`).join('\n')}  

┇➥ ʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄:  
${suplentes.map((s, i) => `┇➥ 👨🏻‍💼 ➤ ${s || `Suplente ${i+1} (Vacante)`}`).join('\n')}  
╰──────────────╯

➤ 𝘽𝙊𝙇𝙄𝙇𝙇𝙊 𝘽𝙊𝙏 / 𝙈𝙀𝙇𝘿𝙀𝙓𝙕𝙕
`.trim();

        const buttons = [
            { buttonId: `${usedPrefix}4vs4 anotar`, buttonText: { displayText: "✏️ Anotar Titular" }, type: 1 },
            { buttonId: `${usedPrefix}4vs4 suplente`, buttonText: { displayText: "🔄 Anotar Suplente" }, type: 1 },
            { buttonId: `${usedPrefix}4vs4 limpiar`, buttonText: { displayText: "🗑️ Limpiar Lista" }, type: 1 }
        ];

        await conn.sendMessage(m.chat, { 
            text: mensaje ? `${mensaje}\n\n${texto}` : texto,
            buttons: buttons,
            footer: 'Selecciona una opción:',
            mentions: [...equipo, ...suplentes].filter(Boolean).map(u => u.replace('@', '') + '@s.whatsapp.net')
        }, { quoted: m });
    };

    // Comando sin argumentos
    if (!args[0]) {
        await enviarLista();
        return;
    }

    // Establecer hora y modalidad
    if (args.length >= 2 && !['anotar', 'suplente', 'limpiar'].includes(args[0].toLowerCase())) {
        hora = args[0].replace(/\./g, ':');
        modalidad = args.slice(1).join(' ').toUpperCase();
        await enviarLista(`⏰ Hora: ${hora}\n🎮 Modalidad: ${modalidad}`);
        return;
    }

    const nombre = '@' + (m.pushName || m.sender.split('@')[0]);

    if (args[0].toLowerCase() === 'anotar') {
        if (equipo.includes(nombre) || suplentes.includes(nombre)) {
            await m.reply(`❌ ${nombre} ya estás registrado!`);
            return;
        }
        
        const index = equipo.indexOf('');
        if (index !== -1) {
            equipo[index] = nombre;
            await enviarLista(`✅ ${nombre} ahora es TITULAR (Posición ${index+1})`);
        } else {
            await m.reply(`📢 ${nombre}, equipo lleno! Usa *${usedPrefix}4vs4 suplente*`);
        }
        return;
    }

    if (args[0].toLowerCase() === 'suplente') {
        if (equipo.includes(nombre) || suplentes.includes(nombre)) {
            await m.reply(`❌ ${nombre} ya estás registrado!`);
            return;
        }
        
        const index = suplentes.indexOf('');
        if (index !== -1) {
            suplentes[index] = nombre;
            await enviarLista(`🔄 ${nombre} ahora es SUPLENTE`);
        } else {
            await m.reply('⚠️ Todos los puestos están llenos!');
        }
        return;
    }

    if (args[0].toLowerCase() === 'limpiar') {
        equipo = Array(4).fill('');
        suplentes = Array(2).fill('');
        await enviarLista('🧹 LISTA REINICIADA');
        return;
    }
};

handler.command = /^4vs4$/i;
handler.group = true;
handler.admin = true;
export default handler;
