// Plugin fatto da Axtral_WiZaRd – Tema Sacrifice
const handler = m => m;

// lista autorizzati 
const registeredAdmins = [
  '212773631903@s.whatsapp.net',
  '@s.whatsapp.net',
];

handler.before = async function (m, { conn, participants, isBotAdmin }) {
  if (!m.isGroup) return;
  if (!isBotAdmin) return;

  const chat = global.db.data.chats[m.chat];
  if (!chat?.antinuke) return;

  const sender = m.key?.participant || m.participant || m.sender;

  if (![29, 30].includes(m.messageStubType)) return;

  const botJid = conn.user.id.split(':')[0] + '@s.whatsapp.net';
  const BOT_OWNERS = global.owner.map(o => o[0] + '@s.whatsapp.net');

  let founderJid = null;
  try {
    const metadata = await conn.groupMetadata(m.chat);
    founderJid = metadata.owner;
  } catch {
    founderJid = null;
  }

  const allowed = [
    botJid,
    ...BOT_OWNERS,
    ...registeredAdmins,
    founderJid
  ].filter(Boolean);

  if (allowed.includes(sender)) return;

  const usersToDemote = participants
    .filter(p => p.admin)
    .map(p => p.jid)
    .filter(jid => jid && !allowed.includes(jid));

  if (!usersToDemote.length) return;

  await conn.groupParticipantsUpdate(
    m.chat,
    usersToDemote,
    'demote'
  );

  await conn.groupSettingUpdate(m.chat, 'announcement');

  const action = m.messageStubType === 29 ? 'Promozione' : 'Retrocessione';

  const groupName = m.pushName || 'GRUPPO SACRIFICE';

  const text = `
🩸 𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄 • 𝐒𝐔𝐍𝐆 𝐃𝐄𝐋 𝐆𝐑𝐔𝐏𝐏𝐎 🩸

════════════════════
⚠️ 𝐀𝐙𝐈𝐎𝐍𝐄 𝐍𝐎𝐍 𝐀𝐔𝐓𝐎𝐑𝐈𝐙𝐙𝐀𝐓𝐀
════════════════════
👤 @${sender.split('@')[0]} ha effettuato una ${action} NON autorizzata.

🔻 𝐀𝐃𝐌𝐈𝐍 𝐑𝐈𝐌𝐎𝐒𝐒𝐈:
${usersToDemote.map(j => `☠️ @${j.split('@')[0]}`).join('\n')}

🔒 𝐆𝐑𝐔𝐏𝐏𝐎: *${groupName.toUpperCase()}* chiuso temporaneamente per sicurezza.

👑 𝐎𝐖𝐍𝐄𝐑 𝐀𝐕𝐕𝐈𝐒𝐀𝐓𝐈:
${BOT_OWNERS.map(x => `💀 @${x.split('@')[0]}`).join('\n')}

════════════════════
🛡️ 𝐒𝐈𝐒𝐓𝐄𝐌𝐀 𝐃𝐈 𝐒𝐄𝐂𝐔𝐑𝐈𝐓𝐘 𝐀𝐓𝐓𝐈𝐕𝐎
_il coglione ha veramente provato a nukkare *SACRIFICE*, ritenta sarai più fortunato la prossima volta_
════════════════════
`.trim();

  await conn.sendMessage(m.chat, {
    text,
    contextInfo: {
      mentionedJid: [...usersToDemote, ...BOT_OWNERS].filter(Boolean),
    },
  });
};

export default handler;