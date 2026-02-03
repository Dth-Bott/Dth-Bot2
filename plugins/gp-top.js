let handler = async (m, { conn }) => {
  let users = global.db?.data?.users

  if (!users || Object.keys(users).length === 0)
    return m.reply('Nessun dato utenti trovato.')

  let top = Object.entries(users)
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

  if (!top.length)
    return m.reply('Nessun messaggio registrato.')

  let text = '🏆 *TOP 5 UTENTI PIÙ ATTIVI*\n\n'

  for (let i = 0; i < top.length; i++) {
    let [jid, total, data] = top[i]

    let name =
      data.name ||
      data.pushName ||
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