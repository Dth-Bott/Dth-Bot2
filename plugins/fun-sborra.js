import { performance } from "perf_hooks";

// Funzione per ritardo (delay)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let handler = async (message, { conn, text, participants }) => {
    let mentionedJid = [];

    if (message.quoted) {
        // Se rispondi a un messaggio, menziona chi ha scritto quel messaggio
        mentionedJid = [message.quoted.sender];
    } else if (message.mentionedJid && message.mentionedJid.length) {
        // Se il testo contiene un @ menziona quelli
        mentionedJid = message.mentionedJid;
    } else if (text && text.startsWith('@')) {
        // Se l'utente scrive direttamente @numero
        let number = text.replace('@', '').replace(/\s+/g, '') + '@s.whatsapp.net';
        mentionedJid = [number];
    } else {
        // Se nessuno viene menzionato, menziona l'autore stesso
        mentionedJid = [message.sender];
    }

    // Messaggi personalizzati
    let messages = [
        `✊🏻 Inizio a farmi una sega su @${mentionedJid[0].split('@')[0]}...`,
        `🍆👖 Tiro fuori il cazzo dai pantaloni!`,
        `✊🏻🍆 inizio con la sega...`,
        `🤤 Mi eccito sempre di più a vederla/o.`,
        `💭 Immagino che sia lei/lui a farmela!`,
        `😫 Sto per venire...`,
        `🍆💦 Sono venuto in faccia a @${mentionedJid[0].split('@')[0]}!`
    ];

    // Sequenza dei messaggi con ritardo
    for (let msg of messages) {
        await conn.reply(message.chat, msg, message, {
            mentions: mentionedJid
        });
        await delay(2000);
    }

    // Simula un tempo casuale tra 0.00 e 5.00 secondi
    let simulatedTime = (Math.random() * 5).toFixed(2);

    let finalMessage = `🍆💦 Ho sborrato in *${simulatedTime} secondi*! Grazie della sborrata @${mentionedJid[0].split('@')[0]}!`;
    await conn.reply(message.chat, finalMessage, message, {
        mentions: mentionedJid
    });
};

// Configurazione del comando
handler.command = ['sborra'];
handler.tags = ['fun'];
handler.help = ['.sborra @utente'];

export default handler;