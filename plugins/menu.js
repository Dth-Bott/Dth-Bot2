/**
 * MENU SOLO TESTO – TEMA SACRIFICE
 */

const handler = async (message, { conn, usedPrefix = '.' }) => {

    const userId = message.sender;
    const groupId = message.isGroup ? message.chat : null;

    const userCount = Object.keys(global.db?.data?.users || {}).length;

    const menuText = `
🩸 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄-𝐁𝐎𝐓 *MENU PRINCIPALE* 🩸

════════════════════
👥 Utenti registrati: *${userCount}*
════════════════════

🏰 𝐂𝐎𝐌𝐀𝐍𝐃𝐈 𝐏𝐑𝐈𝐍𝐂𝐈𝐏𝐀𝐋𝐈
➤ ${usedPrefix}ping         ⚡ Verifica il bot
➤ ${usedPrefix}staff        🛡️ Staff e moderatori
➤ ${usedPrefix}creatore     👑 Info sul creatore

🔮 𝐀𝐋𝐓𝐑𝐈 𝐌𝐄𝐍𝐔
➤ ${usedPrefix}menumod      🧙 Menu Moderatori
➤ ${usedPrefix}menuowner    🔥 Menu Owner
➤ ${usedPrefix}menugruppo   🏹 Menu Gruppo
➤ ${usedPrefix}menuadmin    ⚔️ Menu Admin
➤ ${usedPrefix}funzioni     ✨ Funzioni Extra

════════════════════
💀 Digita i comandi sopra per esplorare i misteri di SACRIFICE
`.trim();

    // INVIO SOLO TESTO
    await conn.sendMessage(message.chat, { text: menuText });
};

handler.help = ['menu', 'comandi'];
handler.tags = ['menu'];
handler.command = /^(menu|comandi)$/i;

export default handler;