let handler = async (m, { conn }) => {
    let user = m.sender
    let username = `@${user.split('@')[0]}`

    let winx = pickRandom([
        {
            name: 'Bloom',
            power: 'Fuoco del Drago',
            description: 'Determinata, coraggiosa e sempre pronta a difendere i suoi amici!'
        },
        {
            name: 'Stella',
            power: 'Luce del Sole',
            description: 'Solare, creativa e sempre alla moda! Sei la luce del gruppo!'
        },
        {
            name: 'Flora',
            power: 'Natura',
            description: 'Dolce, gentile e con un cuore grande. Ami la natura e la vita!'
        },
        {
            name: 'Tecna',
            power: 'Tecnologia',
            description: 'Intelligente, logica e sempre alla ricerca di soluzioni innovative!'
        },
        {
            name: 'Musa',
            power: 'Musica',
            description: 'Creativa e passionale, trovi sempre un modo per esprimere le tue emozioni!'
        },
        {
            name: 'Aisha',
            power: 'Onde e Acqua',
            description: 'Energica, avventurosa e sempre pronta a nuove sfide!'
        }
    ])

    let message =
`🧚‍♀️ *Scopri la tua Winx!* 🧚‍♀️

${username}, la Winx che ti rappresenta è *${winx.name}* ✨

✨ *Potere*: ${winx.power}
💖 *Descrizione*: ${winx.description}`

    await conn.sendMessage(m.chat, {
        text: message,
        mentions: [user]
    })
}

handler.help = ['winx']
handler.tags = ['fun']
handler.command = /^winx$/i

export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}