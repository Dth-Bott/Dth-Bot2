let handler = async (m, { conn, command, args, isAdmin, isOwner, isROwner }) => {

  const isEnable = /attiva|enable|on|1/i.test(command)
  const chats = global.db.data.chats
  const settings = global.db.data.settings

  chats[m.chat] ??= {}
  settings[conn.user.jid] ??= {}

  const chat = chats[m.chat]
  const bot = settings[conn.user.jid]

  /* ====== HELPER GRAFICO ====== */
  const box = (title, lines) =>
`╭─〔 ${title} 〕─╮
${lines.map(l => `│ ${l}`).join('\n')}
╰──────────────╯`

  const noAdmin = box('❌ ACCESSO NEGATO', ['Solo admin del gruppo'])
  const noOwner = box('👑 SOLO OWNER', ['Funzione riservata'])

  if (!args[0]) {
    throw box('ℹ️ UTILIZZO', [
      '.attiva <funzione>',
      '.disattiva <funzione>',
      '',
      'Funzioni:',
      'antilink, antigore',
      'antiporno, modoadmin',
      'benvenuto, addio',
      'antiprivato, antibot',
      'antispam'
    ])
  }

  let feature = args[0].toLowerCase()
  let result = ''

  switch (feature) {

/* ====== ANTILINK ====== */
    case 'antilink':
      if (m.isGroup && !(isAdmin || isOwner || isROwner)) return m.reply(noAdmin)
      if (chat.antiLink === isEnable)
        return m.reply(box('🔗 ANTILINK', ['Già ' + (isEnable ? 'attivo' : 'disattivo')]))

      chat.antiLink = isEnable
      result = box('🔗 ANTILINK', [
        `Stato: ${isEnable ? '🟢 ATTIVO' : '🔴 DISATTIVO'}`,
        'Blocca link WhatsApp'
      ])
      break

    /* ====== ANTINUKE ====== */
    case 'antinuke':
      if (!isOwner && !isROwner) return m.reply(noOwner)
      if (chat.antinuke === isEnable)
        return m.reply(box('💣 ANTINUKE', ['Già ' + (isEnable ? 'attivo' : 'disattivo')]))

      chat.antinuke = isEnable
      result = box('💣 ANTINUKE', [
        `Stato: ${isEnable ? '🟢 ATTIVO' : '🔴 DISATTIVO'}`,
        'Protezione anti-nuke'
      ])
      break

    /* ====== ANTIGORE ====== */
    case 'antigore':
      if (m.isGroup && !(isAdmin || isOwner || isROwner)) return m.reply(noAdmin)
      if (chat.antigore === isEnable)
        return m.reply(box('🚫 ANTIGORE', ['Già ' + (isEnable ? 'attivo' : 'disattivo')]))

      chat.antigore = isEnable
      result = box('🚫 ANTIGORE', [
        `Stato: ${isEnable ? '🟢 ATTIVO' : '🔴 DISATTIVO'}`,
        'Blocca contenuti violenti'
      ])
      break

    /* ====== ANTITRAVA ====== */
    case 'antitrava':
      if (m.isGroup && !(isAdmin || isOwner || isROwner)) return m.reply(noAdmin)
      if (chat.antitrava === isEnable)
        return m.reply(box('🧱 ANTITRAVA', ['Già ' + (isEnable ? 'attivo' : 'disattivo')]))

      chat.antitrava = isEnable
      result = box('🧱 ANTITRAVA', [
        `Stato: ${isEnable ? '🟢 ATTIVO' : '🔴 DISATTIVO'}`,
        'Blocca messaggi crash/trava'
      ])
      break

    /* ====== ANTIPORNO ====== */
    case 'antiporno':
    case 'antiporn':
      if (m.isGroup && !(isAdmin || isOwner || isROwner)) return m.reply(noAdmin)
      if (chat.antiporno === isEnable)
        return m.reply(box('🔞 ANTIPORNO', ['Già ' + (isEnable ? 'attivo' : 'disattivo')]))

      chat.antiporno = isEnable
      result = box('🔞 ANTIPORNO', [
        `Stato: ${isEnable ? '🟢 ATTIVO' : '🔴 DISATTIVO'}`,
        'Blocca contenuti NSFW'
      ])
      break

/* ====== SOLOADMIN ====== */
    case 'modoadmin':
    case 'soloadmin':
      if (m.isGroup && !(isAdmin || isOwner || isROwner)) return m.reply(noAdmin)
      if (chat.modoadmin === isEnable)
        return m.reply(box('🛡️ SOLO ADMIN', ['Già ' + (isEnable ? 'attivo' : 'disattivo')]))

      chat.modoadmin = isEnable
      result = box('🛡️ SOLO ADMIN', [
        `Stato: ${isEnable ? '🟢 ATTIVO' : '🔴 DISATTIVO'}`,
        'Solo admin usano comandi'
      ])
      break

    /* ====== BENVENUTO ====== */
    case 'benvenuto':
    case 'welcome':
      if (m.isGroup && !(isAdmin || isOwner || isROwner)) return m.reply(noAdmin)
      if (chat.welcome === isEnable)
        return m.reply(box('👋 BENVENUTO', ['Già ' + (isEnable ? 'attivo' : 'disattivo')]))

      chat.welcome = isEnable
      result = box('👋 BENVENUTO', [
        `Stato: ${isEnable ? '🟢 ATTIVO' : '🔴 DISATTIVO'}`,
        'Messaggio di ingresso'
      ])
      break

    /* ====== ADDIO ====== */
    case 'addio':
    case 'goodbye':
      if (m.isGroup && !(isAdmin || isOwner || isROwner)) return m.reply(noAdmin)
      if (chat.goodbye === isEnable)
        return m.reply(box('🚪 ADDIO', ['Già ' + (isEnable ? 'attivo' : 'disattivo')]))

      chat.goodbye = isEnable
      result = box('🚪 ADDIO', [
        `Stato: ${isEnable ? '🟢 ATTIVO' : '🔴 DISATTIVO'}`,
        'Messaggio di uscita'
      ])
      break

    /* ====== ANTIPRIVATO ====== */
    case 'antiprivato':
      if (!isOwner && !isROwner) return m.reply(noOwner)
      if (bot.antiprivato === isEnable)
        return m.reply(box('🔒 ANTIPRIVATO', ['Già ' + (isEnable ? 'attivo' : 'disattivo')]))

      bot.antiprivato = isEnable
      result = box('🔒 ANTIPRIVATO', [
        `Stato: ${isEnable ? '🟢 ATTIVO' : '🔴 DISATTIVO'}`,
        'Blocca messaggi privati'
      ])
      break

/* ====== ANTIBOT ====== */
    case 'antibot':
      if (m.isGroup && !(isAdmin || isOwner || isROwner)) return m.reply(noAdmin)
      if (chat.antiBot === isEnable)
        return m.reply(box('🤖 ANTIBOT', ['Già ' + (isEnable ? 'attivo' : 'disattivo')]))

      chat.antiBot = isEnable
      result = box('🤖 ANTIBOT', [
        `Stato: ${isEnable ? '🟢 ATTIVO' : '🔴 DISATTIVO'}`,
        'Blocca bot esterni'
      ])
      break

    /* ====== ANTISPAM ====== */
    case 'antispam':
      if (m.isGroup && !(isAdmin || isOwner || isROwner)) return m.reply(noAdmin)
      if (chat.antispam === isEnable)
        return m.reply(box('🛑 ANTISPAM', ['Già ' + (isEnable ? 'attivo' : 'disattivo')]))

      chat.antispam = isEnable
      result = box('🛑 ANTISPAM', [
        `Stato: ${isEnable ? '🟢 ATTIVO' : '🔴 DISATTIVO'}`,
        'Protezione spam/flood'
      ])
      break

    default:
      return m.reply(box('❓ FUNZIONE', ['Funzione non riconosciuta']))
  }

  return m.reply(result)
}

handler.help = ['attiva', 'disattiva']
handler.tags = ['group']
handler.command = ['attiva', 'disattiva', 'enable', 'disable', 'on', 'off', '1', '0']
handler.group = false

export default handler