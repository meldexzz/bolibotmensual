
let handler = async (m, { conn, args, usedPrefix, command }) => {
    // Validar que el usuario ingrese un signo zodiacal
    if (!args[0]) {
        return m.reply(`❗ Por favor, ingresa tu signo zodiacal.\n\nEjemplo: ${usedPrefix + command} aries`);
    }

  
    let signo = args[0].toLowerCase();

    let horoscopos = {
        aries: "♈ *Aries*\nTu energía y entusiasmo te llevarán lejos hoy. ¡Confía en tus capacidades y persigue tus metas con valentía!",
        tauro: "♉ *Tauro*\nLa paciencia será tu mejor aliada. Mantén la calma y encontrarás soluciones prácticas a los desafíos que enfrentas.",
        geminis: "♊ *Géminis*\nLa comunicación será clave hoy. Aprovecha tu carisma para construir conexiones significativas.",
        cancer: "♋ *Cáncer*\nEscucha tus emociones y busca momentos de tranquilidad. La introspección te ayudará a encontrar claridad.",
        leo: "♌ *Leo*\nTu liderazgo brillará. Comparte tu entusiasmo y guía a otros hacia un camino positivo.",
        virgo: "♍ *Virgo*\nPresta atención a los detalles en tus proyectos. Tu habilidad para organizar será fundamental.",
        libra: "♎ *Libra*\nBusca el equilibrio en tus relaciones y decisiones. La armonía será clave para tu bienestar.",
        escorpio: "♏ *Escorpio*\nConfía en tu intuición. Hoy será un buen día para explorar tus emociones más profundas.",
        sagitario: "♐ *Sagitario*\nTu espíritu aventurero te llevará a descubrir nuevas oportunidades. ¡Atrévete a salir de tu zona de confort!",
        capricornio: "♑ *Capricornio*\nTu dedicación y disciplina te ayudarán a superar cualquier obstáculo. Mantén el enfoque.",
        acuario: "♒ *Acuario*\nTu creatividad será inspiradora. Aprovecha tus ideas innovadoras para marcar la diferencia.",
        piscis: "♓ *Piscis*\nBusca momentos de conexión espiritual. Tu sensibilidad será una fortaleza en tus relaciones."
    };

    let horoscopo = horoscopos[signo];
    if (!horoscopo) {
        return m.reply("❗ Signo zodiacal no válido. Por favor, ingresa un signo como: aries, tauro, geminis, etc.");
    }
    await conn.sendMessage(m.chat, { text: horoscopo }, { quoted: m });
};

handler.help = ['horoscopo'];
handler.tags = ['fun'];
handler.command = /^(horoscopo|zodiaco)$/i;

export default handler;