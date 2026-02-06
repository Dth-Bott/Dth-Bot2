/**
 * MENU FUNZIONI – STATO ATTIVO/DISATTIVO
 */

const handler = async (m, { conn, usedPrefix = '.' }) => {

  const chat = global.db.data.chats[m.chat]

  const stato = (v) => v ? '🟢 ON' : '🔴 OFF'

  const menuText = `
🌑 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄 – 𝐌𝐄𝐍𝐔 𝐅𝐔𝐍𝐙𝐈𝐎𝐍𝐈 ⚡
════════════════════

🛠️ 𝐂𝐎𝐌𝐀𝐍𝐃𝐈 𝐁𝐀𝐒𝐄
➤ ${usedPrefix}1 on ✅ – attiva
➤ ${usedPrefix}0 off ❌ – disattiva

🛡️ 𝐏𝐑𝐎𝐓𝐄𝐙𝐈𝐎𝐍𝐈
➤ 🛑 AntiSpam → ${stato(chat.antiSpam)}
➤ ⚡ AntiTrava → ${stato(chat.antiTrava)}
➤ 💥 AntiNuke → ${stato(chat.antiNuke)}
➤ 🔒 AntiPrivato → ${stato(chat.antiPrivato)}
➤ 🤖 AntiBot → ${stato(chat.antiBot)}

🔒 𝐂𝐎𝐍𝐓𝐑𝐎𝐋𝐋𝐎 𝐆𝐑𝐔𝐏𝐏𝐎
➤ 👑 SoloAdmin → ${stato(chat.soloAdmin)}
➤ ⚰️ AntiGore → ${stato(chat.antiGore)}
➤ 🔞 AntiPorno → ${stato(chat.antiPorno)}
➤ 🔗 AntiLink → ${stato(chat.antiLink)}

👋 𝐁𝐄𝐍𝐕𝐄𝐍𝐔𝐓𝐎
➤ 🎉 Benvenuto → ${stato(chat.welcome)}
➤ 👋 Addio → ${stato(chat.bye)}

════════════════════
📂 𝐀𝐋𝐓𝐑𝐈 𝐌𝐄𝐍𝐔
➤ 📜 ${usedPrefix}menu
➤ ⚙️ ${usedPrefix}menuadmin
➤ ⚡ ${usedPrefix}menuowner
➤ 🛠️ ${usedPrefix}menumod
➤ 🌍 ${usedPrefix}menugruppo

════════════════════
🔖 Versione: *1.0*
💫 SACRIFICE SYSTEM
`.trim()

  await conn.sendMessage(m.chat, { text: menuText })
}

handler.help = ['menusicurezza', 'funzioni']
handler.tags = ['menu']
handler.command = /^(menusicurezza|funzioni)$/i

export default handler