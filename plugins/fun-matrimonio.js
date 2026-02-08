const proposals = {}
const adoptions = {}

let handler = async (m, { conn, command, usedPrefix, participants }) => {
    const users = global.db.data.users
    if (!users[m.sender]) users[m.sender] = {}

    switch (command) {
        case 'sposa':
            return sposa(m, conn, users, usedPrefix, participants)
        case 'divorzia':
            return divorzia(m, users)
        case 'adotta':
            return adotta(m, conn, users, usedPrefix, participants)
        case 'famiglia':
            return famiglia(m, users, participants)
        case 'coppie':
            return coppie(m, users, participants)
        case 'toglifiglio':
            return togliFiglio(m, users, participants)
    }
}

/* ================= 💍 MATRIMONIO ================= */
async function sposa(m, conn, users, usedPrefix, participants) {
    const sender = m.sender
    const target = m.mentionedJid?.[0] || m.quoted?.sender

    if (!target) throw `Usa: ${usedPrefix}sposa @utente`
    if (target === sender) throw '❌ Non puoi sposarti da solo'
    if (!users[target]) users[target] = {}

    if (users[sender].sposato)
        throw `💍 Sei già sposato con ${tagUser(users[sender].coniuge)}`
    if (users[target].sposato)
        throw `💍 ${tagUser(target)} è già sposato`

    if (proposals[sender] || proposals[target])
        throw '⏳ C’è già una proposta in corso'

    proposals[target] = sender
    proposals[sender] = target

    await conn.sendMessage(m.chat, {
        text: 
`💖 *PROPOSTA DI MATRIMONIO* 💖

${tagUser(sender)} vuole sposare ${tagUser(target)} 💍

💬 Rispondi con:
✔️ *SI* per accettare  
❌ *NO* per rifiutare`,
        mentions: [sender, target]
    })

    setTimeout(() => {
        if (proposals[target]) {
            delete proposals[target]
            delete proposals[sender]
            conn.sendMessage(m.chat, { text: '⏳ Proposta di matrimonio scaduta.' })
        }
    }, 60000)
}

/* ================= 👨‍👩‍👧 ADOZIONE ================= */
async function adotta(m, conn, users, usedPrefix, participants) {
    const sender = m.sender
    const target = m.mentionedJid?.[0] || m.quoted?.sender

    if (!target) throw `Usa: ${usedPrefix}adotta @utente`
    if (target === sender) throw '❌ Non puoi adottare te stesso'
    if (!users[target]) users[target] = {}

    if (users[target].genitori?.length)
        throw '❌ Questa persona ha già dei genitori'

    adoptions[target] = sender

    await conn.sendMessage(m.chat, {
        text:
`👨‍👩‍👧 *RICHIESTA DI ADOZIONE*

${tagUser(sender)} vuole adottare ${tagUser(target)} 💖

💬 Rispondi con:
✔️ *SI* per accettare  
❌ *NO* per rifiutare`,
        mentions: [sender, target]
    })

    setTimeout(() => {
        if (adoptions[target]) {
            delete adoptions[target]
            conn.sendMessage(m.chat, { text: '⏳ Richiesta di adozione scaduta.' })
        }
    }, 60000)
}

/* ================= 📜 FAMIGLIA ================= */
function famiglia(m, users, participants) {
    const user = users[m.sender]
    let txt = `👨‍👩‍👧 *FAMIGLIA DI ${tagUser(m.sender)}*\n\n`
    let mentions = [m.sender]

    txt += '💑 *Coniuge*\n'
    if (user.sposato && user.coniuge) {
        txt += `• ${tagUser(user.coniuge)}\n`
        mentions.push(user.coniuge)
    } else txt += '• Nessuno\n'

    txt += '\n👤 *Genitori*\n'
    if (user.genitori?.length) {
        for (let g of user.genitori) {
            txt += `• ${tagUser(g)}\n`
            mentions.push(g)
        }
    } else txt += '• Nessuno\n'

    txt += '\n👶 *Figli*\n'
    if (user.figli?.length) {
        for (let f of user.figli) {
            txt += `• ${tagUser(f)}\n`
            mentions.push(f)
        }
    } else txt += '• Nessuno'

    m.reply(txt, null, { mentions })
}

