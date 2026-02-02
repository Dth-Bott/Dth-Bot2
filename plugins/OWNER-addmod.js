import fetch from 'node-fetch'

const handler = async (m, { conn }) => {
  let who;
  if (m.isGroup)
    who = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : null);
  else who = m.chat;

  if (!who)
    return m.reply('⚠️ 𝐓𝐚𝐠𝐠𝐚 𝐥’𝐮𝐭𝐞𝐧𝐭𝐞 𝐝𝐚 𝐩𝐫𝐨𝐦𝐮𝐨𝐯𝐞𝐫𝐞 𝐚 𝐌𝐎𝐃𝐄𝐑𝐀𝐓𝐎𝐑𝐄.');

  // ✅ CREA L’UTENTE SE NON ESISTE
  let user = global.db.data.users[who];
  if (!user) {
    global.db.data.users[who] = {};
    user = global.db.data.users[who];
  }

  // 🔒 MOD permanente
  user.premium = true;
  user.premiumTime = Infinity;

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
   👑 𝐌𝐎𝐃 𝐀𝐓𝐓𝐈𝐕𝐀𝐓𝐎 👑
╚══════════════════╝

✨ 𝐔𝐭𝐞𝐧𝐭𝐞:
➤ ${name}

🛡️ 𝐑𝐮𝐨𝐥𝐨:
➤ 𝐌𝐨𝐝𝐞𝐫𝐚𝐭𝐨𝐫𝐞 𝐝𝐢 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄

⏳ 𝐃𝐮𝐫𝐚𝐭𝐚:
➤ 𝐏𝐄𝐑𝐌𝐀𝐍𝐄𝐍𝐓𝐄 ♾️

🚀 𝐀𝐜𝐜𝐞𝐬𝐬𝐨 𝐜𝐨𝐦𝐩𝐥𝐞𝐭𝐨 𝐬𝐛𝐥𝐨𝐜𝐜𝐚𝐭𝐨

⚔️ 𝐁𝐞𝐧𝐯𝐞𝐧𝐮𝐭𝐨 𝐧𝐞𝐥𝐥𝐨 𝐬𝐭𝐚𝐟𝐟 𝐝𝐢
   🔥 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄 🔥
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

handler.help = ['addmod @user'];
handler.tags = ['owner'];
handler.command = ['addmod'];
handler.group = true;
handler.owner = true;

export default handler;