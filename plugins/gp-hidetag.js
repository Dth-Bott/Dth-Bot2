const handler = async (m, { conn, text, participants }) => {
  try {
    const users = participants.map(u => conn.decodeJid(u.id))

    // Se stai rispondendo a un media
    if (m.quoted) {
      const quoted = m.quoted
      const media = await quoted.download()

      if (quoted.mtype === 'imageMessage') {
        await conn.sendMessage(m.chat, {
          image: media,
          caption: text || quoted.text || '',
          mentions: users
        })
      }

      else if (quoted.mtype === 'videoMessage') {
        await conn.sendMessage(m.chat, {
          video: media,
          caption: text || quoted.text || '',
          mentions: users
        })
      }

      else if (quoted.mtype === 'audioMessage') {
        await conn.sendMessage(m.chat, {
          audio: media,
          mimetype: 'audio/mp4',
          mentions: users
        })
      }

      else if (quoted.mtype === 'documentMessage') {
        await conn.sendMessage(m.chat, {
          document: media,
          mimetype: quoted.mimetype,
          fileName: quoted.fileName,
          caption: text || quoted.text || '',
          mentions: users
        })
      }

      else if (quoted.mtype === 'stickerMessage') {
        await conn.sendMessage(m.chat, {
          sticker: media,
          mentions: users
        })
      }

      else {
        await conn.sendMessage(m.chat, {
          text: text || quoted.text || '',
          mentions: users
        })
      }
    }

    // Se NON stai rispondendo, ma scrivi testo dopo .tag
    else if (text) {
      await conn.sendMessage(m.chat, {
        text: text,
        mentions: users
      })
    }

    else {
      return m.reply('❌ Inserisci un testo o rispondi a un media')
    }

  } catch (e) {
    console.error('Errore tag:', e)
    m.reply('❌ Si è verificato un errore')
  }
}

handler.help = ['tag <messaggio>']
handler.tags = ['gruppo']
handler.command = /^(\.?tag|totag)$/i
handler.admin = true
handler.group = true

export default handler