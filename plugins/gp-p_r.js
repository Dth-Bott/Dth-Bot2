var handler = async (m, { conn, text, command }) => {
  let action, successMsg, errorMsg, helpMsg
  let sender = m.sender

  let number
  if (m.mentionedJid && m.mentionedJid[0]) {
    number = m.mentionedJid[0].split('@')[0]
  } else if (m.quoted && m.quoted.sender) {
    number = m.quoted.sender.split('@')[0]
  } else if (text && !isNaN(text)) {
    number = text
  } else {
    return conn.reply(m.chat, '『 👤 』 𝐌𝐞𝐧𝐳𝐢𝐨𝐧𝐚 𝐮𝐧 𝐮𝐭𝐞𝐧𝐭𝐞', m)
  }

  if (!number || number.length < 10 || number.length > 15) {
    return conn.reply(m.chat, '『 ❌ 』 𝐍𝐮𝐦𝐞𝐫𝐨 𝐧𝐨𝐧 𝐯𝐚𝐥𝐢𝐝𝐨', m)
  }

  let user = number + '@s.whatsapp.net'

  if (['promote', 'promuovi', 'p'].includes(command)) {
    action = 'promote'
    successMsg = `『 👑 』 𝐋’𝐮𝐭𝐞𝐧𝐭𝐞 @${user.split('@')[0]} 𝐞̀ 𝐬𝐭𝐚𝐭𝐨 𝐩𝐫𝐨𝐦𝐨𝐬𝐬𝐨\n\n𝐃𝐚: @${sender.split('@')[0]}`
    errorMsg = '『 ❌ 』 𝐄𝐫𝐫𝐨𝐫𝐞 𝐧𝐞𝐥 𝐩𝐫𝐨𝐦𝐮𝐨𝐯𝐞𝐫𝐞'
  }

  if (['demote', 'retrocedi', 'r'].includes(command)) {
    action = 'demote'
    successMsg = `『 ⚠️ 』 𝐋’𝐮𝐭𝐞𝐧𝐭𝐞 @${user.split('@')[0]} 𝐞̀ 𝐬𝐭𝐚𝐭𝐨 𝐫𝐞𝐭𝐫𝐨𝐜𝐞𝐬𝐬𝐨\n\n𝐃𝐚: @${sender.split('@')[0]}`
    errorMsg = '『 ❌ 』 𝐄𝐫𝐫𝐨𝐫𝐞 𝐧𝐞𝐥 𝐫𝐞𝐭𝐫𝐨𝐜𝐞𝐝𝐞𝐫𝐞'
  }

  try {
    await conn.groupParticipantsUpdate(m.chat, [user], action)
    conn.reply(m.chat, successMsg, m, {
      mentions: [sender, user]
    })
  } catch (e) {
    conn.reply(m.chat, errorMsg, m)
  }
}

handler.command = ['promote', 'promuovi', 'p', 'demote', 'retrocedi', 'r']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler