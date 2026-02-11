import fs from 'fs';
import path from 'path';

const handler = async (m, { text }) => {

  if (!text) {
    return m.reply('⚠️ Uso corretto:\n.eliminapl nomeplugin');
  }

  // Solo owner reale
  const sender = m.sender;
  const BOT_OWNERS = global.owner.map(o => o[0] + '@s.whatsapp.net');

  if (!BOT_OWNERS.includes(sender)) {
    return m.reply('❌ Comando riservato al vero Owner del bot.');
  }

  try {
    const pluginName = text.endsWith('.js') ? text : text + '.js';

    // Percorso sicuro (evita ../)
    const pluginPath = path.resolve('./plugins', pluginName);
    const pluginsDir = path.resolve('./plugins');

    if (!pluginPath.startsWith(pluginsDir)) {
      return m.reply('❌ Percorso non valido.');
    }

    if (!fs.existsSync(pluginPath)) {
      return m.reply('❌ Plugin non trovato nella cartella plugins.');
    }

    fs.unlinkSync(pluginPath);

    m.reply(`🗑️ Plugin *${pluginName}* eliminato con successo.\n\n♻️ Riavvia il bot per completare la rimozione.`);

  } catch (error) {
    console.error(error);
    m.reply('❌ Errore durante l\'eliminazione del plugin.');
  }
};

handler.command = ['eliminapl'];
handler.rowner = true; // Solo owner reale

export default handler;