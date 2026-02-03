import fs from 'fs'

let handler = async (m, { conn }) => {
  let db = JSON.parse(fs.readFileSync('./database.json'))

  // prova tutte le strutture comuni
  let users =
    db.users ||
    db.data?.users ||
    db.data ||
    db

  if (!users || Object.keys(users).length === 0)
    return m.reply('Nessun utente trovato nel database.')

  let list = Object.entries(users)

  let top = list
    .map(([jid, data]) => {
      let total =
        data.messages ??
        data.chat ??
        data.msg ??
        0
      return [jid, total, data]
    })
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  let text = '🏆 *TOP 5 UTENTI PIÙ ATTIVI*\n\n'

  for (let i = 0; i < top.length; i++) {
    let [jid, total, data] = top[i]

    let name =
      data.name ||
      (await conn.getName(jid)) ||
      jid.split('@')[0]

    if (!name || name.includes('@')) name = jid.split('@')[0]

    text += `${i + 1}. ${name}\n`
    text += `   💬 Messaggi: ${total}\n\n`
  }

  m.reply(text)
}

handler.command = ['top']
handler.tags = ['stats']
handler.help = ['top']

export default handler