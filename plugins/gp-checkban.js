let handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return m.reply("❌ Inserisci un numero.\n\nEsempio:\n.checkban 393xxxxxxxxx");
    }

    let number = args[0].replace(/[^0-9]/g, '');

    if (number.length < 8) {
        return m.reply("❌ Numero non valido.");
    }

    let jid = number + '@s.whatsapp.net';

    try {
        let check = await conn.onWhatsApp(jid);

        if (check && check.length > 0 && check[0].exists) {
            m.reply(`✅ Il numero ${number} non è bannato`);
        } else {
            m.reply(`❌ Il numero ${number} è bannato`);
        }

    } catch (e) {
        console.error(e);
        m.reply("❌ Errore durante il controllo.");
    }
};

handler.command = ['checkbab'];
handler.owner = true;

export default handler;