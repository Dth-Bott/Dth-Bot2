let handler = async (m, { text, mentionedJid }) => {

    // Estrai l'importo dal primo argomento
    if (!text) return m.reply('❌ Inserisci un numero di euro da aggiungere.\nUso: .addeuro 100 @utente')

    let args = text.split(' ')
    let amount = parseInt(args[0])
    if (isNaN(amount) || amount <= 0) return m.reply('❌ Devi inserire un numero valido maggiore di 0.')

    let who

    // Caso 1: tag WhatsApp
    if (mentionedJid && mentionedJid.length > 0) {
        who = mentionedJid[0]
    } 
    // Caso 2: tag scritto manualmente, tipo @nome
    else if (args[1] && args[1].startsWith('@')) {
        let username = args[1].replace('@','')
        // cerca tra gli utenti registrati
        let found = Object.keys(global.db.data.users).find(u => u.includes(username))
        if (found) who = found
        else return m.reply('❌ Utente non trovato.')
    } 
    // Caso 3: nessun tag → chi scrive il messaggio
    else {
        who = m.sender
    }

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