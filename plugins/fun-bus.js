import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) {
        return m.reply("❌ *Devi specificare una città!* \nEsempio: _.bus Milano_");
    }

    let query = encodeURIComponent(`orari bus ${text}`);
    let url = `https://www.google.com/search?q=${query}`;

    let messaggio = `🚌 *Orari dei bus per* _${text}_:\n🔎 *Cerca qui:* ${url}`;

    await conn.sendMessage(m.chat, { text: messaggio }, { quoted: m });
};

// Definizione del comando per Gab
handler.command = ["bus"];
export default handler;