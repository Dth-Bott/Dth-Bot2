import fs from 'fs'

let handler = async (m, { conn }) => {
  let db = JSON.parse(fs.readFileSync('./database.json'))

  if (!db.users) return m.reply('Database utenti vuoto.')

  let users = Object.entries(db.users)

  if (users.length === 0) return m.reply('Nessun dato disponibile.')

  // Ordina per numero messaggi (decrescente)
  let top = users
    .sort((a, b) => (b[1].messages || 0) - (a[1].messages || 0))
    .slice(0, 5)

  let text = '🏆 *TOP 5 UTENTI PIÙ ATTIVI*\n\n'

  top.forEach(([jid, data], i) => {
    let name = conn.getName(jid)
    let total = data.messages || 0
    text += `${i + 1}. ${name}\n   💬 Messaggi: ${total}\n\n`
  })

  m.reply(text)
}

handler.command = ['top']
handler.tags = ['stats']
handler.help = ['top']

export default handler