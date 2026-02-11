/**
 * STAFF – TEMA SACRIFICE AUTOMATICO (Baileys)
 */

const handler = async (m, { conn, usedPrefix = '.', config }) => {
    const chatId = m.chat; // chat del messaggio
    let staffText = `🩸 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄 • 𝐒𝐓𝐀𝐅𝐅 🩸\n\n════════════════════\n👑 𝐎𝐖𝐍𝐄𝐑\n════════════════════\n`;

    // Owners presi dalla config
    const BOT_OWNERS = config?.owners || []; // es: ['+212601646793','+393801380688']

    if (BOT_OWNERS.length) {
        BOT_OWNERS.forEach(owner => {
            staffText += `☠️ ${owner.number || owner}\n   ↳ ${owner.name || 'Nome non disponibile'}\n\n`;
        });
    } else {
        staffText += `Nessuno\n`;
    }

    staffText += `════════════════════\n🛡️ 𝐀𝐃𝐌𝐈𝐍\n════════════════════\n`;

    // Admin del gruppo (solo se è un gruppo)
    if (m.isGroup) {
        const metadata = await conn.groupMetadata(chatId);
        const admins = metadata.participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin');

        if (admins.length) {
            admins.forEach(a => {
                const number = a.id.split('@')[0]; // rimuove il suffisso @s.whatsapp.net
                staffText += `⚔️ +${number}\n   ↳ ${a.notify || 'Nome non disponibile'}\n\n`;
            });
        } else {
            staffText += `Nessuno\n`;
        }
    } else {
        staffText += `Nessuno\n`;
    }

    staffText += `════════════════════\n💀 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄\n════════════════════`;

    // INVIO SOLO TESTO
    await conn.sendMessage(chatId, { text: staffText });
};

handler.help = ['staff'];
handler.tags = ['info'];
handler.command = /^(staff)$/i;

export default handler;