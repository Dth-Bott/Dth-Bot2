const CREATOR = 
      '212773631903@s.whatsapp.net';
      '393801380688@s.whatsapp.net';

const handler = async (msg, { conn, command, text, isAdmin }) => {
  let mentionedJid = msg.mentionedJid?.[0] || msg.quoted?.sender;

  if (!mentionedJid && text) {
    if (text.endsWith('@s.whatsapp.net') || text.endsWith('@c.us')) {
      mentionedJid = text.trim();
    } else {
      let number = text.replace(/[^0-9]/g, '');
      if (number.length >= 8 && number.length <= 15) {
        mentionedJid = number + '@s.whatsapp.net';
      }
    }
  }

  const chatId = msg.chat;
  const botNumber = conn.user.jid;
  const groupMetadata = await conn.groupMetadata(chatId);
  const groupOwner =
    groupMetadata.owner || chatId.split('-')[0] + '@s.whatsapp.net';

  if (!isAdmin)
    throw '╭━━━❌━━━╮\n 𝐀𝐂𝐂𝐄𝐒𝐒𝐎 𝐍𝐄𝐆𝐀𝐓𝐎\n╰━━━❌━━━╯\n\n𝐒𝐨𝐥𝐨 𝐠𝐥𝐢 𝐚𝐝𝐦𝐢𝐧 𝐩𝐨𝐬𝐬𝐨𝐧𝐨 𝐮𝐬𝐚𝐫𝐞 𝐪𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨.';

  if (!mentionedJid)
    return conn.reply(
      chatId,
      `╭━━━⚠️━━━╮\n 𝐔𝐓𝐄𝐍𝐓𝐄 𝐍𝐎𝐍 𝐓𝐑𝐎𝐕𝐀𝐓𝐎\n╰━━━⚠️━━━╯\n\n𝐓𝐚𝐠𝐠𝐚 𝐥'𝐮𝐭𝐞𝐧𝐭𝐞 𝐝𝐚 ${
        command === 'muta' ? '𝐦𝐮𝐭𝐚𝐫𝐞 🔇' : '𝐬𝐦𝐮𝐭𝐚𝐫𝐞 🔊'
      }`,
      msg
    );

  if (mentionedJid === groupOwner)
    throw '╭━━━👑━━━╮\n 𝐏𝐑𝐎𝐓𝐄𝐓𝐓𝐎\n╰━━━👑━━━╯\n\n𝐈𝐥 𝐜𝐫𝐞𝐚𝐭𝐨𝐫𝐞 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐩𝐨 𝐧𝐨𝐧 𝐩𝐮𝐨̀ 𝐞𝐬𝐬𝐞𝐫𝐞 𝐦𝐮𝐭𝐚𝐭𝐨.';

  if (mentionedJid === CREATOR)
    throw '╭━━━👑━━━╮\n 𝐂𝐑𝐄𝐀𝐓𝐎𝐑𝐄\n╰━━━👑━━━╯\n\n🚫 𝐈𝐥 𝐜𝐫𝐞𝐚𝐭𝐨𝐫𝐞 𝐝𝐞𝐥 𝐛𝐨𝐭 𝐞̀ 𝐢𝐧𝐭𝐨𝐜𝐜𝐚𝐛𝐢𝐥𝐞.';

  if (mentionedJid === botNumber)
    throw '𝐍𝐨𝐧 𝐩𝐮𝐨𝐢 𝐦𝐮𝐭𝐚𝐫𝐞 𝐢𝐥 𝐛𝐨𝐭.';

  const user = global.db.data.users[mentionedJid];
  const isMute = command === 'muta';
  const tag = '@' + mentionedJid.split('@')[0];

  // 🔇 MUTA
  if (isMute) {
    if (user.muto) throw '⚠️ 𝐋’𝐮𝐭𝐞𝐧𝐭𝐞 è 𝐠𝐢à 𝐦𝐮𝐭𝐚𝐭𝐨.';
    user.muto = true;

    return conn.sendMessage(chatId, {
      text: `╭━━━━━━━🔇━━━━━━━╮
   ✦ 𝐌𝐔𝐓𝐄 𝐀𝐓𝐓𝐈𝐕𝐀𝐓𝐎 ✦
╰━━━━━━━🔇━━━━━━━╯

👤 𝐔𝐭𝐞𝐧𝐭𝐞: ${tag}
🔒 𝐒𝐭𝐚𝐭𝐨: 𝐌𝐮𝐭𝐚𝐭𝐨
⏳ 𝐃𝐮𝐫𝐚𝐭𝐚: 𝐅𝐢𝐧𝐨 𝐚 .𝐬𝐦𝐮𝐭𝐚`,
      mentions: [mentionedJid],
    });
  }

  // 🔊 SMUTA
  if (!user.muto) throw '⚠️ 𝐋’𝐮𝐭𝐞𝐧𝐭𝐞 𝐧𝐨𝐧 è 𝐦𝐮𝐭𝐚𝐭𝐨.';
  user.muto = false;

  return conn.sendMessage(chatId, {
    text: `╭━━━━━━━🔊━━━━━━━╮
   ✦ 𝐌𝐔𝐓𝐄 𝐑𝐈𝐌𝐎𝐒𝐒𝐎 ✦
╰━━━━━━━🔊━━━━━━━╯

👤 𝐔𝐭𝐞𝐧𝐭𝐞: ${tag}
🔓 𝐒𝐭𝐚𝐭𝐨: 𝐒𝐦𝐮𝐭𝐚𝐭𝐨`,
    mentions: [mentionedJid],
  });
};

handler.command = /^(muta|smuta)$/i;
handler.group = true;
handler.botAdmin = true;
handler.admin = true;

export default handler;