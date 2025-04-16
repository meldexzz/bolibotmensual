function handler(m, { text }) {
if (!text) return conn.reply(m.chat, '> 𝘐𝘯𝘨𝘳𝘦𝘴𝘢 𝘦𝘭 𝘵𝘦𝘹𝘵𝘰 𝘲𝘶𝘦 𝘥𝘦𝘴𝘦𝘢𝘴 𝘵𝘳𝘢𝘯𝘴𝘧𝘰𝘳𝘮𝘢𝘳.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘭𝘦𝘵𝘳𝘢 𝘣𝘰𝘭𝘪𝘭𝘭𝘰.🥖', m)

let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
m.reply(teks.replace(/[a-z]/gi, v => {
return {
'a': 'ᥲ',
'b': 'ᑲ',
'c': 'ᥴ',
'd': 'ძ',
'e': 'ᥱ',
'f': '𝖿',
'g': 'g',
'h': 'һ',
'i': 'і',
'j': 'ȷ',
'k': 'k',
'l': 'ᥣ',
'm': 'm',
'n': 'ᥒ',
'o': '᥆',
'p': '⍴',
'q': '𝗊',
'r': 'r',
's': 's',
't': '𝗍',
'u': 'ᥙ',
'v': '᥎',
'w': 'ᥕ',
'x': '᥊',
'y': 'ᥡ',
'z': 'z'
}[v.toLowerCase()] || v }))}

handler.help = ['letra *<texto>*']
handler.tags = ['fun']
handler.command = ['letra']

export default handler
