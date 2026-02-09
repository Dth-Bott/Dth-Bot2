let handler = async (m, { conn, command, text }) => {
    let user = m.sender.split('@')[0]

    let message = `
*📏 𝐜𝐚𝐥𝐜𝐨𝐥𝐚𝐭𝐨𝐫𝐞 𝐝𝐢 𝐦𝐢𝐬𝐮𝐫𝐚 📏*

━━━━━━━━━━━━━━━━━━━━━
🔍 *@${user}* 𝐡𝐚 𝐮𝐧𝐚 𝐥𝐮𝐧𝐠𝐡𝐞𝐳𝐳𝐚 𝐬𝐭𝐢𝐦𝐚𝐭𝐚 𝐝𝐢:
👉 *${Math.floor(Math.random() * 101)} 𝐜𝐦*
━━━━━━━━━━━━━━━━━━━━━
`.trim()

    m.reply(message, null, {
        mentions: [m.sender]
    })
}

handler.help = ['calcolatore']
handler.tags = ['divertimento']
handler.command = /^(pene)$/i

export default handler