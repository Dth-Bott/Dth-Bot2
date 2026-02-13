/**
 * MENU OWNER – TEMA SACRIFICE – SOLO TESTO
 */

const handler = async (message, { conn, usedPrefix = '.' }) => {

    const menuText = `
🌩️ 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄 – 𝐌𝐄𝐍𝐔 𝐎𝐖𝐍𝐄𝐑 ⚡

════════════════════
🚫 𝐆𝐄𝐒𝐓𝐈𝐎𝐍𝐄 𝐔𝐓𝐄𝐍𝐓𝐈
➤ ${usedPrefix}banuser 🔇 Blocca utente dal bot
➤ ${usedPrefix}unbanuser 🔊 Sblocca utente dal bot
➤ ${usedPrefix}addmod 🔉 da moderatore 
➤ ${usedPrefix}delmod 🚨 toglie moderatore 
➤ ${usedPrefix}resetmod 🗑️ resetta tutti i moderatori 

🤖 𝐆𝐄𝐒𝐓𝐈𝐎𝐍𝐄 𝐁𝐎𝐓
➤ ${usedPrefix}join + link ⚠️ Fai entrare il bot
➤ ${usedPrefix}reimpostagp 💾 reimposta link gruppo 
➤ ${usedPrefix}getid (link gp) 🆔 il bot ti da l'id di quel gruppo 
➤ ${usedPrefix}out 👋 Fai uscire il bot
➤ ${usedPrefix}aggiorna 🌐 Aggiorna bot

📢 𝐅𝐔𝐍𝐙𝐈𝐎𝐍𝐈 𝐒𝐏𝐄𝐂𝐈𝐀𝐋𝐈
➤ ${usedPrefix}bigtag 🏹 Tagga tutti spam
➤ ${usedPrefix}bonoir 🌙 Segna AFK
➤ ${usedPrefix}wakeywakey ✅ Toglie AFK
➤ ${usedPrefix}pl 🗂️ ti dà il plugin 
➤ ${usedPrefix}eliminapl 🗑️ elimina il plugin 

════════════════════
📂 𝐀𝐋𝐓𝐑𝐈 𝐌𝐄𝐍𝐔
➤ ${usedPrefix}menu 🏰 Menu principale
➤ ${usedPrefix}menuadmin ⚙️ Menu Admin
➤ ${usedPrefix}menumod 🛡️ Menu Mod
➤ ${usedPrefix}menugruppo 🏹 Menu Gruppo
➤ ${usedPrefix}funzioni 🔮 Menu Funzioni
➤ ${usedPrefix}menugiochi 🎮 Menu Giochi

════════════════════
🔖 Versione: *1.0*
💫 Comandi OWNER per governare SACRIFICE
`.trim();

    await conn.sendMessage(message.chat, { text: menuText });
};

handler.help = ['menuowner'];
handler.tags = ['menu'];
handler.command = /^(menuowner)$/i;

export default handler;