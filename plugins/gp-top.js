import fs from 'fs'

let handler = async (m, { conn }) => {
  let db = JSON.parse(fs.readFileSync('./database.json'))

  if (!db.users) return m.reply('Database utenti vuoto.')

  let users = Object.entries(db.users)
  if (!users.length) return m.reply('Nessun dato disponibile.')

  let top = users
    .sort((a, b) => (b[1].messages || 0) - (a[1].messages || 0))
    .slice(0, 5)

  let text = '🏆 *TOP 5 UTENTI PIÙ ATTIVI*\n\n'

  for (let i = 0; i < top.length; i++) {
    let [jid, data] = top[i]

    // Prova a ottenere il nome
    let name = await conn.getName(jid)

    // Se il nome è sballato → usa il numero
    if (!name || name.includes('@') || name === jid) {
      name = jid.split('@')[0]
    }

    text += `${i + 1}. ${name}\n`
    text += `   💬 Messaggi: ${data.messages || 0}\n\n`
  }

  m.reply(text)
}

handler.command = ['top']
handler.tags = ['stats']
handler.help = ['top']

export default handler