let handler = async (m, { text, mentionedJid }) => {

    // ✅ Controllo owner
    const ownerJid = '212773631903@s.whatsapp.net'  // <-- sostituisci con il tuo JID
    if (m.sender !== ownerJid) return m.reply('❌ Solo l\'owner può usare questo comando.')

    // Controllo importo
    if (!text) return m.reply('❌ Inserisci un numero di euro da aggiungere.\nUso: .addeuro 100 @utente')
    let amount = parseInt(text.split(' ')[0])
    if (isNaN(amount) || amount <= 0) return m.reply('❌ Devi inserire un numero valido maggiore di 0.')

    // Determina a chi aggiungere i soldi
    let who = (mentionedJid && mentionedJid.length > 0) ? mentionedJid[0] : m.sender

    // Inizializza dati se non esistono
    if (!global.db.data.users[who]) global.db.data.users[who] = {}
    let user = global.db.data.users[who]
    if (!user.euro) user.euro = 0
    if (!user.bank) user.bank = 0

    // Aggiungi soldi
    user.euro += amount
    let total = user.euro + user.bank

    // Messaggio
    let message = `
✅ Euro aggiunti con successo!

👤 Utente: ${m.pushName || who.split('@')[0]}

💶 Contanti: ${formatNumber(user.euro)} €
🏦 Banca: ${formatNumber(user.bank)} €
─────────────────
🧾 Totale: ${formatNumber(total)} €
`.trim()

    await m.reply(message, null, { mentions: [who] })
}

handler.command = /^addeuro$/i
handler.help = ['addeuro']
handler.tags = ['euro']

export default handler

function formatNumber(num) {
    return new Intl.NumberFormat('it-IT').format(num)
}