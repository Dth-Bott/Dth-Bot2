const handler = async (m, { conn, usedPrefix, isOwner, isAdmin }) => {
  try {
    if (!isOwner && !isAdmin) {
      return m.reply('⛔ ADMIN ONLY')
    }

    const uptimeMs = process.uptime() * 1000
    const uptimeStr = clockString(uptimeMs)

    const startTime = performance.now()
    const endTime = performance.now()
    const speed = (endTime - startTime).toFixed(2)

    const textMsg = `
╭─[ ⚡ PING ⚡ ]
│ ▸ Status : ONLINE
│ ▸ Uptime : ${uptimeStr}
│ ▸ Delay  : ${speed} ms
╰───────────────
`.trim()

    await conn.sendMessage(
      m.chat,
      {
        text: textMsg,
        footer: 'Ping • DTH-BOT',
        buttons: [
          {
            buttonId: usedPrefix + 'ping',
            buttonText: { displayText: '↻ Ping' },
            type: 1
          }
        ],
        headerType: 1
      },
      { quoted: m }
    )

  } catch (err) {
    console.error('Errore ping:', err)
    m.reply('❌ Ping error')
  }
}

function clockString(ms) {
  const d = Math.floor(ms / 86400000)
  const h = Math.floor(ms / 3600000) % 24
  const m = Math.floor(ms / 60000) % 60
  const s = Math.floor(ms / 1000) % 60
  return [d, h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

handler.help = ['ping']
handler.tags = ['info']
handler.command = /^ping$/i
handler.group = true
handler.admin = true

export default handler
