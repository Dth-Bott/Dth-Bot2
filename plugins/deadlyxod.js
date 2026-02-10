import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      '🔎 Usa:\n.osint <numero> [username]\n\nEsempio:\n.osint +393331234567 marco.rossi',
      m
    )
  }

  let args = text.split(' ')
  let numero = args[0].replace(/[^0-9+]/g, '')
  let username = args[1] || null

  if (numero.length < 8) {
    return conn.reply(m.chat, '❌ Numero non valido', m)
  }

  let cleanNumber = numero.replace('+', '')

  async function found(query) {
    try {
      let url = `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`
      let res = await fetch(url)
      let html = await res.text()
      return html.includes('result__a')
    } catch {
      return false
    }
  }

  // ricerche numero
  let results = {
    instagram: await found(`"${cleanNumber}" site:instagram.com`),
    facebook: await found(`"${cleanNumber}" site:facebook.com`),
    telegram: await found(`"${cleanNumber}" site:t.me`),
    tiktok: await found(`"${cleanNumber}" site:tiktok.com`),
    twitter: await found(`"${cleanNumber}" site:twitter.com OR site:x.com`),
    forum: await found(`"${cleanNumber}"`)
  }

  // ricerche username
  let userResults = {}
  if (username) {
    userResults = {
      instagram: await found(`"${username}" site:instagram.com`),
      facebook: await found(`"${username}" site:facebook.com`),
      telegram: await found(`"${username}" site:t.me`),
      tiktok: await found(`"${username}" site:tiktok.com`),
      twitter: await found(`"${username}" site:twitter.com OR site:x.com`)
    }
  }

  let esposizione =
    Object.values(results).filter(Boolean).length +
    Object.values(userResults).filter(Boolean).length

  let rischio =
    esposizione >= 5 ? '🔴 ALTA' :
    esposizione >= 2 ? '🟠 MEDIA' :
    '🟢 BASSA'

  let msg = `
🕵️‍♂️ *OSINT – Analisi Pubblica*

📱 Numero: *${numero}*
🌍 Paese stimato: *${numero.startsWith('+39') ? 'Italia 🇮🇹' : 'Sconosciuto'}*

📡 *Presenza Numero*
Instagram: ${results.instagram ? '✅' : '❌'}
Facebook: ${results.facebook ? '✅' : '❌'}
Telegram: ${results.telegram ? '✅' : '❌'}
TikTok: ${results.tiktok ? '✅' : '❌'}
Twitter/X: ${results.twitter ? '✅' : '❌'}
Forum/Web: ${results.forum ? '✅' : '❌'}

${username ? `
👤 *Username: ${username}*
Instagram: ${userResults.instagram ? '✅' : '❌'}
Facebook: ${userResults.facebook ? '✅' : '❌'}
Telegram: ${userResults.telegram ? '✅' : '❌'}
TikTok: ${userResults.tiktok ? '✅' : '❌'}
Twitter/X: ${userResults.twitter ? '✅' : '❌'}
` : ''}

⚠️ Rischio esposizione: *${rischio}*

ℹ️ Solo dati pubblici indicizzati
ℹ️ Nessun accesso privato
`.trim()

  await conn.sendMessage(m.chat, { text: msg }, { quoted: m })
}

handler.help = ['osint']
handler.tags = ['osint', 'tools']
handler.command = /^osint$/i

export default handler