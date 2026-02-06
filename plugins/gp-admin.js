const handler = async (m, { conn, args }) => {
  if (!m.isGroup) return m.reply('☠️ Questo rituale può essere evocato solo nei gruppi.')

  const metadata = await conn.groupMetadata(m.chat)
  const participants = metadata.participants

  const admins = participants
    .filter(p => p.admin)
    .map(p => p.id)

  if (!args.length) {
    return m.reply(`☠️ 𝕊𝔸ℂℝ𝕀𝔽𝕀ℂ𝔼 ☠️

Devi pronunciare il messaggio del rituale.

📜 Uso:
.admin <messaggio>`)
  }

  const text = `
╔══════════════════════╗
      ☠️ 𝕊𝔸ℂℝ𝕀𝔽𝕀ℂ𝔼 ☠️
╚══════════════════════╝

🩸 *Evocazione degli Anziani*

${args.join(' ')}

⚔️ *Gli amministratori sono stati chiamati.*
`

  await conn.sendMessage(m.chat, {
    text,
    mentions: admins
  }, { quoted: m })
}

handler.help = ['admin <messaggio>']
handler.tags = ['group']
handler.command = /^admin$/i
handler.group = true

export default handler