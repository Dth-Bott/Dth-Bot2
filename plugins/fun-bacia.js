let handler = async (m, { conn, text, command, usedPrefix }) => {

  text = text?.trim()

  let target = null

  // 1️⃣ Se c'è una menzione, usa quella
  if (m.mentionedJid && m.mentionedJid.length > 0) {
    target = m.mentionedJid[0]
  }

  // 2️⃣ Se NON c'è menzione, ma è una risposta
  else if (m.quoted && m.quoted.sender) {
    target = m.quoted.sender
  }

  // 3️⃣ Nessuno dei due → errore
  if (!target) {
    return conn.reply(
      m.chat,
      `💋 Devi *menzionare qualcuno* o *rispondere a un messaggio* per baciarlo!\n\nEsempi:\n${usedPrefix + command} @utente\n${usedPrefix + command} (rispondendo)`,
      m
    )
  }

  const baciatore = m.sender
  const baciato = target

  // ❌ niente auto-bacio
  if (baciatore === baciato) {
    return m.reply('😳 Non puoi baciare te stesso!')
  }

  const tagBaciatore = '@' + baciatore.split('@')[0]
  const tagBaciato = '@' + baciato.split('@')[0]

  const messaggio = `
💖 *Momento romantico* 💖

💋 ${tagBaciatore}  *si avvicina con dolcezza e dà un limone hard a* ${tagBaciato} 😘✨

🌸 *Che scena adorabile!* 🌸
`.trim()

  await conn.sendMessage(
    m.chat,
    {
      text: messaggio,
      mentions: [baciatore, baciato]
    },
    { quoted: m }
  )
}

handler.command = ['bacia']
handler.group = true

export default handler