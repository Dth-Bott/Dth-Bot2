let handler = async (m, { conn }) => {

  const chats = global.db.data.chats
  const settings = global.db.data.settings

  chats[m.chat] ??= {}
  settings[conn.user.jid] ??= {}

  const chat = chats[m.chat]
  const bot = settings[conn.user.jid]

  /* ====== GRAFICA SACRIFICE ====== */
  const box = (title, lines) =>
`╔═══━─━─━─━─━─━─━═══╗
   🩸 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄 • ${title} 🩸
╚═══━─━─━─━─━─━─━═══╝
${lines.join('\n')}
━━━━━━━━━━━━━━━━━━`

  let active = []

  // ====== FUNZIONI GRUPPO ======
  if (chat.antiLink) active.push('🔗 𝐀𝐍𝐓𝐈𝐋𝐈𝐍𝐊')
  if (chat.antinuke) active.push('💣 𝐀𝐍𝐓𝐈𝐍𝐔𝐊𝐄')
  if (chat.antigore) active.push('🚫 𝐀𝐍𝐓𝐈𝐆𝐎𝐑𝐄')
  if (chat.antitrava) active.push('🧱 𝐀𝐍𝐓𝐈𝐓𝐑𝐀𝐕𝐀')
  if (chat.antiporno) active.push('🔞 𝐀𝐍𝐓𝐈𝐏𝐎𝐑𝐍𝐎')
  if (chat.modoadmin) active.push('🛡️ 𝐌𝐎𝐃𝐎 𝐀𝐃𝐌𝐈𝐍')
  if (chat.welcome) active.push('👋 𝐁𝐄𝐍𝐕𝐄𝐍𝐔𝐓𝐎')
  if (chat.goodbye) active.push('🚪 𝐀𝐃𝐃𝐈𝐎')
  if (chat.antiBot) active.push('🤖 𝐀𝐍𝐓𝐈𝐁𝐎𝐓')
  if (chat.antispam) active.push('🛑 𝐀𝐍𝐓𝐈𝐒𝐏𝐀𝐌')

  // ====== FUNZIONI BOT ======
  if (bot.antiprivato) active.push('🔒 𝐀𝐍𝐓𝐈𝐏𝐑𝐈𝐕𝐀𝐓𝐎')

  if (!active.length) {
    return m.reply(
`╔═══━─━─━─━─━─━─━═══╗
   🩸 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄 • 𝐒𝐈𝐆𝐈𝐋𝐋𝐈 🩸
╚═══━─━─━─━─━─━─━═══╝
☠️ Nessun sigillo attivo.
Il gruppo è vulnerabile.
━━━━━━━━━━━━━━━━━━`
    )
  }

  const list = active.map(f => `➤ ${f} 🟢 𝐀𝐓𝐓𝐈𝐕𝐎`)

  return m.reply(box('𝐅𝐔𝐍𝐙𝐈𝐎𝐍𝐈 𝐀𝐓𝐓𝐈𝐕𝐄', list))
}

handler.help = ['funzioni']
handler.tags = ['group']
handler.command = ['stato', 'funzioniattive']
handler.group = true

export default handler