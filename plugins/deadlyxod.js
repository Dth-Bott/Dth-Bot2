import axios from 'axios'

let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, '❌ Uso:\n.deadlyxod user <username>', m)
  }

  await conn.reply(m.chat, '🔎 Ricerca presenza online in corso...', m)

  try {
    const results = await usernameOSINT(text.trim())
    const msg = formatUsername(results)

    await conn.sendMessage(m.chat, {
      text: msg,
      contextInfo: {
        forwardingScore: 99,
        isForwarded: true
      }
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❌ Errore durante la ricerca OSINT', m)
  }
}

handler.help = ['deadlyxod user <username>']
handler.tags = ['osint']
handler.command = /^deadlyxod$/i

export default handler

/* ========================= */

async function usernameOSINT(username) {
  const platforms = {
    Instagram: `https://www.instagram.com/${username}`,
    Facebook: `https://www.facebook.com/${username}`,
    TikTok: `https://www.tiktok.com/@${username}`,
    Twitter: `https://twitter.com/${username}`,
    GitHub: `https://github.com/${username}`,
    Telegram: `https://t.me/${username}`
  }

  let results = {
    tipo: 'Username',
    username,
    trovati: {},
    timestamp: new Date().toISOString()
  }

  for (const [name, url] of Object.entries(platforms)) {
    try {
      const r = await axios.get(url, {
        timeout: 4000,
        validateStatus: () => true
      })
      results.trovati[name] = r.status === 200 ? `✅ ${url}` : '❌'
    } catch {
      results.trovati[name] = '❌'
    }
  }

  return results
}

function formatUsername(r) {
  let msg = `🔍 *OSINT USERNAME*\n\n`
  msg += `👤 Username: ${r.username}\n`
  msg += `⏰ ${new Date(r.timestamp).toLocaleString('it-IT')}\n\n`
  msg += `🌐 *Presenza Online*\n`

  for (const [k, v] of Object.entries(r.trovati)) {
    msg += `• ${k}: ${v}\n`
  }

  msg += `\n⚠️ Solo dati pubblici`

  return msg
}