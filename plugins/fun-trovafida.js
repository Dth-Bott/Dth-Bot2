let handler = async (m, { conn, command }) => {

    if (command === 'trovafida') {

        let toM = a => '@' + a.split('@')[0];

        // Ottieni metadata del gruppo
        let groupMetadata = await conn.groupMetadata(m.chat);
        let ps = groupMetadata.participants.map(v => v.id);

        if (ps.length < 2) {
            return m.reply('Non ci sono abbastanza partecipanti nel gruppo per trovare una coppia.');
        }

        let a = ps[Math.floor(Math.random() * ps.length)];
        let b;
        do {
            b = ps[Math.floor(Math.random() * ps.length)];
        } while (b === a);

        await m.reply(
            `══════ •⊰✦⊱• ══════
${toM(a)} 𝐞 ${toM(b)} 𝐨𝐫𝐚 𝐬𝐢𝐞𝐭𝐞 𝐟𝐢𝐝𝐚𝐧𝐳𝐚𝐭𝐢
══════ •⊰✦⊱• ══════`,
            null,
            { mentions: [a, b] }
        );
    }
};

handler.help = ['trovafida'];
handler.tags = ['fun'];
handler.command = /^trovafida$/i;
handler.group = true;

export default handler;