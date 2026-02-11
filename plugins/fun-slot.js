let cooldowns = {}

const fruits = ['🍒', '🍋', '🍉', '🍇', '🍎', '🍓']

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]

    // ⏳ Cooldown 5 minuti
    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < 300000) {
        let timeLeft = cooldowns[m.sender] + 300000 - Date.now()
        let min = Math.floor(timeLeft / 60000)
        let sec = Math.floor((timeLeft % 60000) / 1000)
        return conn.reply(
            m.chat,
            `⏳ 𝗖𝗢𝗢𝗟𝗗𝗢𝗪𝗡\n\n⏱️ 𝗔𝘀𝗽𝗲𝘁𝘁𝗮 ${min}𝗺 ${sec}𝘀`,
            m
        )
    }

    // 🎰 Estrazione
    let r1 = fruits[Math.floor(Math.random() * fruits.length)]
    let r2 = fruits[Math.floor(Math.random() * fruits.length)]
    let r3 = fruits[Math.floor(Math.random() * fruits.length)]

    let win = (r1 === r2 || r2 === r3 || r1 === r3)

    user.limit = Number(user.limit) || 0
    user.exp = Number(user.exp) || 0
    user.level = Number(user.level) || 1

    let { min: minXP, xp: levelXP } = xpRange(user.level, global.multiplier || 1)
    let currentLevelXP = user.exp - minXP

    let resultMsg = '🎰 𝗦𝗟𝗢𝗧 𝗠𝗔𝗖𝗛𝗜𝗡𝗘\n'
    resultMsg += '━━━━━━━━━━━━━━━\n\n'
    resultMsg += '🎲 𝗥𝗜𝗦𝗨𝗟𝗧𝗔𝗧𝗢:\n\n'
    resultMsg += `┃ ${r1} │ ${r2} │ ${r3} ┃\n\n`

    if (win) {
        user.limit += 500
        user.exp += 100

        resultMsg += '🎉 𝗩𝗜𝗧𝗧𝗢𝗥𝗜𝗔!\n'
        resultMsg += '➕ 500 €\n'
        resultMsg += '➕ 100 XP\n'
    } else {
        user.limit = Math.max(0, user.limit - 100)
        user.exp = Math.max(0, user.exp - 50)

        resultMsg += '🤡 𝗦𝗖𝗢𝗡𝗙𝗜𝗧𝗧𝗔!\n'
        resultMsg += '➖ 100 €\n'
        resultMsg += '➖ 50 XP\n'
    }

    resultMsg += '\n━━━━━━━━━━━━━━━\n'
    resultMsg += '💼 𝗦𝗔𝗟𝗗𝗢 𝗔𝗧𝗧𝗨𝗔𝗟𝗘\n\n'
    resultMsg += `💰 𝗘𝘂𝗿𝗼: ${user.limit}\n`
    resultMsg += `⭐ 𝗫𝗣: ${user.exp}\n`
    resultMsg += `📊 𝗣𝗿𝗼𝗴𝗿𝗲𝘀𝘀𝗼: ${currentLevelXP}/${levelXP} XP\n`

    cooldowns[m.sender] = Date.now()

    await new Promise(resolve => setTimeout(resolve, 1500))
    await conn.reply(m.chat, resultMsg, m)
}

handler.help = ['slot']
handler.tags = ['game']
handler.command = ['slot']

export default handler

function xpRange(level, multiplier = 1) {
    if (level < 0) level = 0
    let min = level === 0 ? 0 : Math.pow(level, 2) * 20
    let max = Math.pow(level + 1, 2) * 20
    let xp = Math.floor((max - min) * multiplier)
    return { min, xp, max }
}