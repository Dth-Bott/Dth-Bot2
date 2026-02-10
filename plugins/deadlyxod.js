import axios from 'axios'

let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      '❌ Uso corretto:\n.deadlyxod <numero | ip | email>',
      m
    )
  }

  await conn.reply(m.chat, '🔎 Ricerca OSINT in corso...', m)

  try {
    const result = await osintSearch(text)
    const message = formatOSINT(result)

    await conn.sendMessage(m.chat, {
      text: message,
      contextInfo: {
        forwardingScore: 99,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '',
          serverMessageId: '',
          newsletterName: 'ᴅᴇᴀᴅʟʏxᴏᴅ'
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.error('[DEADLYXOD]', e)
    await conn.reply(m.chat, '❌ Errore durante la ricerca OSINT', m)
  }
}

handler.help = ['deadlyxod <numero | ip | email>']
handler.tags = ['osint']
handler.command = /^deadlyxod$/i

export default handler

/* =========================
   OSINT CORE
========================= */

async function osintSearch(query) {
  query = query.trim()

  const phone = /^[+0-9\s\-]{7,}$/
  const ip = /^(?:\d{1,3}\.){3}\d{1,3}$/
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (phone.test(query)) return phoneOSINT(query)
  if (ip.test(query)) return ipOSINT(query)
  if (email.test(query)) return emailOSINT(query)

  return { errore: 'Formato non valido' }
}

/* --- TELEFONO --- */
function phoneOSINT(num) {
  const clean = num.replace(/[^0-9+]/g, '')
  let info = {}

  if (clean.startsWith('+39') || clean.startsWith('39')) {
    info.paese = 'Italia 🇮🇹'
    const n = clean.replace(/^\+?39/, '')
    if (n.startsWith('3')) {
      info.tipo = 'Mobile'
      const pref = n.substring(0, 3)
      const op = {
        '330':'TIM','331':'TIM','333':'TIM','334':'TIM','335':'TIM',
        '340':'Vodafone','347':'Vodafone','348':'Vodafone','349':'Vodafone',
        '320':'Wind/Tre','327':'Wind/Tre','328':'Wind/Tre','329':'Wind/Tre',
        '360':'Iliad','361':'Iliad','362':'Iliad'
      }
      info.operatore = op[pref] || 'Sconosciuto'
    } else {
      info.tipo = 'Fisso'
    }
  } else {
    info.paese = 'Sconosciuto'
  }

  return {
    tipo: 'Telefono',
    valore: clean,
    info,
    timestamp: new Date().toISOString()
  }
}

/* --- IP --- */
async function ipOSINT(ip) {
  const r = await axios.get(`http://ip-api.com/json/${ip}`)
  if (r.data.status !== 'success') {
    return { errore: 'IP non valido' }
  }

  return {
    tipo: 'IP',
    valore: ip,
    timestamp: new Date().toISOString(),
    info: {
      paese: `${r.data.country} ${r.data.countryCode}`,
      città: r.data.city,
      isp: r.data.isp,
      proxy: r.data.proxy ? 'Sì' : 'No',
      mobile: r.data.mobile ? 'Sì' : 'No',
      mappa: `https://maps.google.com/?q=${r.data.lat},${r.data.lon}`
    }
  }
}

/* --- EMAIL --- */
function emailOSINT(email) {
  const domain = email.split('@')[1]
  return {
    tipo: 'Email',
    valore: email,
    timestamp: new Date().toISOString(),
    info: {
      dominio: domain
    }
  }
}

/* --- FORMAT OUTPUT --- */
function formatOSINT(r) {
  if (r.errore) return `❌ ${r.errore}`

  let msg = `🔍 *DEADLYXOD OSINT*\n\n`
  msg += `📌 Tipo: ${r.tipo}\n`
  msg += `🎯 Query: ${r.valore}\n`
  msg += `⏰ Data: ${new Date(r.timestamp).toLocaleString('it-IT')}\n\n`
  msg += `📊 *Informazioni*\n`

  for (const [k, v] of Object.entries(r.info || {})) {
    msg += `• ${k}: ${v}\n`
  }

  return msg
}