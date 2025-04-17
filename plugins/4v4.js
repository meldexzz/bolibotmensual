let equipo = Array(4).fill(''); // 4 titulares
let suplentes = Array(2).fill(''); // 2 suplentes
let hora = '';
let modalidad = '';

// Función para calcular horas MX y CO
const calcularHoras = (horaInput) => {
    if (!horaInput) return { mx: 'Sin definir', co: 'Sin definir' };

    try {
        let [time, period] = horaInput.replace(/\./g, ':').split(/\s+/);
        let [hours, minutes = '00'] = time.split(':').map(Number);

        // Convertir a formato 24h
        if (period?.toUpperCase() === 'PM' && hours < 12) hours += 12;
        if (period?.toUpperCase() === 'AM' && hours === 12) hours = 0;

        // Ajustar para Colombia (+1 hora)
        const mxHours = hours % 24;
        const coHours = (hours + 1) % 24;

        const formato12h = (h) => {
            const ampm = h >= 12 ? 'PM' : 'AM';
            const h12 = h % 12 || 12;
            return `${h12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        };

        return {
            mx: formato12h(mxHours),
            co: formato12h(coHours)
        };
    } catch (e) {
        console.error('Error al calcular horas:', e);
        return { mx: horaInput, co: horaInput };
    }
};

const handler = async (m, { conn, args, command, usedPrefix }) => {
    // Función para generar el diseño de la lista
    const generarLista = () => {
        const { mx, co } = calcularHoras(hora);

        return `
──────⚔──────╮
┇➤ 4 𝐕𝐄𝐑𝐒𝐔𝐒 4
╰──────⚔──────╯

╭──────────────╮
┇➤ ⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎: ${hora || 'Por definir'}
┇➤ 🇲🇽 𝐌𝐄𝐗 : ${mx}
┇➤ 🇨🇴 𝐂𝐎𝐋 : ${co}  

┇➤ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: ${modalidad || 'Por definir'}
┇➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:  
┇➥ 𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔  
${equipo.map((j, i) => `┇➥ 👨🏻‍💻 ➤ ${j || `Posición ${i+1} (Vacante)`}`).join('\n')}  

┇➥ ʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄:  
${suplentes.map((s, i) => `┇➥ 👨🏻‍💼 ➤ ${s || `Suplente ${i+1} (Vacante)`}`).join('\n')}  
╰──────────────╯

➤ 𝘽𝙊𝙇𝙄𝙇𝙇𝙊 𝘽𝙊𝙏 / 𝙈𝙀𝙇𝘿𝙀𝙓𝙕𝙕
`.trim();
    };

    // Función para enviar la lista con botones
    const enviarLista = async (mensajeAdicional = '') => {
        const textoLista = generarLista();
        const buttons = [
            { buttonId: `${usedPrefix}4vs4 anotar`, buttonText: { displayText: "✏️ Anotar Titular" }, type: 1 },
            { buttonId: `${usedPrefix}4vs4 suplente`, buttonText: { displayText: "🔄 Anotar Suplente" }, type: 1 },
            { buttonId: `${usedPrefix}4vs4 limpiar`, buttonText: { displayText: "🗑 Limpiar Lista" }, type: 1 },
        ];

        await conn.sendMessage(
            m.chat,
            {
                text: mensajeAdicional ? `${mensajeAdicional}\n\n${textoLista}` : textoLista,
                buttons,
                mentions: [...equipo, ...suplentes].filter(u => u.startsWith('@')).map(u => u + '@s.whatsapp.net')
            },
            { quoted: m }
        );
    };

    // ====== COMANDOS PRINCIPALES ====== //
    // 1. Mostrar instrucciones
    if (!args[0]) {
        const instrucciones = `
⚠️ *¿CÓMO USAR EL COMANDO?* ⚠️

1️⃣ *Para crear la lista:*
   Ejemplo: *${usedPrefix}4vs4 21:00 CLK*
   o: *${usedPrefix}4vs4 9:00 PM INFINITO*

2️⃣ *Usa los botones para:*
   - ✏️ Anotarte como Titular
   - 🔄 Anotarte como Suplente
   - 🗑 Limpiar la lista
`.trim();
        await conn.sendMessage(m.chat, { text: instrucciones }, { quoted: m });
        return;
    }

    // 2. Establecer hora y modalidad
    if (args.length >= 2 && !['anotar', 'suplente', 'limpiar'].includes(args[0].toLowerCase())) {
        hora = args[0].replace(/\./g, ':');
        modalidad = args.slice(1).join(' ').toUpperCase();
        await enviarLista(`⏰ *Hora establecida:* ${hora}\n🎮 *Modalidad:* ${modalidad}`);
        return;
    }

    // 3. Anotar Titular
    if (args[0].toLowerCase() === 'anotar') {
        const nombre = `@${m.pushName || m.sender.split('@')[0]}`;
        
        if (equipo.includes(nombre) || suplentes.includes(nombre)) {
            await m.reply(`❌ *${nombre}* ya estás registrado.`);
            return;
        }

        const index = equipo.indexOf('');
        if (index !== -1) {
            equipo[index] = nombre;
            await enviarLista(`✅ *${nombre}* anotado como **Titular** (Posición ${index + 1})`);
        } else {
            await m.reply(`📢 *${nombre}*, equipo lleno. Usa *${usedPrefix}4vs4 suplente*`);
        }
        return;
    }

    // 4. Anotar Suplente
    if (args[0].toLowerCase() === 'suplente') {
        const nombre = `@${m.pushName || m.sender.split('@')[0]}`;
        
        if (equipo.includes(nombre) || suplentes.includes(nombre)) {
            await m.reply(`❌ *${nombre}* ya estás registrado.`);
            return;
        }

        const index = suplentes.indexOf('');
        if (index !== -1) {
            suplentes[index] = nombre;
            await enviarLista(`🔄 *${nombre}* anotado como **Suplente** (Posición ${index + 1})`);
        } else {
            await m.reply(`⚠️ *${nombre}*, no hay espacios para suplentes.`);
        }
        return;
    }

    // 5. Limpiar lista
    if (args[0].toLowerCase() === 'limpiar') {
        equipo = Array(4).fill('');
        suplentes = Array(2).fill('');
        await enviarLista('🧹 *¡Lista reiniciada!* Todos los puestos están vacantes.');
        return;
    }
};

// Configuración del handler
handler.command = /^4vs4$/i;
handler.group = true;
handler.admin = true;
export default handler;
