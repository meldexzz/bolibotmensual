
import { File } from 'megajs';
import path from 'path';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    try {
        if (!args[0]) return m.reply(`>𝘌𝘴𝘤𝘳𝘪𝘣𝘦 𝘦𝘭 𝘢𝘯𝘪𝘮𝘦 𝘲𝘶𝘦 𝘥𝘦𝘴𝘦𝘢𝘴 𝘥𝘦𝘴𝘤𝘢𝘳𝘨𝘢𝘳.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘢𝘯𝘪𝘮𝘦𝘥𝘭 𝘕𝘢𝘳𝘶𝘵𝘰.🥖`);
        const animeId = args[0];
        const episode = args[1] || 1;
        const apiUrl = `https://animeflvapi.vercel.app/download/anime/${animeId}/${episode}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('> Error al obtener datos de la API');
        const { servers } = await response.json();
        const megaLink = servers[0].find(server => server.server === 'mega').url;
        if (!megaLink) throw new Error('> 𝘕𝘰 𝘴𝘦 𝘦𝘯𝘤𝘰𝘯𝘵𝘳ó 𝘶𝘯 𝘦𝘯𝘭𝘢𝘤𝘦 𝘦𝘯 𝘔𝘌𝘎𝘈.🥖 ');
        const file = File.fromURL(megaLink);
        await file.loadAttributes();
        if (file.size >= 300000000) return m.reply('> 𝘌𝘭 𝘢𝘳𝘤𝘩𝘪𝘷𝘰 𝘦𝘴 𝘥𝘦𝘮𝘢𝘴𝘪𝘢𝘥𝘰 𝘨𝘳𝘢𝘯𝘥𝘦, 𝘭𝘪𝘮𝘪𝘵𝘦 300𝘔𝘉.🥖');
        await conn.loadingMsg(m.chat, '> 𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢𝘯𝘥𝘰 𝘴𝘶 𝘢𝘯𝘪𝘮𝘦. \n > 𝘕𝘰𝘵𝘢: 𝘓𝘰𝘴 𝘦𝘴𝘵𝘳𝘦𝘯𝘰𝘴 𝘥𝘦 𝘢𝘯𝘪𝘮𝘦 𝘴𝘰𝘭𝘰 𝘥𝘶𝘳𝘢𝘯 3 𝘥í𝘢𝘴 𝘦𝘯 𝘭𝘢 𝘯𝘶𝘣𝘦.🥖', `𝘌𝘯𝘷𝘪𝘢𝘯𝘥𝘰 𝘴𝘶 𝘢𝘳𝘤𝘩𝘪𝘷𝘰.🥖`, [
            "▰▱▱▱▱ 𝘊𝘢𝘳𝘨𝘢𝘯𝘥𝘰 ...",
            "▰▰▱▱▱ 𝘊𝘢𝘳𝘨𝘢𝘯𝘥𝘰 ...",
            "▰▰▰▱▱ 𝘊𝘢𝘳𝘨𝘢𝘯𝘥𝘰 ...",
            "▰▰▰▰▱ 𝘊𝘢𝘳𝘨𝘢𝘯𝘥𝘰 ...",
            "▰▰▰▰▰ 𝘊𝘢𝘳𝘨𝘢𝘯𝘥𝘰 ..."
        ], m);
        const caption = `> 𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢𝘯𝘥𝘰 𝘴𝘶 𝘢𝘯𝘪𝘮𝘦.\n𝘕𝘰𝘮𝘣𝘳𝘦: ${file.name}\n𝘛𝘢𝘮𝘢ñ𝘰: ${formatBytes(file.size)}`;
        const dataBuffer = await file.downloadBuffer();
        const fileExtension = path.extname(file.name).toLowerCase();
        const mimeTypes = {
            ".mp4": "video/mp4",
            ".pdf": "application/pdf",
            ".zip": "application/zip",
            ".rar": "application/x-rar-compressed",
            ".7z": "application/x-7z-compressed",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
        };
        const mimetype = mimeTypes[fileExtension] || "application/octet-stream";

        await conn.sendFile(m.chat, dataBuffer, file.name, caption, m, null, { mimetype, asDocument: true });
    } catch (error) {
        return m.reply(`𝘕𝘰 𝘦𝘴𝘱𝘦𝘤𝘪𝘧𝘪𝘤𝘰 𝘦𝘭 𝘢𝘯𝘪𝘮𝘦.🥖`);
    }
}
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

handler.help = ['animedl <anime-id> <episode-number>'];
handler.tags = ['downloader'];
handler.command = ['animedl', 'animeflvdl', 'anidl'];
handler.group = true;

export default handler;
