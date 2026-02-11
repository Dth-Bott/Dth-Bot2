let handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return m.reply("❌ Inserisci un numero.\n\nEsempio:\n.checkwa 393xxxxxxxxx");
    }

    let number = args[0].replace(/[^0-9]/g, '');

    if (number.length < 8) {
        return m.reply("❌ Numero non valido.");
    }

    let jid = number + '@s.whatsapp.net';

    try {
        let result = await conn.onWhatsApp(number);

        if (result?.[0]?.exists) {
            return m.reply(`✅ Il numero ${number} è registrato su WhatsApp.`);
        } else {
            return m.reply(`❌ Il numero ${number} NON risulta registrato su WhatsApp.\n\n⚠️ Potrebbe essere non registrato o bannato.`);
        }

    } catch (e) {
        console.error("Errore checkwa:", e);
        return m.reply("❌ Impossibile verificare il numero.\nControlla che il bot sia connesso correttamente.");
    }
};

handler.command = ['checkwa'];
handler.owner = true;

export default handler;