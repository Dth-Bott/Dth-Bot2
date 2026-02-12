let handler = async (m, { conn }) => {

    let who = m.quoted
        ? m.quoted.sender
        : m.mentionedJid && m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.sender

    if (!(who in global.db.data.users))
        return m.reply('🚩 Utente non trovato nel database')

    let user = global.db.data.users[who]

    if (!user.euro) user.euro = 0
    if (!user.bank) user.bank = 0

    let total = user.euro + user.bank

    let message = `
╔═ 💼 𝑾𝑨𝑳𝑳𝑬𝑻 💼 ═╗
║
║ 👤 Utente: @${who.split('@')[0]}
║
║ 💶 Contanti
║    ➜ ${formatNumber(user.euro)} €
║
║ 🏦 Banca
║    ➜ ${formatNumber(user.bank)} €
║
║ ─────────────────
║ 🧾 Totale
║    ➜ ${formatNumber(total)} €
║
╚════════════════╝
`.trim()

    await m.reply(message, null, { mentions: [who] })
}

handler.help = ['wallet']
handler.tags = ['euro']
handler.command = ['wallet', 'soldi', 'saldo', 'portafoglio']
handler.register = true

export default handler

function formatNumber(num) {
    return new Intl.NumberFormat('it-IT').format(num)
}