const DAY = 86400000; // millisecondi in un giorno

const handler = async (m, { conn, participants, args, isAdmin, isBotAdmin }) => {

  // ==============================
  // 📌 TRACKER AUTOMATICO
  // ==============================
  if (m.isGroup) {
    if (!global.db.data.users[m.sender]) {
      global.db.data.users[m.sender] = {};
    }
    global.db.data.users[m.sender].lastseen = Date.now();
  }

  // Se non è comando .inattivi → esce
  if (!m.text || !m.text.startsWith('.inattivi')) return;

  // ==============================
  // 📊 COMANDO .inattivi
  // ==============================

  if (!m.isGroup) {
    return m.reply('❌ Questo comando funziona solo nei gruppi.');
  }

  if (!isAdmin) {
    return m.reply('❌ Solo gli admin possono usare questo comando.');
  }

  if (!isBotAdmin) {
    return m.reply('❌ Devo essere admin per controllare gli inattivi.');
  }

  const giorni = args[0] ? parseInt(args[0]) : 7; // default 7 giorni

  if (isNaN(giorni)) {
    return m.reply('⚠️ Inserisci un numero valido.\nEsempio: .inattivi 10');
  }

  const limiteTempo = Date.now() - (giorni * DAY);

  let inattivi = [];

  for (let user of participants) {
    const userData = global.db.data.users[user.jid];
    const lastseen = userData?.lastseen || 0;

    if (lastseen < limiteTempo) {
      inattivi.push({
        jid: user.jid,
        lastseen
      });
    }
  }

  if (!inattivi.length) {
    return m.reply(`✅ Nessun inattivo da più di ${giorni} giorni.`);
  }

  const lista = inattivi
    .map((u, i) => {
      const giorniFa = u.lastseen
        ? Math.floor((Date.now() - u.lastseen) / DAY)
        : 'Mai attivo';

      return `${i + 1}. @${u.jid.split('@')[0]} ➜ ${giorniFa} giorni`;
    })
    .join('\n');

  await conn.sendMessage(m.chat, {
    text: `📊 *UTENTI INATTIVI*\n\n⏳ Inattivi da più di ${giorni} giorni:\n\n${lista}`,
    contextInfo: {
      mentionedJid: inattivi.map(u => u.jid)
    }
  });
};

handler.command = ['inattivi'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;