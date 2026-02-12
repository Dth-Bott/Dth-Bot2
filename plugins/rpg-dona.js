let tassa = 0.02 // 2%

let handler = async (m, { conn, text, usedPrefix, command }) => {

  if (!m.mentionedJid[0]) {
    return m.reply(
      `🚩 ERRORE\n\n` +
      `Devi menzionare un utente.\n\n` +
      `📌 Esempio:\n${usedPrefix + command} @utente 100`
    )
  }

  let who = m.mentionedJid[0]

  let txt = text.replace('@' + who.split('@')[0], '').trim()

  if (!txt) {
    return m.reply('🚩 Inserisci la quantità di 💶 euro da trasferire')
  }

  if (isNaN(txt)) {
    return m.reply('⚠️ Scrivi solo numeri.')
  }

  let euro = parseInt(txt)
  if (euro < 1) {
    return m.reply('🚩 Il minimo trasferibile è 1 €')
  }

  let users = global.db.data.users

  if (!users[m.sender]) users[m.sender] = {}
  if (!users[who]) users[who] = {}

  if (!users[m.sender].euro) users[m.sender].euro = 0
  if (!users[who].euro) users[who].euro = 0

  let tassaImporto = Math.ceil(euro * tassa)
  let costoTotale = euro + tassaImporto

  if (costoTotale > users[m.sender].euro) {
    return m.reply('❌ Saldo insufficiente.')
  }

  // Transazione
  users[m.sender].euro -= costoTotale
  users[who].euro += euro

  await m.reply(
    `🏦 BONIFICO ESEGUITO\n\n` +
    `💸 Inviati: -${euro} €\n` +
    `🧾 Tassa (2%): -${tassaImporto} €\n\n` +
    `📉 Totale scalato: ${costoTotale} €`
  )

  await conn.sendMessage(who, {
    text:
      `💰 BONIFICO RICEVUTO!\n\n` +
      `📈 +${euro} €\n` +
      `👤 Da: @${m.sender.split('@')[0]}`,
    mentions: [m.sender]
  })

  global.db.write()
}

handler.help = ['bonifico @user <euro>']
handler.tags = ['euro']
handler.command = /^(bonifico|dona)$/i

export default handler