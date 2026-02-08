let handler = async (m, { conn }) => {
    // Lista di macchine disponibili
    const macchine = [
        "🚗 Ferrari LaFerrari",
        "🏎 Lamborghini Aventador",
        "🚙 Jeep Wrangler",
        "🚘 Tesla Model S",
        "🚔 Ford Mustang",
        "🚖 BMW M4",
        "🚜 Trattore John Deere (perché no? 😂)",
        "🚍 Mercedes Sprinter",
        "🚚 Volvo FH16 (Camion)",
        "🚓 Bugatti Chiron",
        "🚕 Audi R8",
        "🏎 McLaren P1",
        "🚐 Volkswagen Transporter",
        "🚗 Toyota Supra",
        "🚖 Nissan GTR R34"
    ];

    // Sceglie una macchina casuale
    let macchinaCasuale = macchine[Math.floor(Math.random() * macchine.length)];

    // Messaggio da inviare
    let messaggio = `🚘 *Ecco la tua macchina:* ${macchinaCasuale}!\n\n🏁 Buon viaggio!`;

    // Invia il messaggio
    await conn.sendMessage(m.chat, { text: messaggio }, { quoted: m });
};

// Definizione del comando per Gab
handler.command = ["macchina"];
export default handler;