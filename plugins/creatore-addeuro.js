let handler = async (m, { conn, text, mentionedJid }) => {

    // Se è taggata una persona, usa quella; altrimenti usa chi ha inviato il messaggio
    let who = mentionedJid && mentionedJid[0] ? mentionedJid[0] : m.sender

    // Controllo che ci sia un numero
    if (!text) return m.reply('❌ Inserisci un numero di euro da aggiungere.\nUso: .addeuro 100 @utente')

    let amount = parseInt(text.split(' ')[0])
    if (isNaN(amount) || amount <= 0) return m.reply('❌ Devi inserire un numero valido maggiore di 0.')

    // Inizializza i dati se non esistono
    if (!global.db.data.users[who]) global.db.data.users[who] = {}
    let user = global.db.data.users[who]
    if (!user.euro) user.euro = 0
    if (!user.bank) user.bank = 0

    // Aggiungi i soldi
    user.euro += amount

    let total = user.euro + user.bank

    let message = `
✅ Euro aggiunti con successo!

👤 Utente: @${who.split('@')[0]}

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
handler.owner = true 

export default handler

function formatNumber(num) {
    return new Intl.NumberFormat('it-IT').format(num)
}