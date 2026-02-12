const handler = async (m, { conn, isAdmin }) => {

    // 🔐 CONTROLLO PERMESSI (SOLO ADMIN)
    if (!isAdmin) {
        return m.reply('⛔ *Solo gli admin del gruppo possono usare questo comando.*')
    }

    // Recupera il messaggio citato in maniera flessibile
    const quotedMsg = m.quoted?.message || m.message?.extendedTextMessage?.contextInfo?.quotedMessage

    if (!quotedMsg) {
        return m.reply('⚠️ Rispondi a un\'immagine con il comando per cambiare la foto del gruppo.')
    }

    // Controlla se il messaggio è un'immagine o un documento immagine
    const isImage = quotedMsg.imageMessage || (quotedMsg.documentMessage && quotedMsg.documentMessage.mimetype?.startsWith('image/'))

    if (!isImage) {
        return m.reply('⚠️ Rispondi a un\'immagine valida per cambiare la foto del gruppo.')
    }

    // Controllo che sia un gruppo
    if (!m.chat.endsWith('@g.us')) {
        return m.reply('⚠️ Questo comando funziona solo nei gruppi.')
    }

    try {
        // Scarica l'immagine citata
        const buffer = await conn.downloadMediaMessage({ message: quotedMsg })

        // Cambia la foto del gruppo
        await conn.groupUpdateProfilePicture(m.chat, buffer)

        // Messaggio di conferma
        await m.reply('✅ Foto del gruppo aggiornata con successo!')

    } catch (e) {
        console.error('Errore nel cambiare la foto del gruppo:', e)
        await m.reply('❌ Impossibile cambiare la foto del gruppo. Assicurati che il bot sia admin.')
    }
}

handler.help = ['setpic']
handler.tags = ['group']
handler.command = /^setpic$/i
handler.group = true
handler.botAdmin = true

export default handler