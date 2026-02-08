let handler = async (m, { conn }) => {
    // Controllo: serve una persona taggata
    if (!m.mentionedJid || !m.mentionedJid[0]) {
        return m.reply('❌ Devi taggare una persona\nEsempio: .rincoglionito @utente')
    }

    let target = m.mentionedJid[0]
    let user = target.split('@')[0]

    // Calcolo della percentuale
    let percentage = Math.floor(Math.random() * 101)

    // Frase finale
    let finalPhrase = percentage >= 50
        ? "🤔 *Wow, la situazione è grave! Potrebbe essere troppo tardi...*"
        : "😅 *C'è ancora speranza, ma attenzione!*"

    let message = `
━━━━━━━━━━━━━━━━━━━━━━━
🤪 *CALCOLATORE DI RINCOGLIONIMENTO* 🤪
━━━━━━━━━━━━━━━━━━━━━━━
😵 *@${user}* è rincoglionito al:  
💥 *${percentage}%* di livello! 💥
━━━━━━━━━━━━━━━━━━━━━━━
${finalPhrase}
`.trim()

    m.reply(message, null, { mentions: [target] })
}

handler.help = ['rincoglionito @utente']
handler.tags = ['fun']
handler.command = /^(rincoglionito)$/i

export default handler