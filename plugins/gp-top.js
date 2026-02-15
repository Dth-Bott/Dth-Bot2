import fs from 'fs'

const dbPath = './database.json'

function loadDB() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: {} }, null, 2))
  }

  let db = JSON.parse(fs.readFileSync(dbPath))
  if (!db.users) db.users = {}

  return db
}

let handler = async (m, { conn }) => {
  if (!m.isGroup)
    return m.reply('❌ Questo comando funziona solo nei gruppi.')

  let db = loadDB()

  let top = Object.entries(db.users)
    .map(([jid, data]) => {
      let total = data?.messaggi || data?.messages || 0
      return [jid, total]
    })
    .filter(([_, total]) => total > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  if (!top.length)
    return m.reply('⚠️ Nessun messaggio registrato nel database.')

  let medals = ['🥇', '🥈', '🥉', '🏅', '🏅']
  let text = '🏆 *TOP 5 ATTIVITÀ*\n\n'
  let mentions = []

  top.forEach(([jid, total], i) => {
    mentions.push(jid)
    text += `${medals[i]} @${jid.split('@')[0]}\n`
    text += `   💬 Messaggi: ${total}\n\n`
  })

  await conn.sendMessage(
    m.chat,
    { text, mentions },
    { quoted: m }
  )
}

handler.command = ['top']
handler.tags = ['stats']
handler.help = ['top']

export default handler