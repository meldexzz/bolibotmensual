handler = async (m, { isPrems, conn }) => {
Let img = ‘https://i.postimg.cc/1zZnB4Vd/IMG-5921.jpg’ 
Let texto = `╔═══════════════╗
┇➤ 𝙃𝙊𝙇𝘼, 𝙃𝙐𝙈𝘼𝙉𝙊 
┇@${m.sender.split(‘@’)[0]}
╚═══════════════╝
╔═══════════════╗
┇ 𝘽𝙊𝙇𝙄𝙇𝙇𝙊 𝘽𝙊𝙏 / 𝙈𝙀𝙇𝘿𝙀𝙓𝙕𝙕 / 𝙅𝙊𝙎𝙎 🥖
╚══════════════
 ╭╍╍╍╍❖【 🧧 Anime 🎐】
┋💎›【 .messi
┋💎›【 .cr7
┋💎›【 .infoanime
┋💎›【 .acosar @usuario
┋💎›【 .abrazar @usuario
┋💎›【 .llorar @usuario
┋💎›【 .abrazar @usuario
┋💎›【 .awoo @usuario
┋💎›【 .besar @usuario
┋💎›【 .lamer @usuario
┋💎›【 .acariciar @usuario
┋💎›【 .engreído @usuario
┋💎›【 .golpear @usuario
┋💎›【 .lanzar @usuario
┋💎›【 .ruborizarse @usuario
┋💎›【 .sonreír @usuario
┋💎›【 .saludar @usuario
┋💎›【 .chocar @usuario
┋💎›【 .sostener @usuario
┋💎›【 .morder @usuario
┋💎›【 .glomp @usuario
┋💎›【 .abofetear @usuario
┋💎›【 .matar @usuario
┋💎›【 .feliz @usuario
┋💎›【 .guiñar @usuario
┋💎›【 .tocar @usuario
┋💎›【 .bailar @usuario
┋💎›【 .cringe @usuario
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 𝙄𝙉𝙁𝙊 ◂◂
│┊➺ 👨🏻‍💻 .precios1
│┊➺ 👨🏻‍💻 .precios2
│┊➺ 👨🏻‍💻 .botreglas
│┊➺ 👨🏻‍💻 .owner
│┊➺ 👨🏻‍💻 .allmenu
│┊➺ 👨🏻‍💻 .menu2
│┊➺ 👨🏻‍💻 .menu3
│┊➺ 👨🏻‍💻 .runtime
│┊➺ 👨🏻‍💻 .totalfunciones
│┊➺ 👨🏻‍💻 .menuff
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 🔎 𝙎𝙀𝘼𝙍𝘾𝙃 ◂◂
│┊➺ 🔍 .pinscroll <búsqueda>
│┊➺ 🔍 .pinseguir
│┊➺ 🔍 .pinatras
│┊➺ 🔍 .ytsearch <texto>
│┊➺ 🔍 .yts <texto>
│┊➺ 🔍 .tksearch <búsqueda>
│┊➺ 🔍 .tkseguir
│┊➺ 🔍 .pelisplus <título>
│┊➺ 🔍 .neko
│┊➺ 🔍 .waifu
│┊➺ 🔍 .biblia <referencia>
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 🎮 𝙂𝘼𝙈𝙀 ◂◂
│┊➺ 🎮 .capitalde
│┊➺ 🎮 .pelear
│┊➺ 🎮 .adivinabandera
│┊➺ 🎮 .ahorcado
│┊➺ 🎮 .game
│┊➺ 🎮 .slot <apuesta>
│┊➺ 🎮 .sopa
│┊➺ 🎮 .buscarpalabras
│┊➺ 🎮 .apostar <cantidad>
│┊➺ 🎮 .trivia
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ ⚙️ 𝙎𝙐𝘽 𝘽𝙊𝙏𝙎 ◂
│┊➺ 🤖 .code
│┊➺ 🤖 . bots 
│┊➺ 🤖 .code
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 🥇 𝙍𝙋𝙂 ◂◂
│┊➺ 🛡️ .abrircofre
│┊➺ 🛡️ .resemanal
│┊➺ 🛡️ .buy <cantidad>
│┊➺ 🛡️ .work
│┊➺ 🛡️ .darxp @user <cantidad>
│┊➺ 🛡️ .verxp
│┊➺ 🛡️ .annual
│┊➺ 🛡️ .yearly
│┊➺ 🛡️ .aventura
│┊➺ 🛡️ .adventure
│┊➺ 🛡️ .batalla @usuario
│┊➺ 🛡️ .berburu
│┊➺ 🛡️ .chetarki
│┊➺ 🛡️ .claim2
│┊➺ 🛡️ .claim3
│┊➺ 🛡️ .crimen
│┊➺ 🛡️ .dardulces @user <cantidad>
│┊➺ 🛡️ .regalarxp @user <cantidad>
│┊➺ 🛡️ .claim
│┊➺ 🛡️ .dulces
│┊➺ 🛡️ .explorar
│┊➺ 🛡️ .halloween
│┊➺ 🛡️ .heal
│┊➺ 🛡️ .lb
│┊➺ 🛡️ .inventario
│┊➺ 🛡️ .inv
│┊➺ 🛡️ .ki
│┊➺ 🛡️ .levelup
│┊➺ 🛡️ .masc
│┊➺ 🛡️ .monthly
│┊➺ 🛡️ .minar
│┊➺ 🛡️ .quitarxp @user <cantidad>
│┊➺ 🛡️ .retirar
│┊➺ 🛡️ .weekly
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 🎟️ 𝙍𝙀𝙂𝙄𝙎𝙏𝙍𝙊 ◂◂
│┊➺ 📋 .profile [@user]
│┊➺ 📋 .setbirth <establece tu cumpleaños>
│┊➺ 📋 .setdescription <establece tu descripción>
│┊➺ 📋 .setgenre <establece tu genero>
│┊➺ 📋 .reg
│┊➺ 📋 .unreg
│┊➺ 📋 .confesar <número mensaje>
│┊➺ 📋 .respuesta <id mensaje>
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙

▸▸ 🏷️ 2STICKER_ ◂◂
│┊➺ 🖼️ .brat <texto>
│┊➺ 🖼️ .pfp @user
│┊➺ 🖼️ .quotly <texto>
│┊➺ 🖼️ .scat
│┊➺ 🖼️ .stiker <img>
│┊➺ 🖼️ .sticker <url>
│┊➺ 🖼️ .wm <nombre>|<autor>
│┊➺ 🖼️ .emojimix <emoji+emoji>
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 🖼️ 𝙄𝙈𝘼𝙂𝙀 ◂◂
│┊➺ 🖼️ .pinterest <término>
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 📢 𝙂𝙍𝙊𝙐𝙋𝙎 ◂◂
│┊➺ 📢 .grouptime <open/close> <número>
│┊➺ 📢 .add <número>
│┊➺ 📢 .banearbot
│┊➺ 📢 .chetaruser
│┊➺ 📢 .delete
│┊➺ 📢 .demote @tag
│┊➺ 📢 .fantasmas
│┊➺ 📢 .infogp
│┊➺ 📢 .hidetag
│┊➺ 📢 .encuesta <pregunta|opciones>
│┊➺ 📢 .promote 593xxx
│┊➺ 📢 .promote @usuario
│┊➺ 📢 .promote responder chat
│┊➺ 📢 .resetlink
│┊➺ 📢 .setbye @user + texto
│┊➺ 📢 .setwelcome @user + texto
│┊➺ 📢 .sorteo
│┊➺ 📢 .todos
│┊➺ 📢 .desbanearbot
│┊➺ 📢 .kick @user
│┊➺ 📢 .mute
│┊➺ 📢 .unmute
│┊➺ 📢 .emotag <emoji>
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 🔌 𝙊𝙉 / 𝙊𝙁𝙁 ◂◂
│┊➺ 🔌 .enable
│┊➺ 🔌 .disable
│┊➺ 🔌 .on
│┊➺ 🔌 .off
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 👑 𝙋𝙍𝙀𝙈𝙄𝙐𝙈 ◂◂
│┊➺ 👑 .xnxxsearch <query>
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 📥 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿 ◂◂
│┊➺ 📥 .audio
│┊➺ 📥 .animedl <anime-id> <episode-number>
│┊➺ 📥 .capcutdownload <url cc>
│┊➺ 📥 .tiktokuser <usuario>
│┊➺ 📥 .spotify
│┊➺ 📥 .music
│┊➺ 📥 .fb <link>
│┊➺ 📥 .playaudio <texto>
│┊➺ 📥 .mp3
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 🛠️ 𝙏𝙊𝙊𝙇𝙎 ◂◂
│┊➺ 🛠️ .pinscroll <búsqueda>
│┊➺ 🛠️ .pinseguir
│┊➺ 🛠️ .pinatras
│┊➺ 🛠️ .flux <texto>
│┊➺ 🛠️ .tourl2
│┊➺ 🛠️ .tourl
│┊➺ 🛠️ .rev
│┊➺ 🛠️ .dalle
│┊➺ 🛠️ .nuevafotochannel
│┊➺ 🛠️ .nosilenciarcanal
│┊➺ 🛠️ .silenciarcanal
│┊➺ 🛠️ .noseguircanal
│┊➺ 🛠️ .seguircanal
│┊➺ 🛠️ .avisoschannel
│┊➺ 🛠️ .resiviravisos
│┊➺ 🛠️ .inspect
│┊➺ 🛠️ .inspeccionar
│┊➺ 🛠️ .eliminarfotochannel
│┊➺ 🛠️ .reactioneschannel
│┊➺ 🛠️ .reaccioneschannel
│┊➺ 🛠️ .nuevonombrecanal
│┊➺ 🛠️ .nuevadescchannel
│┊➺ 🛠️ .setmoneda
│┊➺ 🛠️ .reenviar
│┊➺ 🛠️ .demo
│┊➺ 🛠️ .fake <texto/@tag/texto>
│┊➺ 🛠️ .hd
│┊➺ 🛠️ .removebg
│┊➺ 🛠️ .tourl2
│┊➺ 🛠️ .tourl
│┊➺ 🛠️ .tts <lang> <teks>
│┊➺ 🛠️ .tomp3
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ 🎊 𝙁𝙐𝙉 ◂◂
│┊➺ 🎉 .coffe/café @tag
│┊➺ 🎉 .dado
│┊➺ 🎉 .love
│┊➺ 🎉 .formarnv
│┊➺ 🎉 .acariciar @tag
│┊➺ 🎉 .amistad
│┊➺ 🎉 .gay2 @user
│┊➺ 🎉 .lesbiana @user
│┊➺ 🎉 .pajero @user
│┊➺ 🎉 .puto @user
│┊➺ 🎉 .prostituta @user
│┊➺ 🎉 .prostituto @user
│┊➺ 🎉 .consejo
│┊➺ 🎉 .doxear <nombre> | <@tag>
│┊➺ 🎉 .facto
│┊➺ 🎉 .follar
│┊➺ 🎉 .formarpareja
│┊➺ 🎉 .formarpareja5
│┊➺ 🎉 .formartrio
│┊➺ 🎉 .oracion
│┊➺ 🎉 .gay
│┊➺ 🎉 .huevo @user
│┊➺ 🎉 .insulto
│┊➺ 🎉 .kchero
│┊➺ 🎉 .besar @tag
│┊➺ 🎉 .love @user
│┊➺ 🎉 .madrid
│┊➺ 🎉 .marry @usuario
│┊➺ 🎉 .divorce
│┊➺ 🎉 .morse <encode|decode>
│┊➺ 🎉 .pajeame
│┊➺ 🎉 .perra
│┊➺ 🎉 .personalidad <nombre>
│┊➺ 🎉 .piropo
🎉 .pregunta <texto>
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
▸▸ Logos ◂◂
│┊➺.logocorazon
│┊➺ .logochristmas
 │┊➺.logopareja
│┊➺.logoglitch
│┊➺ . logovideointro 
│┊➺.logogaming
│┊➺ .logosolitario
│┊➺ .logodragonball
│┊➺ .logoneon
│┊➺ .logogatito
│┊➺.logochicagamer
│┊➺.logonaruto
│┊➺ .logofuturista
│┊➺ .logonube
│┊➺.logoangel
│┊➺.logomurcielago
│┊➺.logocielo
│┊➺.logograffiti3d
│┊➺.logomatrix
│┊➺.logohorror
│┊➺.logoalas
│┊➺.logoarmy
│┊➺.logopubg
│┊➺.logopubgfem
│┊➺.logolol
│┊➺.logoamongus
│┊➺.logovideopubg
│┊➺.logovideotiger
│┊➺.logovideointro
│┊➺.logovideogaming
│┊➺.logoguerrero
│┊➺ .logoportadaplayer
│┊➺.logoportadaff
│┊➺.logoportadapubg
│┊➺.logoportadacounter

▸▸ 💬 𝙎𝙐𝙋𝙀𝙍𝙑𝙄𝙎𝙊𝙍𝙀𝙎 ◂◂
│┊➺ 📝 .addtag
│┊➺ 📝 .alltags
│┊➺ 📝 .delentag
│┊➺ 📝 .owner
│┊➺ 📝 .checktags
│┊➺ 📝 .clear
│┊➺ 📝 .clearhistory
│┊➺ 📝 .menutools
╰ ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙

 <[ 𝙏𝙚𝙖𝙢 𝘽𝙤𝙡𝙞𝙡𝙡𝙤 𝘽𝙤𝙩.🥖 ]>
`

Const fkontak = {
        “key”: {
    “participants”:0@s.whatsapp.net,
                “remoteJid”: “status@broadcast”,
                “fromMe”: false,
                “id”: “Halo”
        },
        “message”: {
                “contactMessage”: {
                        “vcard”: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split(‘@’)[0]}:${m.sender.split(‘@’)[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
        },
        “participant”: 0@s.whatsapp.net
}
Await conn.sendFile(m.chat, img, ‘img.jpg’, texto, fkontak)
Global.db.data.users[m.sender].lastcofre = new Date * 1
}
Handler.help = [‘menu’]
Handler.tags = [‘main’] 
Handler.command = [‘menu’, ‘help’] 
Export default handler

