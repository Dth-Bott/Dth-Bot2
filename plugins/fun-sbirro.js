const handler = async (msg, { conn }) => {
  const percent = Math.floor(Math.random() * 101)

  const response = `👮‍♂️ Il tuo livello di sbirro è: *${percent}%* 🚔`

  await conn.sendMessage(
    msg.chat,
    { text: response },
    { quoted: msg }
  )
}

handler.command = ['sbirro', 'quantosbirro']
handler.category = 'fun'
handler.desc = 'Scopri quanto sei uno sbirro 🚓'

export default handler