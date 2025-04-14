
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        return m.reply(`❗ Por favor, ingresa tu signo zodiacal.\n\nEjemplo: ${usedPrefix + command} aries`);
    }

    let signo = args[0].toLowerCase();

    // Horóscopos variados para cada signo
    let horoscopos = {
        aries: [
            "♈ *Aries*\nHoy sentirás una chispa de creatividad que te motivará a emprender nuevos proyectos. ¡Aprovecha esta energía positiva!",
            "♈ *Aries*\nLos desafíos se avecinan, pero confía en tu determinación. El trabajo duro te llevará a superar cualquier obstáculo.",
            "♈ *Aries*\nEn el amor, es momento de ser honesto con tus sentimientos. La comunicación abierta será clave para fortalecer tus relaciones."
        ],
        tauro: [
            "♉ *Tauro*\nHoy es un día perfecto para reflexionar sobre tus metas a largo plazo. Tu paciencia será recompensada.",
            "♉ *Tauro*\nLas finanzas requieren atención especial. Evita gastos innecesarios y enfócate en ahorrar para el futuro.",
            "♉ *Tauro*\nUna conversación inesperada podría llevarte a nuevas oportunidades. Escucha con atención a quienes te rodean."
        ],
        geminis: [
            "♊ *Géminis*\nTu mente estará llena de ideas brillantes. Anótalas para darles forma más adelante.",
            "♊ *Géminis*\nHoy es un buen día para reconectar con amigos que hace tiempo no ves. La nostalgia puede ser positiva.",
            "♊ *Géminis*\nEn el trabajo, evita tomar decisiones precipitadas. La calma y el análisis te guiarán por el camino correcto."
        ],
        cancer: [
            "♋ *Cáncer*\nLas emociones estarán a flor de piel. Busca momentos de tranquilidad para cuidar tu bienestar.",
            "♋ *Cáncer*\nEn el amor, es momento de valorar lo que tienes. La gratitud fortalecerá tus relaciones.",
            "♋ *Cáncer*\nHoy es un buen día para dedicar tiempo a tu familia. Su apoyo será fundamental para tus proyectos."
        ],
        leo: [
            "♌ *Leo*\nTu carisma brillará hoy y atraerás nuevas oportunidades. ¡Es tu momento para liderar!",
            "♌ *Leo*\nEl reconocimiento que esperabas está más cerca de lo que crees. No te detengas ahora.",
            "♌ *Leo*\nUna sorpresa agradable llegará a tu vida. Recíbela con gratitud y entusiasmo."
        ],
        virgo: [
            "♍ *Virgo*\nTu atención al detalle será crucial en tus tareas hoy. Confía en tu capacidad de organización.",
            "♍ *Virgo*\nUna buena noticia relacionada con el trabajo o estudios alegrará tu día. Celebra tus logros.",
            "♍ *Virgo*\nEs momento de cuidar de tu salud. Un cambio en tus hábitos traerá grandes beneficios."
        ],
        libra: [
            "♎ *Libra*\nBusca el equilibrio en tu vida diaria. La meditación o el ejercicio te ayudarán a encontrar la armonía.",
            "♎ *Libra*\nHoy es un buen día para resolver conflictos pendientes. La diplomacia será tu mejor aliada.",
            "♎ *Libra*\nEn el amor, la honestidad abrirá nuevas puertas. Expresa tus sentimientos sin miedo."
        ],
        escorpio: [
            "♏ *Escorpio*\nConfía en tu intuición. Hoy tendrás la claridad necesaria para tomar decisiones importantes.",
            "♏ *Escorpio*\nAlguien cercano necesitará tu apoyo. Brindar tu ayuda te fortalecerá emocionalmente.",
            "♏ *Escorpio*\nUn cambio inesperado podría sorprenderte, pero recuerda que cada desafío es una oportunidad para crecer."
        ],
        sagitario: [
            "♐ *Sagitario*\nTu espíritu aventurero te llevará a descubrir algo nuevo hoy. ¡Sigue explorando!",
            "♐ *Sagitario*\nEn el amor, es momento de arriesgarse. Escucha a tu corazón y sigue tus instintos.",
           "♐ _Sagitario_ \nHoy tendrás la oportunidad de aprender algo valioso. Abre tu mente a nuevas experiencias."
        ],
        capricornio: [
            "♑ _Capricornio_ \nLa disciplina será tu mayor fortaleza hoy. Usa tu determinación para avanzar en tus proyectos.",
            "♑ _Capricornio_ \nUn reconocimiento inesperado llegará pronto. Tu esfuerzo no ha pasado desapercibido.",
            "♑ _Capricornio_ \nEs momento de hacer un balance entre el trabajo y el descanso. Tu bienestar es una prioridad."
        ],
        acuario: [
            "♒ _Acuario_ \nTu creatividad estará en su punto máximo. Aprovecha este día para explorar nuevas ideas.",
            "♒ _Acuario_ \nEn el amor, una conexión inesperada podría sorprenderte. Mantén la mente abierta.",
            "♒ _Acuario_ \nHoy es un buen día para planificar un viaje o actividad que has estado posponiendo."
        ],
        piscis: [
            "♓ _Piscis_ \nTu sensibilidad será tu mayor fortaleza hoy. Usa tus emociones para crear algo hermoso.",
            "♓ _Piscis_ \nUna conversación sincera fortalecerá una relación importante para ti. Escucha con atención.",
            "♓ _Piscis_ \nDedica tiempo a tus sueños y aspiraciones. Los pequeños pasos te llevarán lejos."
        ]
    };

    // Seleccionar aleatoriamente un horóscopo para el signo ingresado
    let horoscopo = horoscopos[signo];
    if (!horoscopo) {
        return m.reply("❗ Signo zodiacal no válido. Por favor, ingresa un signo como: aries, tauro, geminis, etc.");
    }
    let mensaje = horoscopo[Math.floor(Math.random() * horoscopo.length)];

    // Enviar el horóscopo al usuario
    await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
};

handler.help = ['horoscopo'];
handler.tags = ['diversion'];
handler.command = /^(horoscopo|zodiaco)$/i;

export default handler;
