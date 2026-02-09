//PLUGIN MODIFICATO DA 𝑾𝛬𝐓𝐓𝑬𝑫
import { performance } from 'perf_hooks';

// Mappa per salvare chi è incinta nei gruppi
const activePregnancies = {};

let handler = async (m, { conn, usedPrefix, text, participants, command }) => {
  // ====== COMANDO PRINCIPALE: ingravidamento ======
  if (/^(ingravida|incinta|impregna)$/i.test(command)) {
    let target = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : null;
    if (!target) return m.reply(`❌ Devi menzionare o rispondere a qualcuno!\nEsempio: ${usedPrefix}ingravida @utente`);
    if (target === conn.user.jid) return m.reply('🤖 Io sono un bot, non posso rimanere incinta!');
    if (target === m.sender) return m.reply('😳 Non puoi mettere incinta te stesso!');

    let user = participants.find(u => u.id === target);
    let displayName = user?.name || target.split('@')[0];

    const boyNames = ['Luca', 'Marco', 'Andrea', 'Matteo', 'Giovanni', 'Alessandro', 'Leonardo', 'Francesco', 'Lorenzo', 'Riccardo'];
    const girlNames = ['Sofia', 'Giulia', 'Aurora', 'Alice', 'Ginevra', 'Beatrice', 'Vittoria', 'Emma', 'Giorgia', 'Chiara'];

    let babyGender;
    let babyName;

    const maleIndicators = ['o', 'i', 'lo', 'ro', 'to', 'no', 'mo', 'co'];
    const femaleIndicators = ['a', 'ia', 'ra', 'ta', 'na', 'ma', 'ca', 'ella', 'etta'];

    let userName = displayName.toLowerCase();
    let isMale = false;
    let isFemale = false;

    for (let indicator of maleIndicators) if (userName.endsWith(indicator)) { isMale = true; break; }
    for (let indicator of femaleIndicators) if (userName.endsWith(indicator)) { isFemale = true; break; }

    if (!isMale && !isFemale) babyGender = Math.random() > 0.5 ? 'maschio' : 'femmina';
    else if (isMale && !isFemale) babyGender = 'maschio';
    else babyGender = 'femmina';

    babyName = babyGender === 'maschio'
      ? boyNames[Math.floor(Math.random() * boyNames.length)]
      : girlNames[Math.floor(Math.random() * girlNames.length)];

    let { key } = await conn.sendMessage(m.chat, { 
      text: `❤️ *INIZIO DEL PROCESSO DI GRAVIDANZA* ❤️\n@${target.split('@')[0]} sta per vivere un miracolo...`,
      mentions: [target]
    }, { quoted: m });

    const pregnancyStages = [
      `🌡️ *ANALISI DELLA FERTILITÀ* 🌡️\nControllo ormonale di @${target.split('@')[0]}...\n▰▱▱▱▱▱▱▱▱ 15%`,
      `💉 *INIEZIONE ORMONALE* 💉\nPreparazione dell'ormone della fertilità...\n▰▰▱▱▱▱▱▱▱ 30%`,
      `🔬 *FEcondAZIONE IN LABORATORIO* 🔬\nSelezione del materiale genetico...\n▰▰▰▱▱▱▱▱▱ 45%`,
      `🏥 *IMPIANTO DELL'EMBRIONE* 🏥\nProcedura microchirurgica in corso...\n▰▰▰▰▱▱▱▱▱ 60%`,
      `🌙 *SINCRONIZZAZIONE CICLICA* 🌙\nPreparazione dell'utero di @${target.split('@')[0]}...\n▰▰▰▰▰▱▱▱▱ 75%`,
      `✨ *ATTIVAZIONE CELLULARE* ✨\nDivisione cellulare embrionale...\n▰▰▰▰▰▰▱▱▱ 85%`,
      `🌈 *FORMAZIONE DELLA PLACENTA* 🌈\nSviluppo sistema di supporto vitale...\n▰▰▰▰▰▰▰▱▱ 92%`,
    ];

    for (let i = 0; i < pregnancyStages.length; i++) {
      await conn.sendMessage(m.chat, { 
        text: pregnancyStages[i],
        edit: key,
        mentions: [target]
      }, { quoted: m });
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Salvo la gravidanza attiva nel gruppo
    activePregnancies[m.chat] = { target, babyGender, babyName };

    // messaggio con bottoni
    await conn.sendMessage(m.chat, {
      text: `✅ *CONFERMA GRAVIDANZA* ✅\nTest di gravidanza positivo!\n▰▰▰▰▰▰▰▰▰ 100%`,
      mentions: [target],
      buttons: [
        { buttonId: `${usedPrefix}abortisci ${target}`, buttonText: { displayText: "❌ Abortisci" }, type: 1 },
        { buttonId: `${usedPrefix}rimaniincinta ${target}`, buttonText: { displayText: "🤰 Rimani incinta" }, type: 1 }
      ],
      headerType: 1
    }, { quoted: m });
  }

  // ====== COMANDO: abortisci ======
  if (/^abortisci$/i.test(command)) {
    let active = activePregnancies[m.chat];
    if (!active) return m.reply("❌ Nessuna gravidanza attiva in questo gruppo!");

    // solo la persona incinta può usare
    if (m.sender !== active.target) {
      return m.reply("❌ Non sei tu la persona incinta!");
    }

    delete activePregnancies[m.chat];
    return conn.sendMessage(m.chat, {
      text: `💔 @${active.target.split('@')[0]} ha deciso di *abortire*...\n\nLa gravidanza è stata interrotta.`,
      mentions: [active.target]
    }, { quoted: m });
  }

  // ====== COMANDO: rimaniincinta ======
  if (/^rimaniincinta$/i.test(command)) {
    let active = activePregnancies[m.chat];
    if (!active) return m.reply("❌ Nessuna gravidanza attiva in questo gruppo!");

    if (m.sender !== active.target) {
      return m.reply("❌ Non sei tu la persona incinta!");
    }

    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + 8 + Math.floor(Math.random() * 2));
    const dueDateFormatted = dueDate.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const babyWeight = (2.8 + Math.random() * 1.5).toFixed(2);
    const babyLength = (48 + Math.floor(Math.random() * 6)).toFixed(0);

    const genderEmoji = active.babyGender === 'maschio' ? '👶' : '👧';
    const genderMessage = active.babyGender === 'maschio' ? 'Un bel maschietto!' : 'Una bellissima femminuccia!';

    delete activePregnancies[m.chat];
    return conn.sendMessage(m.chat, {
      text: `🎉 *CONGRATULAZIONI!* 🎉\n\n@${active.target.split('@')[0]} è ufficialmente incinta! 🤰\n\n` +
            `📅 *Data prevista del parto:* ${dueDateFormatted}\n` +
            `${genderEmoji} *Nome del bambino:* ${active.babyName}\n` +
            `🚻 *Sesso:* ${active.babyGender} (${genderMessage})\n` +
            `⚖️ *Peso stimato:* ${babyWeight} kg\n` +
            `📏 *Lunghezza:* ${babyLength} cm\n\n` +
            `💖 *Auguri per questa bellissima avventura!* 💖`,
      mentions: [active.target, m.sender]
    }, { quoted: m });
  }
};

handler.help = ['ingravida @utente', 'abortisci', 'rimaniincinta'];
handler.tags = ['divertente', 'roleplay'];
handler.command = /^(ingravida|incinta|impregna|abortisci|rimaniincinta)$/i;
handler.group = true;

export default handler;