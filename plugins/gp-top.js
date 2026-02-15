import fs from 'fs'

let handler = async (m, { conn }) => {
  if (!m.isGroup) 
    return m.reply('Questo comando funziona solo nei gruppi.')

  const dbPath = './database.json'

  // Se il file non esiste, crealo
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: {} }, null, 2))
  }

  // Leggi database
  let raw = fs.readFileSync(dbPath)
  let db = JSON.parse(raw)

  // Assicurati che esista la struttura base
  if (!db.users) db.users = {}

  let groupId = m.chat

  let top = Object.entries(db.users)
    .map(([jid, data]) => {
      let total = data?.chats?.[groupId]?.chat || 0
      return [jid, total]
    })
    .filter(([jid, total]) => total > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  if (!top.length)
    return m.reply('Nessun messaggio registrato in questo gruppo.')

  let text = '🏆 *TOP 5 DEL GRUPPO*\n\n'
  let mentions = []

  top.forEach(([jid, total], i) => {
    mentions.push(jid)
    text += `${i + 1}. @${jid.split('@')[0]}\n`
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

export default handler