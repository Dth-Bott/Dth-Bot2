let delay = (ms) => new Promise(res => setTimeout(res, ms));

let handler = async (m, { conn }) => {

    // Controllo menzione
    let who = m.mentionedJid && m.mentionedJid[0];
    if (!who) {
        return m.reply('❌ Devi usare il comando così:\n*.hotdog @utente*');
    }

    let nome = '@' + who.split('@')[0];

    let messages = [
        `🌭 Inizio a preparare un Hot Dog per ${nome}...`,
        `🔥 Sto scaldando il wurstel sulla griglia!`,
        `🥖 Taglio il panino a metà...`,
        `🧀 Aggiungo il formaggio fuso.`,
        `🌶️ Un tocco di salse segrete...`,
        `🍽️ Il Hot Dog è quasi pronto...`,
        `🎉 Voilà! Hot Dog servito per ${nome}!`
    ];

    for (let msg of messages) {
        await conn.reply(m.chat, msg, m, {
            mentions: [who]
        });
        await delay(2000);
    }

    let finalMessage = `🌭 Hot Dog pronto! Buon appetito ${nome} 😋`;
    await conn.reply(m.chat, finalMessage, m, {
        mentions: [who]
    });
};

handler.command = ['hotdog'];
handler.tags = ['fun'];
handler.help = ['hotdog @utente'];

export default handler;