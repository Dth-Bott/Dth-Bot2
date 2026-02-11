let handler = async (m, { conn, text }) => {
    if (!text) {
        return m.reply(
            '❌ Inserisci la descrizione del plugin.\n\n' +
            '📌 Esempio:\n.creaplugin comando saluta che dice ciao mondo'
        )
    }

    try {

        // 🧠 Estrae nome comando (prima parola)
        let words = text.trim().split(' ')
        let commandName = words[0].toLowerCase().replace(/[^a-z0-9]/gi, '')

        if (!commandName) {
            return m.reply('❌ Nome comando non valido.')
        }

        // ✨ Crea messaggio risposta basato sulla descrizione
        let responseText = text.replace(words[0], '').trim() || 'Plugin eseguito con successo!'

        // 📦 Generazione codice plugin
        let pluginCode = `
let handler = async (m, { conn }) => {
    try {
        await conn.sendMessage(m.chat, {
            text: "${responseText}"
        }, { quoted: m })
    } catch (e) {
        console.error(e)
        m.reply("❌ Errore nel comando ${commandName}")
    }
}

handler.help = ['${commandName}']
handler.tags = ['custom']
handler.command = ['${commandName}']

export default handler
`.trim()

        await conn.sendMessage(m.chat, { text: pluginCode }, { quoted: m })

    } catch (e) {
        console.error(e)
        m.reply('❌ Errore durante la creazione del plugin.')
    }
}

handler.help = ['creaplugin <descrizione>']
handler.tags = ['owner']
handler.command = ['creaplugin']
handler.owner = true

export default handler