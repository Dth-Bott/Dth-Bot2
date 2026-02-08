const challenges = {};

let handler = async (m, { conn, command, usedPrefix }) => {
  if (command !== 'fight') return;

  const users = global.db.data.users;
  const sender = m.sender;

  // auto-creazione mittente
  if (!users[sender]) {
    users[sender] = {
      exp: 0,
      money: 0,
      level: 0,
      lastclaim: 0
    };
  }

  const opponent =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted
      ? m.quoted.sender
      : null;

  if (!opponent)
    return m.reply(`Tagga qualcuno da sfidare!\nEsempio: ${usedPrefix}fight @utente`);

  if (opponent === sender)
    return m.reply('❌ Non puoi sfidare te stesso.');

  // auto-creazione avversario
  if (!users[opponent]) {
    users[opponent] = {
      exp: 0,
      money: 0,
      level: 0,
      lastclaim: 0
    };
  }

  if (challenges[sender] || challenges[opponent])
    return m.reply('⚠️ Uno dei due è già in una sfida.');

  challenges[opponent] = { from: sender };
  challenges[sender] = { to: opponent };

  await conn.sendMessage(
    m.chat,
    {
      text:
        `⚔️ *SFIDA!* ⚔️\n\n` +
        `@${sender.split('@')[0]} sfida @${opponent.split('@')[0]}!\n\n` +
        `Scrivi *si* per accettare o *no* per rifiutare.\n⏱️ Hai 60 secondi.`,
      mentions: [sender, opponent],
    },
    { quoted: m }
  );

  challenges[opponent].timeout = setTimeout(() => {
    if (challenges[opponent]) {
      conn.sendMessage(m.chat, {
        text: '⏱️ Sfida annullata per mancata risposta.',
        mentions: [sender, opponent],
      });
      delete challenges[sender];
      delete challenges[opponent];
    }
  }, 60000);
};

handler.before = async (m, { conn }) => {
  if (!m.text) return;

  const challenge = challenges[m.sender];
  if (!challenge) return;

  const text = m.text.trim().toLowerCase();

  // RIFIUTO
  if (text === 'no') {
    const from = challenge.from;
    delete challenges[m.sender];
    delete challenges[from];
    return m.reply('❌ Sfida rifiutata.');
  }

  // ACCETTA
  if (text === 'si') {
    const from = challenge.from;
    const to = m.sender;

    delete challenges[from];
    delete challenges[to];

    let hpFrom = 100;
    let hpTo = 100;

    await conn.sendMessage(m.chat, {
      text: `⚔️ *COMBATTIMENTO INIZIATO!*\n\n@${from.split('@')[0]} VS @${to.split('@')[0]}`,
      mentions: [from, to],
    });

    const delay = ms => new Promise(r => setTimeout(r, ms));

    while (hpFrom > 0 && hpTo > 0) {
      let dmg = Math.floor(Math.random() * 20) + 5;
      hpTo -= dmg;
      if (hpTo < 0) hpTo = 0;

      await delay(1500);
      await conn.sendMessage(m.chat, {
        text: `💥 @${from.split('@')[0]} colpisce @${to.split('@')[0]} per ${dmg} danni\n❤️ Vita: ${hpTo}`,
        mentions: [from, to],
      });

      if (hpTo <= 0) break;

      let counter = Math.floor(Math.random() * 20) + 5;
      hpFrom -= counter;
      if (hpFrom < 0) hpFrom = 0;

      await delay(1500);
      await conn.sendMessage(m.chat, {
        text: `💥 @${to.split('@')[0]} contrattacca per ${counter} danni\n❤️ Vita: ${hpFrom}`,
        mentions: [from, to],
      });
    }

    const winner = hpFrom > 0 ? from : to;

    await delay(1000);
    await conn.sendMessage(m.chat, {
      text: `🏆 *VINCITORE:* @${winner.split('@')[0]}`,
      mentions: [winner],
    });
  }
};

handler.command = ['fight'];
handler.group = true;

export default handler;