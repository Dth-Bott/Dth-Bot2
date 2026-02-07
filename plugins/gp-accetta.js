const handler = async (m, { conn, isOwner, isAdmin }) => {

  if (!isOwner && !isAdmin) {
    return m.reply('⛔ *Solo admin*')
  }

  if (!m.isGroup) return

  try {
    const res = await conn.groupRequestParticipantsList(m.chat)

    if (!res.length) {
      return m.reply('✅ *Nessuna richiesta da accettare*')
    }

    for (let user of res) {
      await conn.groupRequestParticipantsUpdate(
        m.chat,
        [user.jid],
        'approve'
      )
    }

    m.reply(`✅ *Accettate ${res.length} richieste*`)

  } catch (e) {
    console.error(e)
    m.reply('❌ *Il tuo bot non supporta le richieste di ingresso*')
  }
}

handler.command = /^accetta$/i
handler.group = true
handler.botAdmin = true

export default handler