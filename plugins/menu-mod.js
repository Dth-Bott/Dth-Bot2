/**
 * MENU MOD – TEMA SACRIFICE – SOLO TESTO
 */

const handler = async (message, { conn, usedPrefix = '.' }) => {

    const menuText = `
🩸 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄 – 𝐌𝐄𝐍𝐔 𝐌𝐎𝐃 🛡️

════════════════════
🛠️ 𝐂𝐎𝐌𝐀𝐍𝐃𝐈 𝐌𝐎𝐃𝐄𝐑𝐀𝐓𝐎𝐑𝐈
➤ ${usedPrefix}tagmod       🧙‍♂️ Tagga tutto il gruppo 
➤ ${usedPrefix}pingmod      ⚡ Verifica il ping
➤ ${usedPrefix}delm         🚫 Elimina messaggio 
➤ ${usedPrefix}nukegp       💀 Fake nuke
➤ ${usedPrefix}warnmod      ⚠️ Avvisa utente
➤ ${usedPrefix}unwarnmod    ✅ Rimuovi avviso

════════════════════
📂 𝐀𝐋𝐓𝐑𝐈 𝐌𝐄𝐍𝐔
➤ ${usedPrefix}menu          🏰 Menu principale
➤ ${usedPrefix}menuadmin     ⚔️ Menu Admin
➤ ${usedPrefix}menuowner     🔥 Menu Owner
➤ ${usedPrefix}menugruppo    🏹 Menu Gruppo
➤ ${usedPrefix}funzioni      ✨ Funzioni extra

════════════════════
🔖 Versione: *1.0*
💫 Usa i comandi sopra per dominare SACRIFICE
`.trim();

    // INVIO SOLO TESTO
    await conn.sendMessage(message.chat, { text: menuText });
};

handler.help = ['menumod'];
handler.tags = ['menu'];
handler.command = /^(menumod)$/i;

export default handler;