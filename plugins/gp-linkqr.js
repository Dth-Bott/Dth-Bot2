import QRCode from 'qrcode';

const handler = async (m, { conn, isAdmin, isBotAdmin }) => {

  if (!m.isGroup) {
    return m.reply('❌ Questo comando funziona solo nei gruppi.');
  }

  if (!isAdmin) {
    return m.reply('❌ Solo gli admin possono usare questo comando.');
  }

  if (!isBotAdmin) {
    return m.reply('❌ Devo essere admin per generare il link QR del gruppo.');
  }

  try {
    // Ottieni il codice invito
    const inviteCode = await conn.groupInviteCode(m.chat);
    const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;

    // Genera QR code
    const qrImageBuffer = await QRCode.toBuffer(inviteLink);

    // Invia immagine + link
    await conn.sendMessage(m.chat, {
      image: qrImageBuffer,
      caption: `📌 *Link del gruppo*\n\n🔗 ${inviteLink}`
    });

  } catch (error) {
    console.error(error);
    m.reply('❌ Errore durante la generazione del link QR.');
  }
};

handler.command = ['linkqr'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;