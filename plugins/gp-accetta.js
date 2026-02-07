const handler = async (m, { conn, isOwner, isAdmin }) => {

  // 🔐 SOLO ADMIN / OWNER
  if (!isOwner && !isAdmin) {
    return m.reply('⛔ *Solo gli admin possono usare questo comando*')
  }

  if (!m.isGroup) {
    return m.reply('❌ *Questo comando funziona solo nei gruppi*')
  }

  try {
    // Ottiene la lista delle richieste
    const requests = await conn.groupRequestParticipantsList(m.chat)

    if (!requests || requests.length === 0) {
      return m.reply('✅ *Non ci sono richieste in sospeso*')
    }

    // Estrae i JID
    const users = requests.map(v => v.jid)

    // Accetta tutte le richieste
    await conn.groupRequestParticipantsUpdate(
      m.chat,
      users,
      'approve'
    )

    m.reply(`✅ *Accettate ${users.length} richieste*`)

  } catch (e) {
    console.error('Errore .accetta:', e)
    m.reply('❌ *Errore durante l’accettazione delle richieste*')
  }
}

handler.help = ['accetta']
handler.tags = ['group']
handler.command = /^accetta$/i
handler.group = true
handler.botAdmin = true
handler.admin = false

export default handler