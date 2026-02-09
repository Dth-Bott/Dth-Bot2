let handler = async (m, { conn }) => {
    // Controllo: serve una persona taggata
    if (!m.mentionedJid || !m.mentionedJid[0]) {
        return m.reply('❌ Devi taggare una persona\nEsempio: .tette @utente')
    }

    let target = m.mentionedJid[0]
    let user = target.split('@')[0]

    let boobsSizes = [
        'prima', 'seconda', 'terza', 'quarta',
        'quinta', 'sesta', 'settima', 'ottava',
        'nona', 'decima'
    ]

    let size = boobsSizes[Math.floor(Math.random() * boobsSizes.length)]

    let boobs = `
*🍑 CALCOLATORE DI TETTE 🍑*

━━━━━━━━━━━━━━━━━━━━━
🔍 *@${user}* tiene una *${size}*
━━━━━━━━━━━━━━━━━━━━━
`.trim()

    m.reply(boobs, null, { mentions: [target] })
}

handler.help = ['tette @utente']
handler.tags = ['fun']
handler.command = /^(tette)$/i

export default handler