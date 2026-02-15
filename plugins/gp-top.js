import fs from 'fs'

const dbPath = './database.json'

// 🔹 Funzione per assicurarsi che il DB esista
function loadDB() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: {} }, null, 2))
  }

  let db = JSON.parse(fs.readFileSync(dbPath))

  if (!db.users) db.users = {}

  return db
}

// 🔹 Salva DB
function saveDB(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))
}

// 🔹 CONTATORE MESSAGGI AUTOMATICO
export async function before(m) {
  if (!m.isGroup) return
  if (!m.sender) return
  if (m.isBaileys) return

  let db = loadDB()

  let user = db.users[m.sender]
  if (!user) {
    user = db.users[m.sender] = { chats: {} }
  }

  if (!user.chats[m.chat]) {
    user.chats[m.chat] = { chat: 0 }
  }

  user.chats[m.chat].chat += 1

  saveDB(db)
}

// 🔹 COMANDO TOP
let handler = async (m, { conn }) => {
  if (!m.isGroup)
    return m.reply('❌ Questo comando funziona solo nei gruppi.')

  let db = loadDB()
  let groupId = m.chat

  let top = Object.entries(db.users)
    .map(([jid, data]) => {
      let total = data?.chats?.[groupId]?.chat || 0
      return [jid, total]
    })
    .filter(([_, total]) => total > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  if (!top.length)
    return m.reply('⚠️ Nessun messaggio registrato in questo gruppo.')

  let medals = ['🥇', '🥈', '🥉', '🏅', '🏅']
  let text = '🏆 *TOP 5 DEL GRUPPO*\n\n'
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