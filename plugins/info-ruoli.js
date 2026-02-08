const handler = m => m;

handler.before = async function (message, { conn }) {
  const chat = global.db.data.chats[message.chat] || {};
  const detectEnabled = chat.detect;

  if (!detectEnabled) return;

  // prende sempre il JID corretto di chi ha fatto l'azione
  const sender = message.participant || message.sender;

  // PROMOZIONE (admin dato)
  if (message.messageStubType === 29) {
    const promotedUser = message.messageStubParameters[0];

    await conn.sendMessage(message.chat, {
      text: `🩸 *@${sender.split('@')[0]}* 𝐡𝐚 𝐝𝐚𝐭𝐨 𝐢 𝐩𝐨𝐭𝐞𝐫𝐢 𝐚 *@${promotedUser.split('@')[0]}*`,
      mentions: [sender, promotedUser]
    });
  }

  // RETROCESSIONE (admin tolto)
  if (message.messageStubType === 30) {
    const demotedUser = message.messageStubParameters[0];

    await conn.sendMessage(message.chat, {
      text: `⛓️ *@${sender.split('@')[0]}* 𝐡𝐚 𝐭𝐨𝐥𝐭𝐨 𝐢 𝐩𝐨𝐭𝐞𝐫𝐢 𝐚 *@${demotedUser.split('@')[0]}*`,
      mentions: [sender, demotedUser]
    });
  }
};

export default handler;