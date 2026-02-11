let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(
        '❌ Inserisci la descrizione del plugin.\n' +
        '📌 Esempio:\n.creaplugin plugin che saluta quando qualcuno scrive buongiorno'
    )

    try {
        // 1️⃣ Estrai parola chiave trigger
        // cerca pattern tipo "quando qualcuno scrive X"
        let triggerMatch = text.match(/quando qualcuno scrive (.+)/i)
        let triggerText = triggerMatch ? triggerMatch[1].trim() : null

        // 2️⃣ Estrai nome comando
        let words = text.split(' ')
        let commandName = words[0].toLowerCase().replace(/[^a-z0-9]/gi, '') || 'customplugin'

        // 3️⃣ Genera messaggio di default
        let responseText = triggerText ? `Risposta automatica a "${triggerText}"` : 'Plugin creato con successo!'

        // 4️⃣ Genera codice plugin
        let pluginCode = `
let handler = async (m, { conn }) => {
    try {
        let msgText = (m.message?.conversation || m.message?.extendedTextMessage?.text || "").toLowerCase()
        ${triggerText ? `
        if(msgText.includes("${triggerText.toLowerCase()}")) {
            await conn.sendMessage(m.chat, { text: "${responseText}" }, { quoted: m })
        }` : `
        await conn.sendMessage(m.chat, { text: "${responseText}" }, { quoted: m })`}
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
        m.reply('❌ Errore nella creazione del plugin.')
    }
}

handler.help = ['creaplugin <descrizione>']
handler.tags = ['owner']
handler.command = ['creaplugin']
handler.owner = true

export default handler