const handler = async (m, { conn, isAdmin }) => {

    // 🔐 SOLO ADMIN
    if (!isAdmin) {
        return m.reply('⛔ *Solo gli admin del gruppo possono usare questo comando.*')
    }

    // Recupera il messaggio citato
    const quotedMsg = m.quoted?.message || m.message?.extendedTextMessage?.contextInfo?.quotedMessage

    if (!quotedMsg) {
        return m.reply('⚠️ Rispondi a un\'immagine con il comando per cambiare la foto del gruppo.')
    }

    // Controlla se è immagine o documento immagine
    const isImage = quotedMsg.imageMessage || (quotedMsg.documentMessage && quotedMsg.documentMessage.mimetype?.startsWith('image/'))
    if (!isImage) {
        return m.reply('⚠️ Rispondi a un\'immagine valida per cambiare la foto del gruppo.')
    }

    // Controllo gruppo
    if (!m.chat.endsWith('@g.us')) {
        return m.reply('⚠️ Questo comando funziona solo nei gruppi.')
    }

    try {
        // Scarica l'immagine
        const buffer = await conn.downloadMediaMessage({ message: quotedMsg })

        // Controlla che il buffer sia valido
        if (!buffer || buffer.length === 0) {
            return m.reply('❌ Impossibile scaricare l\'immagine. Assicurati che sia un file valido.')
        }

        // Cambia la foto del gruppo
        await conn.groupUpdateProfilePicture(m.chat, buffer)
        await m.reply('✅ Foto del gruppo aggiornata con successo!')

        // Elimina messaggio comando e citato
        try {
            if (m.quoted) await conn.sendMessage(m.chat, { delete: m.quoted.key })
            await conn.sendMessage(m.chat, { delete: m.key })
        } catch (e) {
            console.error('Errore eliminazione messaggi:', e)
        }

    } catch (e) {
        console.error('Errore cambiando la foto del gruppo:', e)
        await m.reply('❌ Impossibile cambiare la foto del gruppo. Assicurati che il bot sia admin e che l\'immagine sia valida.')
    }
}

handler.help = ['setpic']
handler.tags = ['group']
handler.command = /^setpic$/i
handler.group = true
handler.botAdmin = true

export default handler