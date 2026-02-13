/**
 * MENU ADMIN – TEMA SACRIFICE – SOLO TESTO
 */

const handler = async (message, { conn, usedPrefix = '.' }) => {

    const menuText = `
🛡️ 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄 – 𝐌𝐄𝐍𝐔 𝐀𝐃𝐌𝐈𝐍 ⚙️

════════════════════
👑 𝐆𝐄𝐒𝐓𝐈𝐎𝐍𝐄 𝐑𝐔𝐎𝐋𝐈
➤ ${usedPrefix}p / promuovi         ✨ Promuovi utente
➤ ${usedPrefix}r / retrocedi        🔥 Retrocedi utente
➤ ${usedPrefix}admins               🛡️ Lista admin

⚠️ 𝐖𝐀𝐑𝐍 & 𝐃𝐈𝐒𝐂𝐈𝐏𝐋𝐈𝐍𝐀
➤ ${usedPrefix}warn                  ⚠️ Avvisa utente
➤ ${usedPrefix}listwarn              📄 Lista avvisi
➤ ${usedPrefix}unwarn                ✅ Rimuovi avviso
➤ ${usedPrefix}delwarn               ❌ Cancella avviso
➤ ${usedPrefix}resetwarn             🔄 Reset avvisi

🔇 𝐂𝐎𝐍𝐓𝐑𝐎𝐋𝐋𝐎 𝐂𝐇𝐀𝐓
➤ ${usedPrefix}muta                  🤫 Muta la persona 
➤ ${usedPrefix}smuta                 🔊 Smuta la persona
➤ ${usedPrefix}tag                   🏹 Tagga utenti

🔒 𝐈𝐌𝐏𝐎𝐒𝐓𝐀𝐙𝐈𝐎𝐍𝐈 𝐆𝐑𝐔𝐏𝐏𝐎
➤ ${usedPrefix}aperto                🌙 Apri gruppo
➤ ${usedPrefix}chiuso                🔐 Chiudi gruppo
➤ ${usedPrefix}modlist               📳 lista moderatori 
➤ ${usedPrefix}inattivi              ⏳ Gestisci inattivi

👋 𝐔𝐓𝐄𝐍𝐓𝐈
➤ ${usedPrefix}kick                  ⚔️ Espelle utente

🔗 𝐋𝐈𝐍𝐊
➤ ${usedPrefix}link                  🔗 Link gruppo
➤ ${usedPrefix}linkqr                🖤 QR link

════════════════════
📂 𝐀𝐋𝐓𝐑𝐈 𝐌𝐄𝐍𝐔
➤ ${usedPrefix}menu                  🏰 Menu principale
➤ ${usedPrefix}menuowner             🔥 Menu Owner
➤ ${usedPrefix}menumod               🛡️ Menu Mod
➤ ${usedPrefix}menugruppo            🏹 Menu Gruppo
➤ ${usedPrefix}menusicurezza         🛡️ Menu Sicurezza
➤ ${usedPrefix}menugiochi            🎮 Menu Giochi

════════════════════
🔖 Versione: *1.0*
💫 Usa i comandi sopra per governare SACRIFICE
`.trim();

    await conn.sendMessage(message.chat, { text: menuText });
};

handler.help = ['menuadmin'];
handler.tags = ['menu'];
handler.command = /^(menuadmin)$/i;
handler.admin = true;

export default handler;