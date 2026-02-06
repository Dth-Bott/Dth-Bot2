const handler = async (m, { conn }) => {
  const metadata = await conn.groupMetadata(m.chat)
  const inviteCode = await conn.groupInviteCode(m.chat)

  // Foto profilo dell'utente
  let pp
  try {
    pp = await conn.profilePictureUrl(m.sender, 'image')
  } catch {
    pp = 'https://i.ibb.co/3Fh9V6p/avatar.png' // fallback
  }

  const text = `
╔══════════════╗
   🔥 𝕊𝔸ℂℝ𝕀𝔽𝕀ℂ𝔼 🔥
╚══════════════╝

☠️ *Benvenuto nel culto.*
Qui nulla è casuale.
Solo chi è degno entra.

🔗 𝙇𝙄𝙉𝙆 𝘿𝙄 𝙄𝙉𝙑𝙄𝙏𝙊:
https://chat.whatsapp.com/${inviteCode}

🩸 *SACRIFICE*
"O entri… o resti fuori."
`

  await conn.sendMessage(m.chat, {
    text,
    footer: 'SACRIFICE • accesso riservato 🩸',
    contextInfo: {
      externalAdReply: {
        title: '🔥 SACRIFICE 🔥',
        body: 'Il link è stato rivelato',
        thumbnailUrl: pp,
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: false
      }
    }
  }, { quoted: m })
}

handler.help = ['linkgroup']
handler.tags = ['group']
handler.command = /^link(gro?up)?$/i
handler.group = true
handler.botAdmin = true

export default handler