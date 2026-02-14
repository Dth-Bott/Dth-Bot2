/**
 * MENU SOLO TESTO – TEMA SACRIFICE CON EMOJI
 */

const handler = async (message, { conn, usedPrefix = '.' }) => {

    const userId = message.sender;
    const groupId = message.isGroup ? message.chat : null;

    const userCount = Object.keys(global.db?.data?.users || {}).length;

    const menuText = `
🩸 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄-𝐁𝐎𝐓 *MENU GIOCHI* 🩸

════════════════════
👥 Utenti registrati: *${userCount}*
════════════════════

🎮 𝐆𝐀𝐌𝐄 𝐌𝐄𝐓𝐑𝐈𝐂𝐈 & DIVERTIMENTO
➤ ${usedPrefix}bellometro 🥰
➤ ${usedPrefix}gaymetro 🌈
➤ ${usedPrefix}lesbiometro 💖
➤ ${usedPrefix}masturbometro 🍆
➤ ${usedPrefix}fortunometro 🍀
➤ ${usedPrefix}intelligiometro 🧠
➤ ${usedPrefix}sborra 💦
➤ ${usedPrefix}il 🤔
➤ ${usedPrefix}wasted 🕴🏻
➤ ${usedPrefix}comunista 💂🏻
➤ ${usedPrefix}bisex 👙
➤ ${usedPrefix}gay 🏳️‍🌈
➤ ${usedPrefix}simpcard 🃏
➤ ${usedPrefix}trans 🏳️‍⚧️
➤ ${usedPrefix}tris ❌⭕
➤ ${usedPrefix}cibo 🍣 
➤ ${usedPrefix}bandiera 🚩
➤ ${usedPrefix}classificabandiera 🏆
➤ ${usedPrefix}impiccato 🪢
➤ ${usedPrefix}slot 🎰
➤ ${usedPrefix}bonk 🔨
➤ ${usedPrefix}hornycard 😏
➤ ${usedPrefix}nokia 📱
➤ ${usedPrefix}carcere 🏰
➤ ${usedPrefix}stupido 🤪
➤ ${usedPrefix}wanted 🔫

════════════════════
💀 Digita i comandi sopra per esplorare i misteri di SACRIFICE
`.trim();

    // INVIO SOLO TESTO
    await conn.sendMessage(message.chat, { text: menuText });
};

handler.help = ['menugiochi'];
handler.tags = ['menu'];
handler.command = /^(menugiochi|giochi)$/i;

export default handler;