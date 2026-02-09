//Plugin fatto da Deadly

let handler = async (m, { conn, args }) => {
    if (!args[0]) return m.reply("❓ Devi scrivere la tua età!\n\nEsempio:\n.agejob 15")

    let age = parseInt(args[0])
    if (isNaN(age)) return m.reply("❌ Inserisci un numero valido!\n\nEsempio:\n.agejob 17")

    let job = ""

    if (age < 10) job = "🎈 *Distruttore professionista di merendine*"
    else if (age < 14) job = "🎮 *Giocatore competitivo di Minecraft*"
    else if (age < 18) job = "📱 *Influencer in prova su TikTok*"
    else if (age < 25) job = "☕ *Esperto internazionale di procrastinazione*"
    else if (age < 35) job = "💼 *Manager del caos organizzato*"
    else if (age < 50) job = "🧠 *Stratega professionale della vita*"
    else if (age < 65) job = "🛠️ *Consulente globale per problemi impossibili*"
    else job = "🧙 *Mago anziano che sa tutto della vita*"

    await m.reply(`👀 Hai *${age} anni*!\n\nIl lavoro perfetto per te è:\n${job}`)
}

handler.command = /^agejob$/i
export default handler