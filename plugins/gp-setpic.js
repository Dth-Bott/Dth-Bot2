const handler = async (m, { conn, isAdmin }) => {

    // 🔐 CONTROLLO PERMESSI (SOLO ADMIN)
    if (!isAdmin) {
        return m.reply('⛔ *Solo gli admin del gruppo possono usare questo comando.*')
    }

    // Controllo se il messaggio citato esiste e sia un'immagine
    if (!m.quoted || !m.quoted.message || !m.quoted.message.imageMessage) {
        return m.reply('⚠️ Rispondi a un\'immagine con il comando per cambiare la foto del gruppo.')
    }

    // Controllo che sia un gruppo
    if (!m.chat.endsWith('@g.us')) {
        return m.reply('⚠️ Questo comando funziona solo nei gruppi.')
    }

    try {
        // Scarica l'immagine citata
        const buffer = await conn.downloadMediaMessage(m.quoted)

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
handler.admin = true
handler.botAdmin = true

export default handler