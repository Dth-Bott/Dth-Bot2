const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const handler = async (m, { conn }) => {

    // Messaggio iniziale
    const msg = await conn.sendMessage(
        m.chat,
        { text: "🔄 Riavvio in corso..." },
        { quoted: m }
    );

    await delay(1000);
    await conn.sendMessage(m.chat, {
        text: "🚀 Avvio spegnimento...",
        edit: msg.key
    });

    await delay(1000);
    await conn.sendMessage(m.chat, {
        text: "🚀🚀 Riavvio del sistema...",
        edit: msg.key
    });

    await delay(1000);
    await conn.sendMessage(m.chat, {
        text: "✅ Riavvio completato!💤",
        edit: msg.key
    });

    // Chiude il processo
    // npm start / pm2 / nodemon lo riavvieranno automaticamente
    process.exit(0);
};

handler.help = ["riavvia"];
handler.tags = ["owner"];
handler.command = ["riavvia", "reiniciar", "restart"];
handler.owner = true;

export default handler;