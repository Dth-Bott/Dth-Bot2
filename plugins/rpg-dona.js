let tassa = 0.02 // 2% di tassa sulle transazioni

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let who

  if (m.isGroup) who = m.mentionedJid?.[0]
  else who = m.chat

  if (!who) {
    throw (
      `🚩 𝗘𝗥𝗥𝗢𝗥𝗘\n\n` +
      `Devi *menzionare un utente* per effettuare il bonifico.\n\n` +
      `📌 𝗘𝘀𝗲𝗺𝗽𝗶𝗼:\n` +
      `${usedPrefix + command} @utente 100`
    )
  }

  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (!txt) {
    throw '🚩 𝗜𝗡𝗦𝗘𝗥𝗜𝗦𝗖𝗜 𝗟𝗔 𝗤𝗨𝗔𝗡𝗧𝗜𝗧𝗔̀ 𝗗𝗜 *💶 Euro* 𝗗𝗔 𝗧𝗥𝗔𝗦𝗙𝗘𝗥𝗜𝗥𝗘'
  }

  if (isNaN(txt)) {
    throw '⚠️ 𝗙𝗢𝗥𝗠𝗔𝗧𝗢 𝗡𝗢𝗡 𝗩𝗔𝗟𝗜𝗗𝗢\nScrivi *solo numeri*, niente testo.'
  }

  let euro = parseInt(txt)
  let tassaImporto = Math.ceil(euro * tassa)
  let costoTotale = euro + tassaImporto

  if (costoTotale < 1) {
    throw '🚩 𝗜𝗟 𝗠𝗜𝗡𝗜𝗠𝗢 𝗧𝗥𝗔𝗦𝗙𝗘𝗥𝗜𝗕𝗜𝗟𝗘 𝗘̀ 1 💶'
  }

  let users = global.db.data.users
  if (!users[m.sender]) users[m.sender] = { limit: 0 }
  if (!users[who]) users[who] = { limit: 0 }

  if (costoTotale > users[m.sender].limit) {
    throw '❌ 𝗦𝗔𝗟𝗗𝗢 𝗜𝗡𝗦𝗨𝗙𝗙𝗜𝗖𝗜𝗘𝗡𝗧𝗘\nNon hai abbastanza *💶 Euro* per questo trasferimento.'
  }

  // Transazione
  users[m.sender].limit -= costoTotale
  users[who].limit += euro

  // Messaggio mittente
  await m.reply(
    `🏦 𝗕𝗢𝗡𝗜𝗙𝗜𝗖𝗢 𝗘𝗦𝗘𝗚𝗨𝗜𝗧𝗢\n\n` +
    `💸 Importo inviato: *-${euro} €*\n` +
    `🧾 Tassa (2%): *-${tassaImporto} €*\n\n` +
    `📉 𝗧𝗼𝘁𝗮𝗹𝗲 𝗮𝗱𝗱𝗲𝗯𝗶𝘁𝗮𝘁𝗼:\n` +
    `➖ *${costoTotale} €*`
  )

  // Notifica destinatario
  conn.sendMessage(
    who,
    {
      text:
        `💰 𝗕𝗢𝗡𝗜𝗙𝗜𝗖𝗢 𝗥𝗜𝗖𝗘𝗩𝗨𝗧𝗢!\n\n` +
        `📈 Hai ricevuto *+${euro} €*\n` +
        `👤 Da: @${m.sender.split('@')[0]}`,
      mentions: [m.sender]
    }
  )

  global.db.write()
}

handler.help = ['bonifico @user <euro>', 'trasferisci', 'donauc']
handler.tags = ['rpg']
handler.command = ['bonifico', 'dona']

export default handler