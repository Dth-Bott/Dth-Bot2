/**
 * MENU FUNZIONI – STATO REALE (ALLINEATO AL PLUGIN ATTIVA/DISATTIVA)
 */

const handler = async (m, { conn, usedPrefix = '.' }) => {

  const chat = global.db.data.chats[m.chat] || {}
  const bot = global.db.data.settings[conn.user.jid] || {}

  const stato = (v) => v ? '🟢 ATTIVO' : '🔴 DISATTIVO'

  const menuText = `
🌑 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄 – 𝐌𝐄𝐍𝐔 𝐅𝐔𝐍𝐙𝐈𝐎𝐍𝐈 ⚡
════════════════════

🛠️ 𝐂𝐎𝐌𝐀𝐍𝐃𝐈
➤ ${usedPrefix}1/on <funzione>
➤ ${usedPrefix}0/off <funzione>

🛡️ 𝐏𝐑𝐎𝐓𝐄𝐙𝐈𝐎𝐍𝐈
➤ 🔗 AntiLink → ${stato(chat.antiLink)}
➤ 🧱 AntiTrava → ${stato(chat.antitrava)}
➤ 💣 AntiNuke → ${stato(chat.antinuke)}
➤ 🛑 AntiSpam → ${stato(chat.antispam)}
➤ 🤖 AntiBot → ${stato(chat.antiBot)}
➤ 📸 AntiInsta → ${stato(chat.antiInsta)}
➤ ✈️ AntiTelegram → ${stato(chat.antiTelegram)}
➤ 🎵 AntiTiktok → ${stato(chat.antiTiktok)}
➤ 🏷️ AntiTag → ${stato(chat.antiTag)}
➤ 🚫 AntiGore → ${stato(chat.antigore)}
➤ 🔞 AntiPorno → ${stato(chat.antiporno)}

🔒 𝐂𝐎𝐍𝐓𝐑𝐎𝐋𝐋𝐎
➤ 🛡️ SoloAdmin → ${stato(chat.modoadmin)}

👋 𝐌𝐄𝐒𝐒𝐀𝐆𝐆𝐈
➤ 👋 Benvenuto → ${stato(chat.welcome)}
➤ 🚪 Addio → ${stato(chat.goodbye)}

👑 𝐎𝐖𝐍𝐄𝐑 / 𝐁𝐎𝐓
➤ 🔒 AntiPrivato → ${stato(bot.antiprivato)}

════════════════════
📌 Usa: ${usedPrefix}1/on / ${usedPrefix}0/off
🔖 SACRIFICE SYSTEM
`.trim()

  await conn.sendMessage(m.chat, { text: menuText })
}

handler.help = ['menusicurezza', 'funzioni']
handler.tags = ['menu']
handler.command = /^(menusicurezza|funzioni)$/i

export default handler