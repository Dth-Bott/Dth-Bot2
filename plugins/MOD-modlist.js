const handler = async (m, { conn, text }) => {
  const users = global.db.data.users || {};

  const mods = Object.entries(users)
    .filter(([_, user]) => user.premium === true)
    .map(([jid]) => jid);

  if (mods.length === 0)
    return m.reply('⚠️ 𝐍𝐞𝐬𝐬𝐮𝐧 𝐌𝐎𝐃𝐄𝐑𝐀𝐓𝐎𝐑𝐄 𝐝𝐢 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄 𝐭𝐫𝐨𝐯𝐚𝐭𝐨.');

  // 📝 Messaggio personalizzato opzionale
  const customMsg = text
    ? `╔═════════════╗
📝 𝐌𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨 𝐝𝐞𝐥𝐥’𝐀𝐦𝐦𝐢𝐧
╚═════════════╝
${text}

`
    : '';

  const caption = `
╔════════════╗
   👑 𝐋𝐈𝐒𝐓𝐀 𝐌𝐎𝐃 👑
╚════════════╝
        🔥 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄 🔥

${customMsg}📊 𝐓𝐨𝐭𝐚𝐥𝐞 𝐌𝐎𝐃:
➤ ${mods.length}

╔═══════════╗
      ⚔️ 𝐒𝐓𝐀𝐅𝐅 ⚔️
╚═══════════╝

${mods.map((jid, i) => `➤ ${i + 1}.  @${jid.split('@')[0]}`).join('\n')}
`.trim();

  await conn.sendMessage(
    m.chat,
    {
      text: caption,
      mentions: mods
    },
    { quoted: m }
  );
};

handler.help = ['modlist (messaggio)'];
handler.tags = ['owner'];
handler.command = ['modlist'];
handler.group = true;
handler.admin = true;

export default handler;