let linkRegex = /(?:https?:\/\/|www\.)[^\s]*instagram[^\s]*|(?:^|\s)[^\s]*instagram[^\s]*\.(com|it|net|org|ru|me|co|io|tv)(?:\/[^\s]*)?/i;

export async function before(m, { isAdmin, isPrems, isBotAdmin, conn }) {
  if (m.isBaileys || m.fromMe) return true;
  if (!m.isGroup) return false;

  let chat = global.db.data.chats[m.chat];
  if (!chat) return false;

  let warnLimit = 3;
  let senderId = m.key.participant;
  let messageId = m.key.id;

  const isInstagramLink = linkRegex.exec(m.text);

  if (chat.antiInsta && isInstagramLink && !isAdmin && !isPrems && isBotAdmin) {

    global.db.data.users[m.sender] ??= {};
    global.db.data.users[m.sender].warn ??= 0;
    global.db.data.users[m.sender].warnReasons ??= [];

    global.db.data.users[m.sender].warn += 1;
    global.db.data.users[m.sender].warnReasons.push('link instagram');

    await conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: messageId,
        participant: senderId,
      },
    });

    let warnCount = global.db.data.users[m.sender].warn;
    let remaining = warnLimit - warnCount;

    if (warnCount < warnLimit) {

      await conn.sendMessage(m.chat, {
        text: `╔═══━─━─━─━─━─━─━═══╗
   𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄 • 𝐀𝐍𝐓𝐈𝐈𝐍𝐒𝐓𝐀
╚═══━─━─━─━─━─━─━═══╝
𝐋𝐈𝐍𝐊 𝐈𝐍𝐒𝐓𝐀𝐆𝐑𝐀𝐌 𝐑𝐈𝐋𝐄𝐕𝐀𝐓𝐎

𝐀𝐯𝐯𝐞𝐫𝐭𝐢𝐦𝐞𝐧𝐭𝐨: ${warnCount}/${warnLimit}
𝐑𝐢𝐦𝐚𝐧𝐞𝐧𝐭𝐢: ${remaining}

Prossima violazione → espulsione.
━━━━━━━━━━━━━━━━━━`
      });

    } else {

      global.db.data.users[m.sender].warn = 0;
      global.db.data.users[m.sender].warnReasons = [];

      await conn.sendMessage(m.chat, {
        text: `╔═══━─━─━─━─━─━─━═══╗
   𝐒𝐀𝐂𝐑𝐈𝐅𝐈𝐂𝐄 • 𝐏𝐔𝐍𝐈𝐙𝐈𝐎𝐍𝐄
╚═══━─━─━─━─━─━─━═══╝
𝐋𝐢𝐦𝐢𝐭𝐞 𝐬𝐮𝐩𝐞𝐫𝐚𝐭𝐨.

𝐔𝐭𝐞𝐧𝐭𝐞 𝐫𝐢𝐦𝐨𝐬𝐬𝐨.
━━━━━━━━━━━━━━━━━━`
      });

      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    }
  }

  return true;
}