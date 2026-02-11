import fs from 'fs';
import path from 'path';

const handler = async (m, { conn, text, usedPrefix, command }) => {

  if (!text) {
    return m.reply(`⚠️ Uso corretto:\n${usedPrefix + command} nomeplugin\n\nDevi rispondere al messaggio con il nuovo codice.`);
  }

  if (!m.quoted) {
    return m.reply('⚠️ Devi rispondere al messaggio che contiene il nuovo codice del plugin.');
  }

  if (!m.quoted.text) {
    return m.reply('⚠️ Il messaggio citato non contiene testo valido.');
  }

  // Solo owner può usare il comando
  const sender = m.sender;
  const BOT_OWNERS = global.owner.map(o => o[0] + '@s.whatsapp.net');

  if (!BOT_OWNERS.includes(sender)) {
    return m.reply('❌ Comando riservato agli owner del bot.');
  }

  try {
    const pluginName = text.endsWith('.js') ? text : text + '.js';
    const pluginPath = path.resolve(`./plugins/${pluginName}`);

    if (!fs.existsSync(pluginPath)) {
      return m.reply('❌ Plugin non trovato nella cartella plugins.');
    }

    const newCode = m.quoted.text;

    // Backup automatico
    const backupPath = path.resolve(`./plugins/backup_${pluginName}`);
    fs.copyFileSync(pluginPath, backupPath);

    // Sovrascrive file
    fs.writeFileSync(pluginPath, newCode);

    m.reply(`✅ Plugin *${pluginName}* aggiornato con successo.\n\n📁 Backup salvato come backup_${pluginName}\n\n♻️ Riavvia il bot per applicare le modifiche.`);
    
  } catch (err) {
    console.error(err);
    m.reply('❌ Errore durante la modifica del plugin.');
  }
};

handler.command = ['editplugin'];
handler.rowner = true; // solo real owner

export default handler;