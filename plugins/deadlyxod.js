import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, '📱 Inserisci un numero di telefono\n\nEsempio:\n.social +393331234567', m)
  }

  let numero = text.replace(/[^0-9+]/g, '')

  if (numero.length < 8) {
    return conn.reply(m.chat, '❌ Numero non valido', m)
  }

  let query = numero.replace('+', '')

  // motore di ricerca pubblico (DuckDuckGo html)
  async function search(q) {
    let url = `https://duckduckgo.com/html/?q=${encodeURIComponent(q)}`
    let res = await fetch(url)
    let html = await res.text()
    return html.includes('result__a')
  }

  let results = {
    instagram: await search(`"${query}" site:instagram.com`),
    facebook: await search(`"${query}" site:facebook.com`),
    telegram: await search(`"${query}" site:t.me`),
    tiktok: await search(`"${query}" site:tiktok.com`)
  }

  let risposta = `
🔍 *OSINT – Dati Pubblici*

Numero: *${numero}*

📸 Instagram: ${results.instagram ? '✅ Presente' : '❌ Non trovato'}
📘 Facebook: ${results.facebook ? '✅ Presente' : '❌ Non trovato'}
✈️ Telegram: ${results.telegram ? '✅ Presente' : '❌ Non trovato'}
🎵 TikTok: ${results.tiktok ? '✅ Presente' : '❌ Non trovato'}

⚠️ Solo dati pubblici indicizzati
⚠️ Nessun accesso privato
`.trim()

  await conn.sendMessage(m.chat, { text: risposta }, { quoted: m })
}

handler.help = ['social']
handler.tags = ['tools', 'osint']
handler.command = /^(social|osint|numero)$/i

export default handler