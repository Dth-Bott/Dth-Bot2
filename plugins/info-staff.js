/**
 * STAFF – TEMA SACRIFICE AUTOMATICO
 */

const handler = async (message, { conn, usedPrefix = '.', config }) => {
    const chat = await conn.getChatById(message.chat); // prende il gruppo o chat

    // Owners presi dalla configurazione del bot
    const BOT_OWNERS = config?.owners || []; // es: ['+212601646793', '+393801380688', '+212773631903']

    // Admin del gruppo (isAdmin)
    let admins = [];
    if (chat.isGroup) {
        await chat.fetchParticipants();
        admins = chat.participants
            .filter(p => p.isAdmin || p.isSuperAdmin)
            .map(p => ({ number: p.id.user, name: p.pushname || 'Nessuno' }));
    }

    // Costruzione del testo
    let staffText = `🩸 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄 • 𝐒𝐓𝐀𝐅𝐅 🩸\n\n════════════════════\n👑 𝐎𝐖𝐍𝐄𝐑\n════════════════════\n`;

    if (BOT_OWNERS.length) {
        BOT_OWNERS.forEach(num => {
            staffText += `☠️ ${num}\n   ↳ Nome non disponibile\n\n`; // opzionale: puoi aggiungere nomi in config
        });
    } else {
        staffText += `Nessuno\n`;
    }

    staffText += `════════════════════\n🛡️ 𝐀𝐃𝐌𝐈𝐍\n════════════════════\n`;

    if (admins.length) {
        admins.forEach(a => {
            staffText += `⚔️ +${a.number}\n   ↳ ${a.name}\n\n`;
        });
    } else {
        staffText += `Nessuno\n`;
    }

    staffText += `════════════════════\n💀 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄\n════════════════════`;

    // INVIO SOLO TESTO
    await conn.sendMessage(message.chat, { text: staffText });
};

handler.help = ['staff'];
handler.tags = ['info'];
handler.command = /^(staff)$/i;

export default handler;