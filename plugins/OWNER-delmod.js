import fetch from 'node-fetch'

const handler = async (m, { conn }) => {
  let who;
  if (m.isGroup)
    who = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : null);
  else who = m.chat;

  if (!who)
    return m.reply('⚠️ 𝐓𝐚𝐠𝐠𝐚 𝐥’𝐮𝐭𝐞𝐧𝐭𝐞 𝐚 𝐜𝐮𝐢 𝐫𝐢𝐦𝐮𝐨𝐯𝐞𝐫𝐞 𝐢𝐥 𝐌𝐎𝐃𝐄𝐑𝐀𝐓𝐎𝐑𝐄.');

  const user = global.db.data.users[who];
  if (!user)
    return m.reply('❌ 𝐐𝐮𝐞𝐬𝐭𝐨 𝐮𝐭𝐞𝐧𝐭𝐞 𝐧𝐨𝐧 𝐞̀ 𝐩𝐫𝐞𝐬𝐞𝐧𝐭𝐞 𝐧𝐞𝐥 𝐝𝐚𝐭𝐚𝐛𝐚𝐬𝐞.');

  if (!user.premium)
    return m.reply('ℹ️ 𝐐𝐮𝐞𝐬𝐭𝐨 𝐮𝐭𝐞𝐧𝐭𝐞 𝐧𝐨𝐧 𝐞̀ 𝐮𝐧 𝐌𝐎𝐃𝐄𝐑𝐀𝐓𝐎𝐑𝐄.');

  // 🚫 Revoca MOD
  user.premium = false;
  user.premiumTime = 0;

  // 📸 Foto profilo → thumbnail
  let thumb;
  try {
    const ppUrl = await conn.profilePictureUrl(who, 'image');
    const res = await fetch(ppUrl);
    thumb = await res.buffer();
  } catch {
    const res = await fetch('https://i.ibb.co/3Fh9V6p/avatar-contact.png');
    thumb = await res.buffer();
  }

  const name = '@' + who.split('@')[0];

  const caption = `
╔══════════════════╗
   🚫 𝐌𝐎𝐃 𝐑𝐈𝐌𝐎𝐒𝐒𝐎 🚫
╚══════════════════╝

👤 𝐔𝐭𝐞𝐧𝐭𝐞:
➤ ${name}

🛡️ 𝐑𝐮𝐨𝐥𝐨:
➤ 𝐄𝐗 𝐌𝐨𝐝𝐞𝐫𝐚𝐭𝐨𝐫𝐞 𝐝𝐢 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄

⛔ 𝐒𝐭𝐚𝐭𝐨:
➤ 𝐃𝐈𝐒𝐀𝐓𝐓𝐈𝐕𝐀𝐓𝐎

🔒 𝐓𝐮𝐭𝐭𝐢 𝐢 𝐩𝐫𝐢𝐯𝐢𝐥𝐞𝐠𝐢 𝐬𝐨𝐧𝐨 𝐬𝐭𝐚𝐭𝐢 𝐫𝐞𝐯𝐨𝐜𝐚𝐭𝐢

⚠️ 𝐋𝐚 𝐝𝐞𝐜𝐢𝐬𝐢𝐨𝐧𝐞 𝐞̀ 𝐝𝐞𝐟𝐢𝐧𝐢𝐭𝐢𝐯𝐚.
`.trim();

  await conn.sendMessage(
    m.chat,
    {
      text: caption,
      mentions: [who],
      contextInfo: {
        jpegThumbnail: thumb
      }
    },
    { quoted: m }
  );
};

handler.help = ['delmod @user'];
handler.tags = ['owner'];
handler.command = ['delmod'];
handler.group = true;
handler.owner = true;

export default handler;