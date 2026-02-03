import fetch from 'node-fetch'

let handler = async (m, { text }) => {
  if (!text) return m.reply('Usa: *.meteo <città>*\nEsempio: .meteo Roma')

  // 1️⃣ Geocoding (trova latitudine e longitudine)
  let geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(text)}&count=1&language=it&format=json`
  let geoRes = await fetch(geoUrl).then(res => res.json())

  if (!geoRes.results || !geoRes.results.length)
    return m.reply('Città non trovata.')

  let city = geoRes.results[0]
  let { latitude, longitude, name, country } = city

  // 2️⃣ Meteo attuale
  let meteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`
  let meteoRes = await fetch(meteoUrl).then(res => res.json())

  let w = meteoRes.current_weather
  if (!w) return m.reply('Impossibile ottenere il meteo.')

  let emoji = getWeatherEmoji(w.weathercode)

  let textMeteo =
`${emoji} *METEO – ${name}, ${country}*

🌡 Temperatura: *${w.temperature}°C*
🌬 Vento: *${w.windspeed} km/h*
🧭 Direzione: *${w.winddirection}°*
⏰ Orario: *${w.time}*
`

  m.reply(textMeteo)
}

handler.command = ['meteo']
handler.tags = ['info']
handler.help = ['meteo <città>']

export default handler

// 🌈 Emoji meteo
function getWeatherEmoji(code) {
  if (code === 0) return '☀️'
  if ([1, 2].includes(code)) return '🌤️'
  if (code === 3) return '☁️'
  if ([45, 48].includes(code)) return '🌫️'
  if ([51, 53, 55].includes(code)) return '🌦️'
  if ([61, 63, 65].includes(code)) return '🌧️'
  if ([71, 73, 75].includes(code)) return '❄️'
  if (code >= 80) return '⛈️'
  return '🌍'
}