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
      return [jid, total]
    })
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  if (!top.length)
    return m.reply('Nessun messaggio registrato.')

  let text = '🏆 *TOP 5 UTENTI PIÙ ATTIVI*\n\n'
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
handler.help = ['top']

export default handler