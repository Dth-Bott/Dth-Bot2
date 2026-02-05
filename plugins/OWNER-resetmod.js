import fetch from 'node-fetch'

const handler = async (m, { conn }) => {
  if (!m.isGroup)
    return m.reply('❌ 𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐟𝐮𝐧𝐳𝐢𝐨𝐧𝐚 𝐬𝐨𝐥𝐨 𝐧𝐞𝐢 𝐠𝐫𝐮𝐩𝐩𝐢.');

  const users = global.db.data.users;
  let removed = [];

  for (let jid in users) {
    if (users[jid].premium) {
      users[jid].premium = false;
      users[jid].premiumTime = 0;
      removed.push(jid);
    }
  }

  if (removed.length === 0)
    return m.reply('ℹ️ 𝐍𝐨𝐧 𝐜𝐢 𝐬𝐨𝐧𝐨 𝐌𝐎𝐃𝐄𝐑𝐀𝐓𝐎𝐑𝐈 𝐚𝐭𝐭𝐢𝐯𝐢 𝐝𝐚 𝐫𝐢𝐦𝐮𝐨𝐯𝐞𝐫𝐞.');

  // 📸 Thumbnail
  let thumb;
  try {
    const ppUrl = await conn.profilePictureUrl(m.chat, 'image');
    const res = await fetch(ppUrl);
    thumb = await res.buffer();
  } catch {
    const res = await fetch('https://i.ibb.co/3Fh9V6p/avatar-contact.png');
    thumb = await res.buffer();
  }

  const list = removed
    .map((jid, i) => `➤ ${i + 1}. @${jid.split('@')[0]}`)
    .join('\n');

  const caption = `
╔══════════════╗
   ⚠️ 𝐑𝐄𝐒𝐄𝐓 𝐌𝐎𝐃 ⚠️
╚══════════════╝

🔥 𝐎𝐩𝐞𝐫𝐚𝐳𝐢𝐨𝐧𝐞 𝐂𝐨𝐦𝐩𝐥𝐞𝐭𝐚𝐭𝐚

🛡️ 𝐓𝐮𝐭𝐭𝐢 𝐢 𝐌𝐎𝐃𝐄𝐑𝐀𝐓𝐎𝐑𝐈 𝐝𝐢
   𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄
   𝐬𝐨𝐧𝐨 𝐬𝐭𝐚𝐭𝐢 𝐫𝐢𝐦𝐨𝐬𝐬𝐢

👥 𝐌𝐨𝐝𝐞𝐫𝐚𝐭𝐨𝐫𝐢 𝐑𝐞𝐯𝐨𝐜𝐚𝐭𝐢:
${list}

🔒 𝐓𝐮𝐭𝐭𝐢 𝐢 𝐩𝐫𝐢𝐯𝐢𝐥𝐞𝐠𝐢
   𝐬𝐨𝐧𝐨 𝐬𝐭𝐚𝐭𝐢 𝐚𝐧𝐧𝐮𝐥𝐥𝐚𝐭𝐢

⚠️ 𝐀𝐳𝐢𝐨𝐧𝐞 𝐢𝐫𝐫𝐞𝐯𝐞𝐫𝐬𝐢𝐛𝐢𝐥𝐞
`.trim();

  await conn.sendMessage(
    m.chat,
    {
      text: caption,
      mentions: removed,
      contextInfo: {
        jpegThumbnail: thumb
      }
    },
    { quoted: m }
  );
};

handler.help = ['resetmod'];
handler.tags = ['owner'];
handler.command = ['resetmod'];
handler.group = true;
handler.owner = true;

export default handler;