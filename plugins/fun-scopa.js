let handler = async (m, { conn }) => {

  let user = m.mentionedJid?.[0] || m.quoted?.sender;
  if (!user) throw '❗ Tagga un utente o rispondi a un suo messaggio.';

  let target = user.split('@')[0];
  let sender = m.sender.split('@')[0];

  let message = `
╭━━━━━━━🔥━━━━━━━╮
   ✦ 𝐂𝐎𝐍𝐍𝐄𝐒𝐒𝐈𝐎𝐍𝐄 ✦
╰━━━━━━━🔥━━━━━━━╯

👑 @${sender}
⚔️ @${target}

💥 𝐒𝐭𝐚𝐧𝐧𝐨 𝐬𝐜𝐨𝐩𝐚𝐧𝐝𝐨 𝐡𝐚𝐫𝐝 𝐬𝐨𝐭𝐭𝐨 𝐥𝐞 𝐜𝐨𝐩𝐞𝐫𝐭𝐞
`;

  await conn.reply(m.chat, message, m, {
    mentions: [user, m.sender]
  });

  await conn.sendMessage(m.chat, {
    react: {
      text: '🔥',
      key: m.key
    }
  });
};

handler.customPrefix = /^\.scopa$/i;
handler.command = new RegExp;
export default handler;