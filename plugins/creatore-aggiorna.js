import { execSync } from 'child_process'

let handler = async (m, { conn, text }) => {
  if (conn.user.jid == conn.user.jid) {
    try {
      let checkUpdates = execSync('git fetch && git status -uno', { encoding: 'utf-8' })

      if (checkUpdates.includes('Your branch is up to date') || checkUpdates.includes('nothing to commit')) {
        await conn.reply(m.chat, '✅ Il bot è già aggiornato all\'ultima versione!', m)
        await m.react('✅')
        return
      }
      if (checkUpdates.includes('Your branch is behind')) {
        let hoodangels = execSync('git reset --hard && git pull' + (m.fromMe && text ? ' ' + text : ''), { encoding: 'utf-8' })
        await conn.reply(m.chat, `🤖 *SACRIFICE-BOT AGGIORNATO*\n\n${hoodangels}`, m)
        await m.react('🤖')
      } else {
        await conn.reply(m.chat, '⚠️ Stato repository non chiaro. Forzando aggiornamento...', m)
        let hoodangels = execSync('git reset --hard && git pull' + (m.fromMe && text ? ' ' + text : ''), { encoding: 'utf-8' })
        await conn.reply(m.chat, `🔄 Aggiornamento forzato completato!\n\n${hoodangels}`, m)
        await m.react('🤖')
      }

    } catch (err) {
      await conn.reply(m.chat, `${global.errore}\n\nDettaglio errore: ${err.message}`, m)
      await m.react('❌')
    }
  }
}

handler.help = ['aggiorna']
handler.tags = ['creatore']
handler.command = ['aggiorna', 'update', 'aggiornabot']
handler.rowner = true
export default handler