/* ================= 💔 DIVORZIO ================= */
function divorzia(m, users) {
    const user = users[m.sender]
    if (!user.sposato) throw '❌ Non sei sposato'

    const ex = users[user.coniuge]
    user.sposato = false
    user.coniuge = null

    if (ex) {
        ex.sposato = false
        ex.coniuge = null
    }

    m.reply('💔 Matrimonio terminato. Ora siete divorziati.')
}

/* ================= 🔒 CONFERME ================= */
handler.before = async (m, { conn }) => {
    if (!m.text) return
    const txt = m.text.toLowerCase().trim()
    const users = global.db.data.users

    /* MATRIMONIO */
    if (proposals[m.sender]) {
        const from = proposals[m.sender]
        const to = m.sender

        if (txt === 'si' || txt === 'sì') {
            users[from].sposato = true
            users[from].coniuge = to
            users[to].sposato = true
            users[to].coniuge = from

            delete proposals[from]
            delete proposals[to]

            return conn.sendMessage(m.chat, {
                text: `💍 ${tagUser(from)} e ${tagUser(to)} ora sono sposati! 💖`,
                mentions: [from, to]
            })
        }

        if (txt === 'no') {
            delete proposals[from]
            delete proposals[to]
            return m.reply('❌ Proposta di matrimonio rifiutata')
        }
    }

    /* ADOZIONE */
    if (adoptions[m.sender]) {
        const from = adoptions[m.sender]
        const to = m.sender

        if (txt === 'si' || txt === 'sì') {
            users[to].genitori = [from]
            users[from].figli = users[from].figli || []
            users[from].figli.push(to)

            if (users[from].sposato && users[from].coniuge) {
                const partner = users[from].coniuge
                users[partner].figli = users[partner].figli || []
                users[partner].figli.push(to)
                users[to].genitori.push(partner)
            }

            delete adoptions[to]

            return conn.sendMessage(m.chat, {
                text: `👨‍👩‍👧 ${tagUser(from)} ha adottato ${tagUser(to)} 💖`,
                mentions: [from, to]
            })
        }

        if (txt === 'no') {
            delete adoptions[to]
            return m.reply('❌ Adozione rifiutata')
        }
    }
}

/* ================= 💖 COPPIE ================= */
function coppie(m, users, participants) {
    let txt = '💖 *COPPIE SPOSATE NEL GRUPPO*\n\n'
    const mentions = []
    let found = false

    for (let p of participants) {
        const u = users[p.id]
        if (!u?.sposato || !u.coniuge) continue
        if (mentions.includes(p.id)) continue

        txt += `• ${tagUser(p.id)} ❤️ ${tagUser(u.coniuge)}\n`
        mentions.push(p.id, u.coniuge)
        found = true
    }

    if (!found) txt += 'Nessuna coppia al momento 😔'
    m.reply(txt, null, { mentions })
}

/* ================= ❌ TOGLI FIGLIO ================= */
function togliFiglio(m, users, participants) {
    const user = users[m.sender]
    const target = m.mentionedJid?.[0] || m.quoted?.sender
    if (!target) throw 'Usa: .toglifiglio @utente'

    if (!user.figli?.includes(target))
        throw '❌ Questa persona non è tuo figlio'

    user.figli = user.figli.filter(f => f !== target)
    users[target].genitori =
        users[target].genitori?.filter(g => g !== m.sender)

    m.reply(`✅ ${tagUser(target)} non è più tuo figlio`, null, { mentions: [target] })
}

/* ================= 🏷️ TAG ================= */
function tagUser(jid) {
    return '@' + jid.split('@')[0]
}

/* ================= COMANDI ================= */
handler.command = ['sposa', 'divorzia', 'adotta', 'famiglia', 'coppie', 'toglifiglio']
handler.group = true

export default handler