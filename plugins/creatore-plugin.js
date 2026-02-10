import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let handler = async (m, { conn, text, isOwner }) => {
  if (!text) {
    return conn.reply(m.chat, '📦 Usa:\n.pl <nome-plugin>\n\nEsempio:\n.pl deadlyxod', m)
  }

  // opzionale: limita agli owner
  // se NON lo vuoi, togli questo if
  if (!isOwner) {
    return conn.reply(m.chat, '🔒 Solo il creatore può usare questo comando', m)
  }

  let pluginName = text.endsWith('.js') ? text : text + '.js'
  let pluginPath = path.join(__dirname, pluginName)

  if (!fs.existsSync(pluginPath)) {
    return conn.reply(m.chat, `❌ Plugin *${pluginName}* non trovato`, m)
  }

  await conn.sendMessage(
    m.chat,
    {
      document: fs.readFileSync(pluginPath),
      fileName: pluginName,
      mimetype: 'application/javascript'
    },
    { quoted: m }
  )
}

handler.help = ['pl']
handler.tags = ['tools']
handler.command = /^pl$/i
handler.owner = true

export default handler