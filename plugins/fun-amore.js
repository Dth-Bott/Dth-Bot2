let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, 'Scrivi un nome 😅', m)

  // funzione hash semplice e stabile
  function lovePercent(str) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    return Math.abs(hash % 101) // 0–100%
  }

  let input = text + m.sender
  let percentuale = lovePercent(input)

  let nomeDelBot = global.db.data.nomedelbot || '𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲'

  let love = `
𝐂𝐀𝐋𝐂𝐎𝐋𝐀𝐓𝐎𝐑𝐄 𝐃𝐈 𝐀𝐌𝐎𝐑𝐄 ❤️
Affinità tra ${text} e te: ${percentuale}%
`.trim()

  await conn.sendMessage(m.chat, {
    text: love,
    contextInfo: {
      forwardingScore: 99,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '',
        serverMessageId: '',
        newsletterName: 'ᴅᴛʜ-ʙᴏᴛ'
      }
    }
  }, { quoted: m })
}

handler.help = ['love']
handler.tags = ['fun']
handler.command = /^(love|amore)$/i

export default handler