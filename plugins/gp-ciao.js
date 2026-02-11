let handler = async (m, { conn }) => {
    try {
        await conn.sendMessage(m.chat, {
            text: "ciao come va"
        }, { quoted: m })
    } catch (e) {
        console.error(e)
        m.reply("❌ Errore nel comando ciao")
    }
}

handler.help = ['ciao']
handler.tags = ['custom']
handler.command = ['ciao']

export default handler