/**
 * MENU FUNZIONI – TEMA SACRIFICE CON EMOJI – SOLO TESTO
 */

const handler = async (m, { conn, usedPrefix = '.' }) => {

  const menuText = `
🌑 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄 – 𝐌𝐄𝐍𝐔 𝐅𝐔𝐍𝐙𝐈𝐎𝐍𝐈 ⚡
════════════════════

🛠️ 𝐂𝐎𝐌𝐀𝐍𝐃𝐈 𝐁𝐀𝐒𝐄
➤ ${usedPrefix}1 on ✅ – attiva la funzione
➤ ${usedPrefix}0 off ❌ – disattiva la funzione

🛡️ 𝐏𝐑𝐎𝐓𝐄𝐙𝐈𝐎𝐍𝐈
➤ 🛑 AntiSpam – blocca spam nel gruppo
➤ ⚡ AntiTrava – impedisce messaggi crash
➤ 💥 AntiNuke – previene rimozioni massive
➤ 🔒 AntiPrivato – blocca link privati
➤ 🤖 AntiBot – blocca bot indesiderati

🔒 𝐂𝐎𝐍𝐓𝐑𝐎𝐋𝐋𝐎 𝐆𝐑𝐔𝐏𝐏𝐎
➤ 👑 SoloAdmin – restrizioni per utenti
➤ ⚰️ AntiGore – blocca contenuti gore
➤ 🔞 AntiPorno – blocca contenuti pornografici
➤ 🔗 AntiLink – blocca link sospetti

👋 𝐁𝐄𝐍𝐕𝐄𝐍𝐔𝐓𝐎
➤ 🎉 Benvenuto – messaggio all’ingresso
➤ 👋 Addio – messaggio all’uscita

════════════════════
📂 𝐀𝐋𝐓𝐑𝐈 𝐌𝐄𝐍𝐔
➤ 📜 ${usedPrefix}menu – menu principale
➤ ⚙️ ${usedPrefix}menuadmin – menu admin
➤ ⚡ ${usedPrefix}menuowner – menu owner
➤ 🛠️ ${usedPrefix}menumod – menu moderatori
➤ 🌍 ${usedPrefix}menugruppo – menu gruppo

════════════════════
🔖 Versione: *1.0*
💫 Funzioni per SACRIFICE
`.trim()

  await conn.sendMessage(m.chat, { text: menuText })
}

handler.help = ['menusicurezza', 'funzioni']
handler.tags = ['menu']
handler.command = /^(menusicurezza|funzioni)$/i

export default handler