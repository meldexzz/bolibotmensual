import fetch from 'node-fetch';

let tiktokSessions = new Map();

const tiktokHandler = async (m, { conn, command, args, usedPrefix }) => {
    let query = args.join(' ').trim();

    let session = tiktokSessions.get(m.chat) || {
        videos: [],
        currentIndex: 0,
        query: query || ''
    };

    if (command === 'tksearch') {
        if (!query) {
            return conn.reply(
                m.chat,
                `> 𝘌𝘴𝘤𝘳𝘪𝘣𝘦 𝘦𝘭 𝘵𝘪𝘬𝘵𝘰𝘬 𝘲𝘶𝘦 𝘥𝘦𝘴𝘦𝘢𝘴 𝘣𝘶𝘴𝘤𝘢𝘳.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘵𝘬𝘴𝘦𝘢𝘳𝘤𝘩 𝘷𝘪𝘥𝘦𝘰𝘴 𝘥𝘦 𝘣𝘰𝘭𝘪𝘭𝘭𝘰𝘴.🥖 `,
                m
            );
        }

        session = { videos: [], currentIndex: 0, query: query };
        tiktokSessions.set(m.chat, session);

        try {
            const apiUrl = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent(query)}`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (!data.meta || !data.meta.length) {
                return conn.reply(m.chat, '> 𝘕𝘰 𝘴𝘦 𝘦𝘯𝘤𝘰𝘯𝘵𝘳𝘢𝘳𝘰𝘯 𝘷𝘪𝘥𝘦𝘰𝘴.🥖', m);
            }

            session.videos = data.meta;
            tiktokSessions.set(m.chat, session);

            return await sendVideoWithButtons(session, m, conn, usedPrefix);
        } catch (error) {
            console.error(error);
            return conn.reply(m.chat, '> 𝘕𝘰 𝘴𝘦 𝘦𝘯𝘤𝘰𝘯𝘵𝘳𝘢𝘳𝘰𝘯 𝘷𝘪𝘥𝘦𝘰𝘴.🥖', m);
        }
    }

    if (command === 'tkseguir') {
        if (!session.videos.length) {
            return conn.reply(m.chat, '> 𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘵𝘬𝘴𝘦𝘢𝘳𝘤𝘩 𝘷𝘪𝘥𝘦𝘰𝘴 𝘥𝘦 𝘣𝘰𝘭𝘪𝘭𝘭𝘰𝘴.🥖', m);
        }

        if (session.currentIndex + 1 >= session.videos.length) {
            return conn.reply(m.chat, '> 𝘕𝘰 𝘴𝘦 𝘦𝘯𝘤𝘰𝘯𝘵𝘳𝘢𝘳𝘰𝘯 𝘮𝘢𝘴 𝘷𝘪𝘥𝘦𝘰𝘴.🥖', m);
        }

        session.currentIndex += 1;
        tiktokSessions.set(m.chat, session);
        return await sendVideoWithButtons(session, m, conn, usedPrefix);
    }
};

async function sendVideoWithButtons(session, m, conn, usedPrefix) {
    const video = session.videos[session.currentIndex];

    const caption = session.currentIndex === 0 
        ? `> ¡𝘜𝘴𝘢 𝘦𝘭 𝘣𝘰𝘵ó𝘯 𝘱𝘢𝘳𝘢 𝘷𝘦𝘳 𝘮𝘢𝘴 𝘷𝘪𝘥𝘦𝘰𝘴!.🥖\n\n> 𝘊𝘰𝘥𝘦 𝘤𝘳𝘦𝘢𝘵𝘦𝘥 𝘣𝘺 𝘔𝘦𝘭𝘥𝘦𝘹𝘻𝘻.`
        : `> 𝘊ó𝘥𝘪𝘨𝘰 𝘤𝘳𝘦𝘢𝘥𝘰 ú𝘯𝘪𝘤𝘢𝘮𝘦𝘯𝘵𝘦 𝘱𝘢𝘳𝘢 𝘉𝘰𝘭𝘪𝘭𝘭𝘰𝘉𝘰𝘵.🥖`;

    try {
        const buttons = [];
        
        if (session.currentIndex + 1 < session.videos.length) {
            buttons.push({
                buttonId: `${usedPrefix}tkseguir`,
                buttonText: { displayText: "𝘚𝘪𝘨𝘶𝘪𝘦𝘯𝘵𝘦 𝘷𝘪𝘥𝘦𝘰.🥖" },
                type: 1
            });
        }

        await conn.sendMessage(
            m.chat,
            {
                video: { url: video.hd },
                caption: caption,
                buttons: buttons,
                viewOnce: true
            },
            { quoted: m }
        );
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, '> 𝘌𝘳𝘳𝘰𝘳 𝘢𝘭 𝘦𝘯𝘷𝘪𝘢𝘳 𝘦𝘭 𝘷𝘪𝘥𝘦𝘰.🥖', m);
    }
}

tiktokHandler.help = ['tksearch <búsqueda>', 'tkseguir'];
tiktokHandler.tags = ['search', 'tiktok'];
tiktokHandler.command = /^(tksearch|tkseguir)$/i;

export default tiktokHandler;
