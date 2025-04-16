import fetch from 'node-fetch';
const handler = async (m, {conn, text, usedPrefix, command}) => {
if (!text) throw `𝘐𝘯𝘨𝘳𝘦𝘴𝘢 𝘭𝘢 𝘜𝘙𝘓 (𝘭𝘪𝘯𝘬) 𝘥𝘦 𝘭𝘢 𝘪𝘮𝘢𝘨𝘦𝘯, 𝘱𝘢𝘳𝘢 𝘱𝘰𝘥𝘦𝘳 𝘦𝘭𝘪𝘮𝘪𝘯𝘢𝘳 𝘦𝘭 𝘧𝘰𝘯𝘥𝘰.🥖`;
m.react('🕒');
await conn.sendMessage(m.chat, {text: '> 𝘌𝘭𝘪𝘮𝘪𝘯𝘢𝘯𝘥𝘰 𝘧𝘰𝘯𝘥𝘰, 𝘦𝘴𝘱𝘦𝘳𝘦 𝘱𝘰𝘳 𝘧𝘢𝘷𝘰𝘳.🥖'}, {quoted: m});
try {
const formData = new FormData();
formData.append("size", "auto");
formData.append("image_url", text);
const response = await fetch("https://api.remove.bg/v1.0/removebg", {
method: "POST",
headers: { "X-Api-Key": "pZoqmwkwmMSJAVdJFDnMgWB8" },
body: formData,
});
if (!response.ok) throw new Error('Network response was not ok');
const buffer = await response.arrayBuffer();
m.react('☑️');
await conn.sendMessage(m.chat, {image: Buffer.from(buffer)}, {quoted: m});
} catch (error) {
throw `Error: ${error.message}`;
}
}
handler.tags = ['tools'];
handler.help = ['removebg'];
handler.command = ['removebg','bg'];
export default handler;
