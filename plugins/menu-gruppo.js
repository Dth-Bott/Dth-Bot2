/**
 * MENU GRUPPO – TEMA SACRIFICE – SOLO TESTO
 */

const handler = async (message, { conn, usedPrefix = '.' }) => {

    const menuText = `
🌑 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄 – 𝐌𝐄𝐍𝐔 𝐆𝐑𝐔𝐏𝐏𝐎 ⚡

════════════════════
🌍 𝐈𝐍𝐅𝐎 & 𝐔𝐓𝐈𝐋𝐈𝐓À
➤ ${usedPrefix}meteo (città)
➤ ${usedPrefix}bus (città)
➤ ${usedPrefix}pic [@]
➤ ${usedPrefix}fp [numero]

🖼️ 𝐌𝐄𝐃𝐈𝐀 & 𝐆𝐑𝐀𝐅𝐈𝐂𝐀
➤ ${usedPrefix}s / sticker
➤ ${usedPrefix}wm
➤ ${usedPrefix}png
➤ ${usedPrefix}hd
➤ ${usedPrefix}rimuovisfondo

🎮 𝐆𝐈𝐎𝐂𝐇𝐈 & 𝐑𝐀𝐍𝐃𝐎𝐌
➤ ${usedPrefix}tris ⭕
➤ ${usedPrefix}dado 🎲
➤ ${usedPrefix}slot 🎰
➤ ${usedPrefix}bandiera 🏳️
➤ ${usedPrefix}classificabandiera 🚩
➤ ${usedPrefix}impiccato 👤

👤 𝐓𝐀𝐆 & 𝐈𝐍𝐓𝐄𝐑𝐀𝐙𝐈𝐎𝐍𝐈
➤ ${usedPrefix}bonk [@]
➤ ${usedPrefix}hornycard [@]
➤ ${usedPrefix}stupido [@]
➤ ${usedPrefix}wanted [@]
➤ ${usedPrefix}nokia [@]
➤ ${usedPrefix}carcere [@]
➤ ${usedPrefix}fight [@]
➤ ${usedPrefix}sbirro [@]
➤ ${usedPrefix}teletrasporto [@]
➤ ${usedPrefix}rincoglionito [@]
➤ ${usedPrefix}mira [@]
➤ ${usedPrefix}xban [numero]
➤ ${usedPrefix}hotdog [@]

💬 𝐒𝐎𝐂𝐈𝐀𝐋 & 𝐀𝐙𝐈𝐎𝐍𝐈
➤ ${usedPrefix}bacia 💋
➤ ${usedPrefix}amore 🩷
➤ ${usedPrefix}trovafida ❤️
➤ ${usedPrefix}odio 😡
➤ ${usedPrefix}rizz 🤩
➤ ${usedPrefix}minaccia ☠️
➤ ${usedPrefix}zizzania 🤡
➤ ${usedPrefix}obbligo 🚫
➤ ${usedPrefix}insulta 😹
➤ ${usedPrefix}lavoro 👷🏻
➤ ${usedPrefix}macchina 🏎️

💍 𝐑𝐄𝐋𝐀𝐙𝐈𝐎𝐍𝐈
➤ ${usedPrefix}sposa 💍
➤ ${usedPrefix}divorzia 💔
➤ ${usedPrefix}adotta 👶🏻
➤ ${usedPrefix}famiglia 🙍🏻
➤ ${usedPrefix}coppie 👩‍❤️‍💋‍👨

💰 𝐄𝐂𝐎𝐍𝐎𝐌𝐈𝐀
➤ ${usedPrefix}wallet 👛
➤ ${usedPrefix}banca 🏦
➤ ${usedPrefix}ruba 🕵🏽
➤ ${usedPrefix}deposita ✅
➤ ${usedPrefix}dona 👤

🎭 𝐕𝐀𝐑𝐈𝐄
➤ ${usedPrefix}ic 🎼
➤ ${usedPrefix}auto 🚗
➤ ${usedPrefix}cur 🎶
➤ ${usedPrefix}sigaretta 🚬
➤ ${usedPrefix}startblast 🚦
➤ ${usedPrefix}mc 🍔
➤ ${usedPrefix}gelato 🍦
➤ ${usedPrefix}pizza 🍕
➤ ${usedPrefix}winx 🧚🏿
➤ ${usedPrefix}gratta 🌟
➤ ${usedPrefix}mossad
➤ ${usedPrefix}agejob [anni]

🔞 𝐍𝐒𝐅𝐖
➤ ${usedPrefix}tette [@]
➤ ${usedPrefix}incinta [@]
➤ ${usedPrefix}pene
➤ ${usedPrefix}sega
➤ ${usedPrefix}scopa
➤ ${usedPrefix}sborra
➤ ${usedPrefix}pompino
➤ ${usedPrefix}ditalino

════════════════════
📂 𝐀𝐋𝐓𝐑𝐈 𝐌𝐄𝐍𝐔
➤ ${usedPrefix}menu
➤ ${usedPrefix}menumod
➤ ${usedPrefix}menuadmin
➤ ${usedPrefix}menuowner
➤ ${usedPrefix}funzioni

════════════════════
🔖 Versione: *1.0*
💫 Comandi gruppo per SACRIFICE
`.trim();

    await conn.sendMessage(message.chat, { text: menuText });
};

handler.help = ['menugruppo'];
handler.tags = ['menu'];
handler.command = /^(gruppo|menugruppo)$/i;
handler.group = true;

export default handler;