let handler = async (m, { conn }) => {

    let who = m.mentionedJid[0] 
        ? m.mentionedJid[0] 
        : m.quoted 
        ? m.quoted.sender 
        : m.sender;

    if (who == conn.user.jid) return;

    if (!(who in global.db.data.users)) 
        return conn.reply(m.chat, '🚩 Utente non trovato nel database.', m);

    let user = global.db.data.users[who];

    // Sicurezza dati
    if (!user.euro) user.euro = 0;
    if (!user.bank) user.bank = 0;
    if (!user.highestBalance) user.highestBalance = user.euro;

    const formatNumber = (num) => num.toLocaleString('it-IT');

    // Aggiorna record saldo
    if (user.euro > user.highestBalance) {
        user.highestBalance = user.euro;
    }

    const total = user.euro + user.bank;
    const rank = getRank(user.euro);
    const nextRank = getNextRank(user.euro);
    const missing = nextRank.required > 0 
        ? Math.max(0, nextRank.required - user.euro) 
        : 0;

    let message = `
╔═ 💼 𝑾𝑨𝑳𝑳𝑬𝑻 💼 ═╗
║
║ 👤 Utente: @${who.split('@')[0]}
║ 🎖 Rank: ${rank.name} ${rank.emoji}
║
║ 💶 Contanti
║    ➜ ${formatNumber(user.euro)} €
║
║ 🏦 Banca
║    ➜ ${formatNumber(user.bank)} €
║
║ ─────────────────
║ 🧾 Totale
║    ➜ ${formatNumber(total)} €
║
║ 📊 Prossimo Rank
║    ➜ ${nextRank.name} ${nextRank.emoji}
║    ➜ Mancano: ${formatNumber(missing)} €
║
╚════════════════╝
`.trim();

    await m.reply(message, null, { mentions: [who] });
};

function getRank(euro) {
    if (euro >= 100000) return { name: 'CEO', emoji: '💼' };
    if (euro >= 50000) return { name: 'Investitore', emoji: '📈' };
    if (euro >= 25000) return { name: 'Avvocato', emoji: '⚖️' };
    if (euro >= 10000) return { name: 'Ingegnere', emoji: '🛠️' };
    if (euro >= 5000) return { name: 'Commesso', emoji: '🛍️' };
    return { name: 'Tirocinante', emoji: '🧑‍💼' };
}

function getNextRank(euro) {
    if (euro >= 100000) return { name: 'MAX', emoji: '💼', required: 0 };
    if (euro >= 50000) return { name: 'CEO', emoji: '💼', required: 100000 };
    if (euro >= 25000) return { name: 'Investitore', emoji: '📈', required: 50000 };
    if (euro >= 10000) return { name: 'Avvocato', emoji: '⚖️', required: 25000 };
    if (euro >= 5000) return { name: 'Ingegnere', emoji: '🛠️', required: 10000 };
    return { name: 'Commesso', emoji: '🛍️', required: 5000 };
}

handler.help = ['wallet'];
handler.tags = ['euro'];
handler.command = /^(wallet|portafoglio|bilancio)$/i;
handler.register = true;

export default handler;