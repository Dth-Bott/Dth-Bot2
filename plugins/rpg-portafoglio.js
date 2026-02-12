let handler = async (m, { conn }) => {
    let who = m.quoted
        ? m.quoted.sender
        : m.mentionedJid && m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.fromMe
        ? conn.user.jid
        : m.sender

    if (!(who in global.db.data.users))
        throw '🚩 Utente non trovato nel database'

    let user = global.db.data.users[who]
    let name = await conn.getName(who)

    // Sistema soldi VareBot
    if (!user.money) user.money = 0
    if (!user.bank) user.bank = 0

    let total = user.money + user.bank

    let message = `
╔═ 💼 𝑾𝑨𝑳𝑳𝑬𝑻 💼 ═╗
║
║ 👤 𝑼𝒕𝒆𝒏𝒕𝒆: ${name}
║
║ 💶 𝑪𝒐𝒏𝒕𝒂𝒏𝒕𝒊
║    ➜ ${formatNumber(user.money)} €
║
║ 🏦 𝑩𝒂𝒏𝒄𝒂
║    ➜ ${formatNumber(user.bank)} €
║
║ ─────────────────
║ 🧾 𝑻𝒐𝒕𝒂𝒍𝒆
║    ➜ ${formatNumber(total)} €
║
╚════════════════╝
`.trim()

    await conn.sendMessage(m.chat, { text: message }, { quoted: m })

    m.react('💶')
}

handler.help = ['wallet']
handler.tags = ['economy']
handler.command = ['soldi', 'wallet', 'portafoglio', 'saldo', 'euro']
handler.register = true

export default handler

function formatNumber(num) {
    return new Intl.NumberFormat('it-IT').format(num)
}