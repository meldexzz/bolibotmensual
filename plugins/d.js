import { readdirSync, unlinkSync, existsSync, promises as fs } from 'fs';
import path from 'path';

var handler = async (m, { conn, usedPrefix }) => {
    if (global.conn.user.jid !== conn.user.jid) {
        return conn.reply(m.chat, '> 𝘜𝘵𝘪𝘭𝘪𝘻𝘢 𝘦𝘴𝘵𝘦 𝘤𝘰𝘮𝘢𝘯𝘥𝘰 𝘥𝘪𝘳𝘦𝘤𝘵𝘢𝘮𝘦𝘯𝘵𝘦 𝘦𝘯 𝘦𝘭 𝘯𝘶𝘮𝘦𝘳𝘰 𝘥𝘦𝘭 𝘉𝘰𝘵..🥖', m);
    }

    await conn.reply(m.chat, '> 𝘐𝘯𝘪𝘤𝘪𝘢𝘯𝘥𝘰 𝘱𝘳𝘰𝘤𝘦𝘴𝘰 𝘥𝘦 𝘦𝘭𝘪𝘮𝘪𝘯𝘢𝘤𝘪ó𝘯 𝘥𝘦 𝘢𝘳𝘤𝘩𝘪𝘷𝘰𝘴 𝘥𝘦 𝘴𝘦𝘴𝘪ó𝘯..🥖', m);

    // Define rwait como un emoji o identificador
    const rwait = '⏳'; // Emoji de espera
    m.react(rwait);

    let sessionPath = './seccion-activas';
    try {
        if (!existsSync(sessionPath)) {
            return await conn.reply(m.chat, '> ¿𝘠𝘢 𝘮𝘦 𝘷𝘦𝘴 𝘢𝘩𝘰𝘳𝘢, 𝘉𝘰𝘭𝘪𝘭𝘭𝘰?.🥖', m);
        }

        let files = await fs.readdir(sessionPath);
        let filesDeleted = 0;

        for (const file of files) {
            if (file !== 'creds.json') {
                await fs.unlink(path.join(sessionPath, file));
                filesDeleted++;
            }
        }

        if (filesDeleted === 0) {
            await conn.reply(m.chat, '> ¿𝘠𝘢 𝘮𝘦 𝘷𝘦𝘴 𝘢𝘩𝘰𝘳𝘢, 𝘉𝘰𝘭𝘪𝘭𝘭𝘰?.🥖', m);
        } else {
            const done = '✅'; // Emoji de hecho
            m.react(done);
            await conn.reply(m.chat, `> 𝘐𝘯𝘪𝘤𝘪𝘢𝘯𝘥𝘰 𝘱𝘳𝘰𝘤𝘦𝘴𝘰 𝘥𝘦 𝘦𝘭𝘪𝘮𝘪𝘯𝘢𝘤𝘪ó𝘯 𝘥𝘦 𝘢𝘳𝘤𝘩𝘪𝘷𝘰𝘴 𝘥𝘦 𝘴𝘦𝘴𝘪ó𝘯..🥖`, m);
            await conn.reply(m.chat, '> ¿𝘠𝘢 𝘮𝘦 𝘷𝘦𝘴 𝘢𝘩𝘰𝘳𝘢, 𝘉𝘰𝘭𝘪𝘭𝘭𝘰?.🥖', m);
        }
    } catch (err) {
        console.error('> 𝘐𝘯𝘪𝘤𝘪𝘢𝘯𝘥𝘰 𝘱𝘳𝘰𝘤𝘦𝘴𝘰 𝘥𝘦 𝘦𝘭𝘪𝘮𝘪𝘯𝘢𝘤𝘪ó𝘯 𝘥𝘦 𝘢𝘳𝘤𝘩𝘪𝘷𝘰𝘴 𝘥𝘦 𝘴𝘦𝘴𝘪ó𝘯..🥖', err);
        await conn.reply(m.chat, '> ¿𝘠𝘢 𝘮𝘦 𝘷𝘦𝘴 𝘢𝘩𝘰𝘳𝘢, 𝘉𝘰𝘭𝘪𝘭𝘭𝘰?.🥖', m);
    }
}

handler.help = ['dsowner', 'ds'];
handler.tags = ['fix', 'owner'];
handler.command = ['delai', 'delyaemori', 'dsowner', 'clearallsession', 'ds'];

export default handler;
